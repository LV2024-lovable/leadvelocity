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

    try {
      const { data, error } = await supabase.functions.invoke('send-verification', {
        body: { email }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setEmailSent(true);
      toast({
        title: "✅ Email verstuurd!",
        description: "Check je inbox voor de verificatie link",
      });

    } catch (error: any) {
      console.error('Verification error:', error);
      toast({
        title: "Fout",
        description: error.message || "Kon verificatie niet versturen",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              <h3 className="font-semibold text-lg mb-2">Email verstuurd!</h3>
              <p className="text-sm text-muted-foreground">
                Check je inbox op <strong>{email}</strong> en klik op de verificatie link.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                De link is 60 minuten geldig.
              </p>
            </div>
            <Button variant="outline" onClick={handleClose} className="w-full">
              Sluiten
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;