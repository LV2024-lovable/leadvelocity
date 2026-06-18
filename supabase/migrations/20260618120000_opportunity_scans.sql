-- AI-kansenscan light: opslag + cache voor geautomatiseerde scans.
-- Anon-toegang loopt via de opportunity-scan Edge Function (service role),
-- daarom permissieve policies — net als verification_sessions/employee_data.

CREATE TABLE IF NOT EXISTS public.opportunity_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  website_url TEXT,
  sector TEXT,
  domain TEXT NOT NULL,
  opportunities_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.opportunity_scans ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (de Edge Function schrijft scans weg)
CREATE POLICY "Anyone can insert opportunity scans"
ON public.opportunity_scans
FOR INSERT
WITH CHECK (true);

-- Policy: Anyone can read (cache-lookup via Edge Function)
CREATE POLICY "Anyone can read opportunity scans"
ON public.opportunity_scans
FOR SELECT
USING (true);

-- Indexen: cache-lookup op domein + tijdsvenster
CREATE INDEX idx_opportunity_scans_domain ON public.opportunity_scans(domain);
CREATE INDEX idx_opportunity_scans_created ON public.opportunity_scans(created_at);
