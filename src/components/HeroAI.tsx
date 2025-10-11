import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-ai.jpg";

const HeroAI = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-medium text-primary">AI-powered HR assistant</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Automatiseer je <span className="gradient-text">HR-communicatie</span> met AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Een slimme HR-agent beantwoordt direct vragen over loon, ziekte, vakantiedagen, CAO, en meer – 
              zodat jij tijd overhoudt voor de mensen zelf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => scrollToSection('demo')} className="text-lg px-8">
                Bekijk Live Demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="text-lg px-8">
                Vraag offerte aan
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Beschikbaar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Tevredenheid</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">800+</div>
                <div className="text-sm text-muted-foreground">Vragen/week</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src={heroImage} 
              alt="AI HR Assistant Visualization" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAI;
