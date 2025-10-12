import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import { Phone, Calendar, Mail, Clock, CheckCircle2, Sparkles, Shield, Zap, Database, MessageSquare, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-ai.jpg";

const AIAutomation = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hoi! Ik ben je AI HR-assistent. Vraag me iets over vakantiedagen, loon, ziekteverzuim, of andere HR-zaken.", isBot: true, time: "13:55" }
  ]);

  const quickQuestions = [
    "Hoeveel vakantiedagen heb ik nog?",
    "Wanneer krijg ik mijn loon?",
    "Hoe moet ik mij ziek melden?",
    "Wat zijn de HR openingstijden?",
    "Waar kan ik mijn loonstrook vinden?"
  ];

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setMessages([...messages, { text: question, isBot: false, time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppChat />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm">AI-powered HR assistant</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Automatiseer je HR-communicatie met AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Een slimme HR-agent beantwoordt direct vragen over loon, ziekte, vakantiedagen, CAO, en meer – zodat jij tijd overhoudt voor de mensen zelf.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
                Bekijk Live Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Vraag offerte aan
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Beschikbaar</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Tevredenheid</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">800+</div>
                <div className="text-muted-foreground">Vragen/week</div>
              </div>
            </div>

            <img src={heroImage} alt="AI HR Assistant Visualization" className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mx-auto block w-fit mb-4">Live Demo</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Test het zelf: Stel een vraag</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Probeer vragen zoals "Hoeveel vakantiedagen heb ik nog?" of "Wanneer krijg ik mijn loon?"
          </p>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Probeer één van deze vragen:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <Button key={i} variant="outline" size="sm" onClick={() => handleQuestionClick(q)}>
                  {q}
                </Button>
              ))}
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.isBot ? 'bg-primary/10' : 'bg-primary text-primary-foreground'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                <Sparkles className="w-4 h-4" />
                <span>Powered by AI - De agent leert van echte HR-data en kan 24/7 vragen beantwoorden</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What AI Can Answer */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Wat je AI HR Agent kan beantwoorden</h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Van eenvoudige vragen tot complexe HR-zaken. De AI leert van je eigen documenten en processen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Hoeveel vakantiedagen heb ik nog?",
              "Wanneer krijg ik mijn loon?",
              "Waar vind ik mijn loonstrook?",
              "Hoe meld ik me ziek?",
              "Wat zijn de interne vacatures?",
              "Hoe werkt mijn pensioenregeling?"
            ].map((q, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg">{q}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <p className="text-xl font-semibold mb-2">Jij bepaalt de kennisbasis.</p>
              <p className="text-muted-foreground">Wij trainen de AI op jouw documenten, portalen en taal.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Hoe het werkt</h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Van documentatie tot live AI-agent in vier simpele stappen
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Jij levert je HR-documenten", desc: "PDF, Word, Intranet, FAQ - wij verwerken het allemaal", icon: Database },
              { num: "2", title: "Wij trainen jouw AI-agent", desc: "Binnen 48 uur is je slimme assistent operationeel", icon: Sparkles },
              { num: "3", title: "Medewerkers stellen vragen", desc: "Via WhatsApp - direct antwoord, 24/7 beschikbaar", icon: MessageSquare },
              { num: "4", title: "Complexe vragen naar HR", desc: "Automatische doorverwijzing als menselijke expertise nodig is", icon: TrendingUp }
            ].map((step, i) => (
              <Card key={i} className="relative hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{step.num}</div>
                  <step.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Waarom kiezen voor AI HR Agent</h2>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Slimme technologie die écht werkt voor jouw organisatie
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Zelflerende AI", desc: "Leert van vragen en past zich aan jouw organisatie aan" },
              { icon: Database, title: "Koppelt met HR-tools", desc: "Nmbrs, Loket.nl, AFAS, Visma en meer" },
              { icon: Shield, title: "AVG-compliant", desc: "Privacyproof en veilig volgens Europese wetgeving" },
              { icon: MessageSquare, title: "WhatsApp = geen apps", desc: "Medewerkers gebruiken hun vertrouwde berichtendienst" },
              { icon: Clock, title: "24/7 beschikbaarheid", desc: "Ook 's nachts en in het weekend direct antwoord" },
              { icon: Zap, title: "Directe antwoorden", desc: "Gemiddelde reactietijd < 3 seconden" }
            ].map((feature, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Transparante prijzen</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            Kies het pakket dat bij jouw organisatie past. Opschalen kan altijd.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                desc: "Automatiseer je veelgestelde vragen met een GPT-5 aangedreven AI Agent",
                price: "€250",
                period: "per maand",
                note: "bij jaarlijkse betaling",
                features: [
                  "Tot 250-500 chats/maand",
                  "1 AI Agent",
                  "3 teamleden",
                  "Website chat widget",
                  "WhatsApp, Facebook, Instagram",
                  "Prompting module",
                  "Statistieken",
                  "5 Sterren support"
                ]
              },
              {
                name: "Premium",
                desc: "Scrape je website en documenten om je AI Agent razendsnel te bouwen",
                price: "€417",
                period: "per maand",
                note: "bij jaarlijkse betaling",
                popular: true,
                features: [
                  "Tot 500-1.000 chats/maand",
                  "1 AI Agent",
                  "10 teamleden",
                  "Crawl tot 10.000 URL's",
                  "Website crawler",
                  "Document scraper",
                  "Inbox & Menselijke handoff",
                  "API-toegang",
                  "Alles uit Basic"
                ]
              },
              {
                name: "Business",
                desc: "Integreer je systemen in je AI Agent om klantenservice volledig te automatiseren",
                price: "€750",
                period: "per maand",
                note: "bij jaarlijkse betaling",
                features: [
                  "Tot 1.000-25.000 chats/maand",
                  "3 AI Agents",
                  "Onbeperkt teamleden",
                  "Crawl tot 25.000 URL's",
                  "Javascript rendering",
                  "AI Acties & AI integraties",
                  "Verwijder 'Powered by' branding",
                  "Customer Success Manager",
                  "Alles uit Premium"
                ]
              }
            ].map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Populair</Badge>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                    <p className="text-sm text-muted-foreground mt-1">{plan.note}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Start nu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">800+</div>
              <div className="text-muted-foreground">Vragen per week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Tevredenheid</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">&lt;1%</div>
              <div className="text-muted-foreground">Handmatige opvolging</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Beschikbaarheid</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Wat onze klanten zeggen</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sinds de AI HR Agent live is, krijgen we 75% minder interne HR-vragen. Ons team heeft eindelijk tijd voor strategisch werk.",
                name: "Sarah van den Berg",
                role: "HR Manager",
                company: "TechCorp Nederland"
              },
              {
                quote: "Medewerkers krijgen direct antwoord op hun vragen, ook midden in de nacht. De tevredenheid is enorm gestegen.",
                name: "Mark Janssen",
                role: "Operations Director",
                company: "RetailGroup"
              },
              {
                quote: "De integratie met ons HR-systeem verliep vlekkeloos. De ROI was binnen 3 maanden al positief.",
                name: "Lisa Vermeulen",
                role: "CFO",
                company: "FinanceFirst"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIAutomation;
