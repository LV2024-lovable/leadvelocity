export type TrackEvent =
  | "cta_click" | "demo_open" | "demo_step" | "form_start"
  | "form_submit_success" | "form_submit_error" | "meeting_booked";

/** Alleen niet-persoonlijke parameters (handover §18). */
export type TrackParams = {
  page_type?: string;
  category?: string;
  process?: string;
  campaign_id?: string;
  package_id?: string;
  cta_id?: string;
  demo_id?: string;
  step?: number;
};

/**
 * No-op tot er een analytics-tool en toestemmingsbeleid is (livegang-afhankelijkheid).
 * Aansluiten = alleen deze functie aanpassen.
 */
export function track(event: TrackEvent, params: TrackParams = {}): void {
  if (import.meta.env.DEV) console.debug("[track]", event, params);
}
