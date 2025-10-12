import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Linkedin } from "lucide-react";
import ContactDialog from "./ContactDialog";
import miloLogo from "@/assets/milo-logo.png";
const Footer = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  return <footer className="relative py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="max-w-3xl mx-auto gradient-border bg-white shadow-xl p-12 rounded-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Klaar om je HR-communicatie te <span className="gradient-text">automatiseren</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Probeer onze demo of vraag een persoonlijke demonstratie aan
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setContactDialogOpen(true)} className="bg-secondary hover:bg-secondary/90 glow-whatsapp">
                <MessageCircle className="mr-2 h-5 w-5" />
                Stel direct een vraag
              </Button>
              
              <Button size="lg" variant="outline" onClick={() => setContactDialogOpen(true)} className="border-primary/30 hover:border-primary hover:bg-primary/10">
                <Mail className="mr-2 h-5 w-5" />
                Vraag offerte aan
              </Button>
            </div>
          </div>
        </div>
        
        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img src={miloLogo} alt="MILO" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm">
              Automatiseer je HR-communicatie met AI. Via WhatsApp. Realtime. 24/7.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Prijzen</a></li>
              <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
              
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">Over ons</a></li>
              <li><button onClick={() => setContactDialogOpen(true)} className="hover:text-primary transition-colors">Contact</button></li>
              <li><button onClick={() => setContactDialogOpen(true)} className="hover:text-primary transition-colors">Partner worden</button></li>
              
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#terms" className="hover:text-primary transition-colors">Voorwaarden</a></li>
              <li><a href="#security" className="hover:text-primary transition-colors">Security</a></li>
              <li><a href="#gdpr" className="hover:text-primary transition-colors">AVG/GDPR</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 PEOPLE. Alle rechten voorbehouden.
          </p>
          
          <div className="flex gap-4">
            <a href="#linkedin" className="p-2 rounded-full bg-muted/20 hover:bg-primary/10 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#email" className="p-2 rounded-full bg-muted/20 hover:bg-primary/10 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
            <a href="#whatsapp" className="p-2 rounded-full bg-muted/20 hover:bg-secondary/10 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </footer>;
};
export default Footer;