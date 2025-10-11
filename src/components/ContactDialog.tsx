import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from "./contact/ContactForm";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neem contact op</DialogTitle>
          <DialogDescription>
            Vul het formulier in en we nemen zo snel mogelijk contact met je op.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
