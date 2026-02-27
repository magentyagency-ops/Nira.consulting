"use server";

import { z } from "zod";
import { Resend } from "resend";

const auditSchema = z.object({
    name: z.string().min(2, "Le nom est trop court."),
    email: z.string().email("Cet email n'est pas valide."),
    company: z.string().optional(),
    message: z.string().min(10, "Merci de nous en dire un peu plus (10 caractères min)."),
});

export async function submitAuditRequest(formData: FormData) {
    try {
        // 1. Extraire les données
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            company: formData.get("company") as string,
            message: formData.get("message") as string,
        };

        // 2. Valider avec Zod
        const parsed = auditSchema.safeParse(data);

        if (!parsed.success) {
            let firstErrorMessage = "Données invalides.";
            try {
                const errs = JSON.parse(parsed.error.message);
                if (errs && errs.length > 0 && errs[0].message) {
                    firstErrorMessage = errs[0].message;
                }
            } catch (e) { }

            return { success: false, error: firstErrorMessage };
        }

        const validData = parsed.data;

        // 3. Envoyer l'email via Resend
        // Vérifier si une clé API est configurée
        const apiKey = process.env.RESEND_API_KEY;

        if (apiKey) {
            const resend = new Resend(apiKey);
            console.log("📨 Envoi de l'email via Resend...");

            const { data: resendData, error: resendError } = await resend.emails.send({
                // L'expéditeur doit être un domaine vérifié sur Resend (ex: onboarding@resend.dev pour les tests)
                from: "onboarding@resend.dev",
                // L'email où tu veux recevoir les demandes (Onboarding mode: ton email de compte)
                to: ["magenty.agency@gmail.com"],
                subject: `Nouvelle demande d'audit de ${validData.name} (${validData.company || 'Indépendant'})`,
                html: `
          <div style="font-family: sans-serif; padding: 20px; color: #111;">
            <h2 style="color: #0044FF;">🚀 Nouvelle Demande d'Audit</h2>
            <p><strong>Nom :</strong> ${validData.name}</p>
            <p><strong>Email :</strong> <a href="mailto:${validData.email}">${validData.email}</a></p>
            <p><strong>Entreprise :</strong> ${validData.company || "Non renseigné"}</p>
            <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            <h3>Leur problématique / besoin :</h3>
            <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${validData.message}</p>
          </div>
        `,
            });

            if (resendError) {
                console.error("Erreur Resend détaillée :", resendError);
                return { success: false, error: "Erreur envoi email: " + resendError.message };
            }
        } else {
            // Mode simulation si pas de clé API (pour développement local)
            console.log("⚠️ Aucune clé RESEND_API_KEY trouvée. Simulation d'envoi :");
            console.log(validData);

            // Simuler une latence réseau
            await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        return { success: true };

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'audit:", error);

        return { success: false, error: "Une erreur interne est survenue. Veuillez réessayer." };
    }
}
