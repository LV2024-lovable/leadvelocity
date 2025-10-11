import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, MessageSquare, Send, FileText, Calendar, Clock, Users, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import heroImage from '@/assets/hero-ai.jpg';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const AIAutomation = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hoi! Ik ben je AI HR-assistent. Vraag me iets over vakantiedagen, loon, ziekteverzuim, of andere HR-zaken.', time: '10:13' }
  ]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickQuestions = [
    'Hoeveel vakantiedagen heb ik nog?',
    'Wanneer krijg ik mijn loon?',
    'Hoe moet ik mij ziek melden?',
    'Wat zijn de HR openingstijden?',
    'Waar kan ik mijn loonstrook vinden?'
  ];

  const handleQuickQuestion = (question: string) => {
    setMessages([...messages, { type: 'user', text: question, time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'Hoeveel vakantiedagen heb ik nog?': 'Op basis van je contract heb je nog 15 vakantiedagen over dit jaar. Wil je deze inplannen?',
        'Wanneer krijg ik mijn loon?': 'Je loon wordt altijd op de 25e van de maand uitbetaald. De eerstvolgende uitbetaling is op 25 januari.',
        'Hoe moet ik mij ziek melden?': 'Bij ziekte bel je voor 09:00 uur je direct leidinggevende. Daarnaast vul je het ziekteformulier in op het HR-portaal.',
        'Wat zijn de HR openingstijden?': 'HR is bereikbaar van maandag t/m vrijdag van 09:00 tot 17:00 uur. Voor spoedeisende zaken kun je altijd bellen.',
        'Waar kan ik mijn loonstrook vinden?': 'Je loonstroken vind je in het HR-portaal onder "Mijn Documenten" > "Loonstroken". Je kunt inloggen met je bedrijfscredentials.'
      };
      
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: responses[question] || 'Bedankt voor je vraag! Een HR-medewerker neemt zo snel mogelijk contact met je op.', 
        time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setMessages([...messages, { type: 'user', text: chatMessage, time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) }]);
    setChatMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: 'Bedankt voor je vraag! Een HR-medewerker neemt zo snel mogelijk contact met je op voor een persoonlijk antwoord.', 
        time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  const capabilities = [
    { question: 'Hoeveel vakantiedagen heb ik nog?', icon: <Calendar className="h-6 w-6" /> },
    { question: 'Wanneer krijg ik mijn loon?', icon: <Clock className="h-6 w-6" /> },
    { question: 'Waar vind ik mijn loonstrook?', icon: <FileText className="h-6 w-6" /> },
    { question: 'Hoe meld ik me ziek?', icon: <Users className="h-6 w-6" /> },
    { question: 'Wat zijn de interne vacatures?', icon: <Users className="h-6 w-6" /> },
    { question: 'Hoe werkt mijn pensioenregeling?', icon: <FileText className="h-6 w-6" /> },
  ];

  const steps = [
    {
      number: 1,
      title: 'Jij levert je HR-documenten',
      description: 'PDF, Word, Intranet, FAQ - wij verwerken het allemaal'
    },
    {
      number: 2,
      title: 'Wij trainen jouw AI-agent',
      description: 'Binnen 48 uur is je slimme assistent operationeel'
    },
    {
      number: 3,
      title: 'Medewerkers stellen vragen',
      description: 'Via WhatsApp - direct antwoord, 24/7 beschikbaar'
    },
    {
      number: 4,
      title: 'Complexe vragen naar HR',
      description: 'Automatische doorverwijzing als menselijke expertise nodig is'
    }
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Zelflerende AI',
      description: 'Leert van vragen en past zich aan jouw organisatie aan'
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'Koppelt met HR-tools',
      description: 'Nmbrs, Loket.nl, AFAS, Visma en meer'
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: 'AVG-compliant',
      description: 'Privacyproof en veilig volgens Europese wetgeving'
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'WhatsApp = geen apps',
      description: 'Medewerkers gebruiken hun vertrouwde berichtendienst'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 beschikbaarheid',
      description: 'Ook \'s nachts en in het weekend direct antwoord'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Directe antwoorden',
      description: 'Gemiddelde reactietijd < 3 seconden'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '€250',
      period: 'per maand',
      description: 'Automatiseer je veelgestelde vragen met een GPT-5 aangedreven AI Agent',
      features: [
        'Tot 250-500 chats/maand',
        '1 AI Agent',
        '3 teamleden',
        'Website chat widget',
        'WhatsApp, Facebook, Instagram',
        'Prompting module',
        'Statistieken',
        '5 Sterren support'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '€417',
      period: 'per maand',
      description: 'Scrape je website en documenten om je AI Agent razendsnel te bouwen',
      features: [
        'Tot 500-1.000 chats/maand',
        '1 AI Agent',
        '10 teamleden',
        'Crawl tot 10.000 URL\'s',
        'Website crawler',
        'Document scraper',
        'Inbox & Menselijke handoff',
        'API-toegang',
        'Alles uit Basic'
      ],
      popular: true
    },
    {
      name: 'Business',
      price: '€750',
      period: 'per maand',
      description: 'Integreer je systemen in je AI Agent om klantenservice volledig te automatiseren',
      features: [
        'Tot 1.000-25.000 chats/maand',
        '3 AI Agents',
        'Onbeperkt teamleden',
        'Crawl tot 25.000 URL\'s',
        'Javascript rendering',
        'AI Acties & AI integraties',
        'Verwijder \'Powered by\' branding',
        'Customer Success Manager',
        'Alles uit Premium'
      ],
      popular: false
    }
  ];

  const stats = [
    { value: '800+', label: 'Vragen per week' },
    { value: '95%', label: 'Tevredenheid' },
    { value: '<1%', label: 'Handmatige opvolging' },
    { value: '24/7', label: 'Beschikbaarheid' }
  ];

  const testimonials = [
    {
      quote: 'Sinds de AI HR Agent live is, krijgen we 75% minder interne HR-vragen. Ons team heeft eindelijk tijd voor strategisch werk.',
      name: 'Sarah van den Berg',
      role: 'HR Manager',
      company: 'TechCorp Nederland'
    },
    {
      quote: 'Medewerkers krijgen direct antwoord op hun vragen, ook midden in de nacht. De tevredenheid is enorm gestegen.',
      name: 'Mark Janssen',
      role: 'Operations Director',
      company: 'RetailGroup'
    },
    {
      quote: 'De integratie met ons HR-systeem verliep vlekkeloos. De ROI was binnen 3 maanden al positief.',
      name: 'Lisa Vermeulen',
      role: 'CFO',
      company: 'FinanceFirst'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-medium text-primary">AI-powered HR assistant</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Automatiseer je <span className="text-primary">HR-communicatie</span> met AI
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

      {/* Live Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live Demo</h2>
            <p className="text-xl text-muted-foreground">Test het zelf: Stel een vraag</p>
            <p className="text-muted-foreground mt-2">
              Probeer vragen zoals "Hoeveel vakantiedagen heb ik nog?" of "Wanneer krijg ik mijn loon?"
            </p>
          </div>

          {/* Quick Questions */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Probeer één van deze vragen:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="h-96 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-4 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Typ je vraag hier..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                🤖 Powered by AI - De agent leert van echte HR-data en kan 24/7 vragen beantwoorden
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Wat je AI HR Agent kan beantwoorden
            </h2>
            <p className="text-xl text-muted-foreground">
              Van eenvoudige vragen tot complexe HR-zaken. De AI leert van je eigen documenten en processen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.question}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-xl">
            <p className="text-center text-lg">
              <span className="font-semibold">Jij bepaalt de kennisbasis.</span> Wij trainen de AI op jouw documenten, portalen en taal.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hoe het werkt</h2>
            <p className="text-xl text-muted-foreground">
              Van documentatie tot live AI-agent in vier simpele stappen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Waarom kiezen voor AI HR Agent
            </h2>
            <p className="text-xl text-muted-foreground">
              Slimme technologie die écht werkt voor jouw organisatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Transparante prijzen</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Kies het pakket dat bij jouw organisatie past. Opschalen kan altijd.
            </p>
            
            <Tabs defaultValue="yearly" className="inline-block">
              <TabsList>
                <TabsTrigger value="monthly">Maandelijks</TabsTrigger>
                <TabsTrigger value="yearly">
                  Jaarlijks <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Bespaar 17%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Populair
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                    <p className="text-xs text-muted-foreground mt-1">bij jaarlijkse betaling</p>
                  </div>
                  <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                    Start nu
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Wat onze klanten zeggen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
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
