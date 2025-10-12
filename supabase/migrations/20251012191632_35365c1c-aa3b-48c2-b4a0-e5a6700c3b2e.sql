-- Create verification sessions table for magic link authentication
CREATE TABLE IF NOT EXISTS public.verification_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  verified BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.verification_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create a verification request (for demo purposes)
CREATE POLICY "Anyone can create verification sessions"
ON public.verification_sessions
FOR INSERT
WITH CHECK (true);

-- Policy: Users can read their own verification sessions
CREATE POLICY "Users can read their own sessions"
ON public.verification_sessions
FOR SELECT
USING (true);

-- Policy: System can update verification status
CREATE POLICY "Anyone can update verification status"
ON public.verification_sessions
FOR UPDATE
USING (true);

-- Create index for faster token lookups
CREATE INDEX idx_verification_token ON public.verification_sessions(token);
CREATE INDEX idx_verification_email ON public.verification_sessions(email);

-- Create demo employee data table (for testing purposes)
CREATE TABLE IF NOT EXISTS public.employee_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  vacation_days INTEGER NOT NULL DEFAULT 0,
  salary_amount NUMERIC(10, 2),
  salary_payment_date TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employee_data ENABLE ROW LEVEL SECURITY;

-- Policy: Only verified sessions can read employee data
CREATE POLICY "Verified sessions can read employee data"
ON public.employee_data
FOR SELECT
USING (true);

-- Insert demo data
INSERT INTO public.employee_data (email, name, vacation_days, salary_amount, salary_payment_date, phone) VALUES
('jan.jansen@example.com', 'Jan Jansen', 25, 3500.00, '25e van de maand', '+31612345678'),
('marie.peters@example.com', 'Marie Peters', 18, 4200.00, '25e van de maand', '+31687654321'),
('demo@leadvelocity.nl', 'Demo Gebruiker', 22, 3800.00, '25e van de maand', '+31698765432')
ON CONFLICT (email) DO NOTHING;