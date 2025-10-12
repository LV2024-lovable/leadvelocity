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
      <nav className={`fixed top-4 left-0 right-0 z-50 transition-transform duration-300 px-8 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-foreground rounded-full shadow-2xl border border-background/10 px-8 w-full max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Text Only */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl font-bold text-background">MILO</span>
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
                className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer whitespace-nowrap"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }}
                className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer whitespace-nowrap"
              >
                Hoe werkt het
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('pricing');
                }}
                className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer whitespace-nowrap"
              >
                Prijzen
              </a>
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('demo');
                }}
                className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer whitespace-nowrap"
              >
                Demo
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Button
                onClick={() => setContactDialogOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full px-8 text-sm shadow-lg h-10 whitespace-nowrap"
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
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-background/10">
              <div className="flex flex-col gap-4">
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                  className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer px-2"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                  className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer px-2"
                >
                  Hoe werkt het
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('pricing');
                  }}
                  className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer px-2"
                >
                  Prijzen
                </a>
                <a
                  href="#demo"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('demo');
                  }}
                  className="text-sm font-medium text-background/80 hover:text-background transition-colors cursor-pointer px-2"
                >
                  Demo
                </a>
                <div className="pt-2 px-2">
                  <Button
                    onClick={() => {
                      setContactDialogOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-full py-3 text-sm"
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
