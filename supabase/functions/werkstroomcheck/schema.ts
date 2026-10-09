// Gedeeld validatieschema. Import van zod gebeurt door de aanroeper (Deno: npm:zod, Node/Vite: zod).
// deno-lint-ignore no-explicit-any
export function makeSchema(z: any) {
  const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal("").transform(() => undefined));
  return z
    .object({
      request_id: z.string().uuid(),
      name: z.string().trim().min(2, "Vul je naam in").max(120),
      company: z.string().trim().min(2, "Vul je bedrijfsnaam in").max(160),
      email: z.string().trim().email("Vul een geldig e-mailadres in").max(200),
      category: opt(40),
      process: opt(40),
      work: z.string().trim().min(5, "Beschrijf kort welk werk steeds terugkomt").max(1500),
      phone: opt(40),
      contact_preference: z.enum(["email", "bel"]).default("email"),
      frequency: z.enum(["dagelijks", "wekelijks", "minder-vaak", "onbekend"]).optional(),
      software: opt(300),
      website: opt(200), // honeypot — moet leeg blijven
      context: z
        .object({
          source: opt(64), category: opt(40), process: opt(40), package: opt(40), demo: opt(40), campaign: opt(40),
          utm_source: opt(100), utm_medium: opt(100), utm_campaign: opt(100), utm_content: opt(100),
          page: opt(200),
        })
        .default({}),
    })
    .superRefine((v: { contact_preference: string; phone?: string }, ctx: { addIssue: (i: unknown) => void }) => {
      if (v.contact_preference === "bel" && !(v.phone && v.phone.replace(/\D/g, "").length >= 8)) {
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Vul een telefoonnummer in als we je mogen bellen" });
      }
    });
}
