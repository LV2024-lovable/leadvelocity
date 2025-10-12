import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ContactDialog from "./ContactDialog";
import miloLogo from "@/assets/milo-logo.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-foreground transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/polygon-bimi-tiny12.svg" 
                alt="Milo Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-background">Milo</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
                className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }}
                className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
              >
                Hoe werkt het
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('pricing');
                }}
                className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
              >
                Prijzen
              </a>
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('demo');
                }}
                className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
              >
                Demo
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost"
                onClick={() => setContactDialogOpen(true)}
                className="text-background hover:text-background hover:bg-background/10"
              >
                Contact
              </Button>
              <Button
                onClick={() => setContactDialogOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-6"
              >
                Start gratis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-background"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-background/10">
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                  className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
                >
                  Hoe werkt het
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                  className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
                >
                  Prijzen
                </a>
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('demo');
                  }}
                  className="text-sm font-medium text-background/70 hover:text-background transition-colors cursor-pointer"
                >
                  Demo
                </a>
                <div className="flex flex-col gap-2 pt-4">
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setContactDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-background hover:bg-background/10 justify-start"
                  >
                    Contact
                  </Button>
                  <Button
                    onClick={() => {
                      setContactDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full"
                  >
                    Start gratis
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </>
  );
};

export default Navigation;
