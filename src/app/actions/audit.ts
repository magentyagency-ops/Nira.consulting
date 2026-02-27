"use server";

import { z } from "zod";
import { Resend } from "resend";

const auditSchema = z.object({
    name: z.string().min(2, "Le nom est trop court."),
    email: z.string().email("Cet email n'est pas valide."),
    company: z.string().optional(),
    message: z.string().optional(),
});

export async function submitAuditRequest(formData: FormData) {
    try {
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            company: formData.get("company") as string,
            message: (formData.get("message") as string) || "Non renseigné",
        };

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
        const apiKey = process.env.RESEND_API_KEY;

        if (apiKey) {
            const resend = new Resend(apiKey);
            const { error: resendError } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: ["magenty.agency@gmail.com"],
                subject: `Nouvelle demande d'audit de ${validData.name} (${validData.company || 'Indépendant'})`,
                html: `
          <div style="font-family: sans-serif; padding: 20px; color: #111;">
            <h2 style="color: #0044FF;">🚀 Nouvelle Demande d'Audit</h2>
            <p><strong>Nom :</strong> ${validData.name}</p>
            <p><strong>Email :</strong> <a href="mailto:${validData.email}">${validData.email}</a></p>
            <p><strong>Entreprise :</strong> ${validData.company || "Non renseigné"}</p>
            ${validData.message !== "Non renseigné" ? `<p><strong>Besoin :</strong> ${validData.message}</p>` : ""}
          </div>
        `,
            });

            if (resendError) {
                return { success: false, error: resendError.message };
            }
        } else {
            console.log("⚠️ Simulation d'envoi (pas de clé API):", validData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: "Erreur interne" };
    }
}
