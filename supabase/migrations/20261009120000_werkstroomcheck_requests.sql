-- Aanvragen voor een werkstroomcheck (handover §13).
-- Schrijven gebeurt uitsluitend via de Edge Function met de service role;
-- RLS staat aan zonder publieke policies.

CREATE TABLE IF NOT EXISTS public.werkstroomcheck_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT,
  process TEXT,
  work TEXT NOT NULL,
  phone TEXT,
  contact_preference TEXT NOT NULL DEFAULT 'email',
  frequency TEXT,
  software TEXT,
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  notify_status TEXT NOT NULL DEFAULT 'pending',
  stage TEXT NOT NULL DEFAULT 'lead',
  owner TEXT,
  next_action TEXT,
  next_action_date DATE
);

ALTER TABLE public.werkstroomcheck_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_werkstroomcheck_requests_created ON public.werkstroomcheck_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_werkstroomcheck_requests_stage ON public.werkstroomcheck_requests(stage);
