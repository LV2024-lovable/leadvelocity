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
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <img 
                src="/lovable-uploads/polygon-bimi-tiny12.svg" 
                alt="Milo Logo" 
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-background">Milo</span>
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
                className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }}
                className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
              >
                Hoe werkt het
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('pricing');
                }}
                className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
              >
                Prijzen
              </a>
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('demo');
                }}
                className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
              >
                Demo
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Button
                onClick={() => setContactDialogOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-8 py-5 text-base shadow-lg"
              >
                Start gratis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-background"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-background/10">
              <div className="flex flex-col gap-5">
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                  className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
                >
                  Hoe werkt het
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                  className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
                >
                  Prijzen
                </a>
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('demo');
                  }}
                  className="text-base font-medium text-background hover:text-background/80 transition-colors cursor-pointer"
                >
                  Demo
                </a>
                <div className="pt-4">
                  <Button
                    onClick={() => {
                      setContactDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full py-5 text-base"
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
