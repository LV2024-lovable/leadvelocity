import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { makeSchema } from "../../../supabase/functions/werkstroomcheck/schema";
import { supabase } from "@/integrations/supabase/client";
import { checkPage } from "@/content/pages";
import { categoryOptions, processOptions, frequencyOptions, contact } from "@/content/site";
import type { CheckContext } from "@/lib/cta";
import { readUtm } from "@/lib/utm";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const schema = makeSchema(z);
type Values = z.input<typeof schema>;

const field = "w-full rounded-xl border border-lv-line bg-lv-surface px-4 py-3 text-[15.5px] outline-none focus:border-lv-ink";
const label = "mb-1.5 block text-[14px] font-medium";

export function CheckForm({ ctx }: { ctx: CheckContext }) {
  const navigate = useNavigate();
  const requestId = useMemo(() => crypto.randomUUID(), []);
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      request_id: requestId,
      category: ctx.category ?? "",
      process: ctx.process ?? "",
      contact_preference: "email",
      context: {},
    },
  });
  const pref = watch("contact_preference");

  const onFirstInput = () => {
    if (!started.current) { started.current = true; track("form_start", { category: ctx.category, process: ctx.process, campaign_id: ctx.campaign, package_id: ctx.package }); }
  };

  const onSubmit = async (v: Values) => {
    if (status === "submitting") return;
    setStatus("submitting");
    const utm = readUtm();
    const body = {
      ...v,
      context: {
        source: ctx.source, category: ctx.category, process: ctx.process, package: ctx.package, demo: ctx.demo, campaign: ctx.campaign,
        utm_source: utm.source, utm_medium: utm.medium, utm_campaign: utm.campaign, utm_content: utm.content,
        page: window.location.pathname,
      },
    };
    try {
      const { data, error } = await supabase.functions.invoke("werkstroomcheck", { body });
      if (error || !data?.ok) throw error ?? new Error("Niet geaccepteerd");
      track("form_submit_success", { category: ctx.category, process: ctx.process, campaign_id: ctx.campaign, package_id: ctx.package });
      navigate("/bedankt", { state: { demo: ctx.demo, preference: v.contact_preference } });
    } catch {
      track("form_submit_error", { category: ctx.category, process: ctx.process });
      setStatus("error");
    }
  };

  const err = (k: string) => (errors as Record<string, { message?: string } | undefined>)[k]?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} onInput={onFirstInput} noValidate className="space-y-5" aria-describedby={status === "error" ? "form-error" : undefined}>
      <input type="hidden" {...register("request_id")} />
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Naam</label>
          <input id="name" autoComplete="name" className={cn(field, err("name") && "border-red-600")} aria-invalid={!!err("name")} aria-describedby={err("name") ? "name-err" : undefined} {...register("name")} />
          {err("name") && <p id="name-err" className="mt-1 text-[13px] text-red-700">{err("name")}</p>}
        </div>
        <div>
          <label htmlFor="company" className={label}>Bedrijf</label>
          <input id="company" autoComplete="organization" className={cn(field, err("company") && "border-red-600")} aria-invalid={!!err("company")} aria-describedby={err("company") ? "company-err" : undefined} {...register("company")} />
          {err("company") && <p id="company-err" className="mt-1 text-[13px] text-red-700">{err("company")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>Zakelijk e-mailadres</label>
        <input id="email" type="email" autoComplete="email" className={cn(field, err("email") && "border-red-600")} aria-invalid={!!err("email")} aria-describedby={err("email") ? "email-err" : undefined} {...register("email")} />
        {err("email") && <p id="email-err" className="mt-1 text-[13px] text-red-700">{err("email")}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={label}>Categorie <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <select id="category" className={field} {...register("category")}>
            <option value="">Kies…</option>
            {categoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="process" className={label}>Proces <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <select id="process" className={field} {...register("process")}>
            <option value="">Kies…</option>
            {processOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="work" className={label}>Welk werk komt steeds terug?</label>
        <textarea id="work" rows={4} className={cn(field, err("work") && "border-red-600")} aria-invalid={!!err("work")} aria-describedby={err("work") ? "work-err" : undefined} {...register("work")} />
        {err("work") && <p id="work-err" className="mt-1 text-[13px] text-red-700">{err("work")}</p>}
      </div>

      <fieldset>
        <legend className={label}>Contactvoorkeur</legend>
        <div className="flex gap-3">
          {(["email", "bel"] as const).map((p) => (
            <label key={p} className="flex cursor-pointer items-center gap-2 rounded-xl border border-lv-line bg-lv-surface px-4 py-2.5 text-[15px]">
              <input type="radio" value={p} {...register("contact_preference")} />{p === "email" ? "E-mail" : "Bel mij"}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="phone" className={label}>Telefoon {pref !== "bel" && <span className="font-normal text-lv-muted">(optioneel)</span>}</label>
        <input id="phone" type="tel" autoComplete="tel" className={cn(field, err("phone") && "border-red-600")} aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "phone-err" : undefined} {...register("phone")} />
        {err("phone") && <p id="phone-err" className="mt-1 text-[13px] text-red-700">{err("phone")}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="frequency" className={label}>Hoe vaak komt het voor? <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <select id="frequency" className={field} {...register("frequency", { setValueAs: (x) => x || undefined })}>
            <option value="">Kies…</option>
            {frequencyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="software" className={label}>Huidige software <span className="font-normal text-lv-muted">(optioneel)</span></label>
          <input id="software" className={field} {...register("software")} />
        </div>
      </div>

      <p className="text-[13.5px] text-lv-muted">{checkPage.privacy} <Link to="/privacy" className="underline underline-offset-4">{checkPage.privacyLink}</Link></p>

      {status === "error" && (
        <p id="form-error" role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14.5px] text-red-800">
          {checkPage.error} <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="inline-flex w-full items-center justify-center rounded-[10px] bg-lv-ink px-6 py-3.5 text-[15.5px] font-medium text-white disabled:opacity-60 sm:w-auto">
        {status === "submitting" ? checkPage.submitting : checkPage.submit}
      </button>
    </form>
  );
}
