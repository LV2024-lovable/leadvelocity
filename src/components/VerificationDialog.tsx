import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VerificationDialog = ({ open, onOpenChange }: VerificationDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendVerification = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Ongeldig email adres",
        description: "Vul een geldig email adres in",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // DEMO MODE: Simulate verification after 1.5 seconds
    setTimeout(() => {
      setEmailSent(true);
      setIsLoading(false);
      
      toast({
        title: "✅ Demo: Verificatie geslaagd!",
        description: "In de echte tool zou je nu een email ontvangen",
      });

      // Auto-verify after 2 seconds for smooth demo experience
      setTimeout(() => {
        // Trigger verification in parent component
        const event = new CustomEvent('demo-verified', { detail: { email } });
        window.dispatchEvent(event);
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setEmailSent(false);
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Verificatie vereist
          </DialogTitle>
          <DialogDescription>
            Voor je veiligheid moet je je identiteit verifiëren om persoonlijke HR-gegevens in te zien.
          </DialogDescription>
        </DialogHeader>

        {!emailSent ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email adres</label>
              <Input
                type="email"
                placeholder="jouw.naam@bedrijf.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendVerification()}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                We sturen je een verificatie link naar dit adres
              </p>
            </div>

            <Button
              onClick={handleSendVerification}
              disabled={isLoading || !email}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Versturen...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Verstuur verificatie link
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Demo: Verificatie actief!</h3>
              <p className="text-sm text-muted-foreground">
                Je bent nu geverifieerd als <strong>{email}</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                💡 In de echte tool ontvang je een email met verificatie link
              </p>
            </div>
            <div className="flex gap-1">
              <div className="h-1 flex-1 bg-primary animate-pulse"></div>
              <div className="h-1 flex-1 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-1 flex-1 bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;