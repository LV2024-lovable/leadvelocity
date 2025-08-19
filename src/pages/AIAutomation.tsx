import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, ArrowRight, Phone, Calendar, Mail, Clock, MessageSquare, Scissors, Utensils, Star, CheckCircle2, Shield, Settings, BarChart3, Target, Mic, Database } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TypeWriter from '@/components/TypeWriter';
import WhatsAppChat from '@/components/WhatsAppChat';
import { ContactForm } from '@/components/contact/ContactForm';
const AIAutomation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const howItWorksSteps = [{
    number: "01",
    title: "AI neemt de telefoon op",
    description: "Belt een klant? De agent begroet professioneel, stelt slimme vragen en herkent intenties (boeken, wijzigen, annuleren).",
    icon: <Phone className="h-8 w-8" />,
    color: "from-blue-500 to-indigo-500"
  }, {
    number: "02",
    title: "Plant in jouw systeem",
    description: "We koppelen met je reserverings-/afsprakensysteem. De agent boekt realtime de juiste dienst/tafel/tijd.",
    icon: <Calendar className="h-8 w-8" />,
    color: "from-indigo-500 to-purple-500"
  }, {
    number: "03",
    title: "Bevestiging & reminders",
    description: "Klant ontvangt automatisch bevestiging en optionele reminder. Minder no-shows, meer tevreden klanten.",
    icon: <Mail className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500"
  }];
  const features = ["24/7 telefonische bereikbaarheid", "Automatische bevestigingen (sms/WhatsApp/e-mail)", "Meertalig (NL/EN; uitbreidbaar)", "Slimme no-show-reducerende reminders", "Optionele pre-payment/aanbetaling", "Rapportages & basis-analytics", "Integraties via open API's", "Uitbreidbaar met extra agents"];
  const faqItems = [{
    question: "Werkt dit met mijn salon- of horeca-systeem?",
    answer: "Ja, in de meeste gevallen via API/partnerkoppeling. We checken dit vooraf tijdens de onboarding."
  }, {
    question: "Welke talen ondersteunt de agent?",
    answer: "Standaard Nederlands en Engels. Extra talen zijn beschikbaar op aanvraag."
  }, {
    question: "Hoe gaan bevestigingen/reminders eruit?",
    answer: "Per sms/WhatsApp/e-mail met afspraakdetails, volledig in jouw huisstijl gebranded."
  }, {
    question: "Hoe snel kan ik live?",
    answer: "Gemiddeld binnen 1-2 weken, afhankelijk van je koppelingen en systeem setup."
  }, {
    question: "Is het AVG-proof?",
    answer: "Ja. We verwerken alleen noodzakelijke data en sluiten een verwerkersovereenkomst af."
  }, {
    question: "Wat als een klant een complexe vraag heeft?",
    answer: "De agent herkent uitzonderingen en kan doorschakelen of een taak aanmaken voor opvolging."
  }];
  return <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight pb-2">
              <TypeWriter text="Laat AI al je afspraken en reserveringen regelen — 24/7, zonder wachtrij" speed={50} />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4">Onze voice agent neemt de telefoon op, plant afspraken in jouw systeem en stuurt direct een bevestiging. </p>
          </div>

          {/* Key Benefits */}
          <div className="mb-12 sm:mb-20 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 max-w-6xl mx-auto">
              {[{
              icon: <Phone className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Geen gemiste calls",
              desc: "24/7 bereikbaar",
              color: "from-blue-500 to-indigo-500"
            }, {
              icon: <Calendar className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Minder no-shows",
              desc: "Slimme reminders",
              color: "from-indigo-500 to-purple-500"
            }, {
              icon: <Mail className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Directe bevestiging",
              desc: "SMS/WhatsApp/email",
              color: "from-blue-600 to-cyan-500"
            }, {
              icon: <Clock className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Tijd besparen",
              desc: "Uren per week terug",
              color: "from-blue-500 to-teal-500"
            }].map((benefit, index) => <div key={index} className={`text-center p-3 sm:p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover-lift animate-scale-in stagger-${index + 1}`}>
                  <div className={`mb-2 sm:mb-6 mx-auto w-8 h-8 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white shadow-lg animate-float`} style={{animationDelay: `${index * 0.5}s`}}>
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-lg">{benefit.text}</h3>
                  <p className="text-gray-600 text-xs sm:text-base">{benefit.desc}</p>
                </div>)}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in px-4" style={{
          animationDelay: '0.4s'
        }}>
            <Button size="lg" onClick={() => scrollToSection('contact')} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover-lift animate-pulse-glow">
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Plan een gratis demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('how-it-works')} className="w-full sm:w-auto border-2 border-gray-300 hover:border-blue-500 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover:bg-blue-50 transition-all hover-lift">
              Bekijk hoe het werkt
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Target Groups Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-2">
              Speciaal voor salons & horeca
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AI die begrijpt wat jouw branche nodig heeft
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Salons Block */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover-lift animate-slide-in-left">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg mr-4 animate-bounce-gentle">
                    <Scissors className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Voor salons die tijd willen winnen</h3>
                    <p className="text-gray-600">Kapsalon • Nagelstudio • Beauty</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  AI neemt de telefoon op, plant afspraken (knippen, kleuren, mani/pedi, behandelingen), 
                  stuurt bevestigingen en reminders — volledig automatisch.
                </p>
              </CardContent>
            </Card>

            {/* Horeca Block */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover-lift animate-slide-in-right">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg mr-4 animate-bounce-gentle" style={{animationDelay: '0.5s'}}>
                    <Utensils className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Voor horeca die nooit een reservering wil missen</h3>
                    <p className="text-gray-600">Restaurant • Café • Bar</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Onze agent verwerkt inkomende telefoontjes, checkt beschikbaarheid, 
                  maakt/annuleert/wijzigt reserveringen en verstuurt direct een bevestiging.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-2">
              Zo werkt het
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Van telefoontje tot bevestiging in drie simpele stappen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {howItWorksSteps.map((step, index) => <div key={index} className={`text-center group animate-fade-in stagger-${index + 1}`}>
                <div className="relative mb-8">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle`} style={{animationDelay: `${index * 0.3}s`}}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold animate-pulse">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Social Proof & Results Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-2">
              Bewezen resultaten
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Wat onze klanten bereiken met AI telefonie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16">
            {[{
            stat: "+30%",
            description: "meer afspraken buiten piekuren",
            icon: <BarChart3 className="h-8 w-8" />
          }, {
            stat: "0",
            description: "gemiste telefoontjes meer",
            icon: <Phone className="h-8 w-8" />
          }, {
            stat: "5+ uur",
            description: "per week terug voor je team",
            icon: <Clock className="h-8 w-8" />
          }].map((result, index) => <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                    {result.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{result.stat}</div>
                  <p className="text-gray-600">{result.description}</p>
                </CardContent>
              </Card>)}
          </div>
          
          <div className="text-center">
            <Button size="lg" onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Plan een gratis demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-2">
              Alles wat je nodig hebt
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Speciaal ontwikkeld voor salons en horeca
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">{feature}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>


      {/* Workflow Examples */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-4">
            AI Agents in Actie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {[{
            title: "Afspraak Inplannen Agent",
            steps: ["Neemt telefoontjes 24/7 professioneel op", "Checkt realtime beschikbaarheid in jouw agenda", "Plant afspraken voor knippen, kleuren, behandelingen", "Stuurt directe bevestiging via SMS/WhatsApp", "Verstuurt automatische reminders"],
            icon: <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
          }, {
            title: "Review Generatie Agent",
            steps: ["Detecteert voltooide afspraken automatisch", "Verstuurt gepersonaliseerde review-verzoeken", "Genereert positieve review-templates", "Volgt review-responses en bedankt klanten", "Analyseert feedback voor verbeteringen"],
            icon: <Star className="h-6 w-6 sm:h-8 sm:w-8" />
          }, {
            title: "Agenda & Mail Inbox Agent",
            steps: ["Synchroniseert afspraken tussen systemen", "Beheert agenda-wijzigingen en annuleringen", "Analyseert inkomende emails per prioriteit", "Drafts professionele antwoorden in jouw stijl", "Escaleert urgente berichten direct"],
            icon: <Mail className="h-6 w-6 sm:h-8 sm:w-8" />
          }, {
            title: "CRM & Onboarding Agent",
            steps: ["Registreert nieuwe klanten automatisch", "Verzamelt klantvoorkeuren en historie", "Verstuurt welkomstberichten en instructies", "Onderhoudt klantprofielen en notities", "Genereert loyaliteit en retentie-acties"],
            icon: <Target className="h-6 w-6 sm:h-8 sm:w-8" />
          }].map((workflow, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="mr-4 p-3 sm:p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl text-blue-600">
                      {workflow.icon}
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{workflow.title}</h3>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {workflow.steps.map((step, idx) => <div key={idx} className="flex items-start">
                        <div className="mr-3 sm:mr-4 mt-1 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{step}</p>
                      </div>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-4">
            Wat onze klanten zeggen
          </h2>
          
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {[{
              quote: "Geen gemiste telefoontjes meer! De AI agent plant alle afspraken perfect in en mijn klanten krijgen meteen een bevestiging. Bespaar minstens 2 uur per dag.",
              author: "Sandra Bakker",
              role: "Eigenaar, Salon Sandra",
              avatar: "SB"
            }, {
              quote: "Als drukke kapsalon hadden we constant het probleem van no-shows. De automatische reminders hebben dit met 60% verminderd. Fantastisch!",
              author: "Marco van Dijk",
              role: "Kapsalon Marco",
              avatar: "MD"
            }, {
              quote: "Onze gasten kunnen nu 24/7 reserveren, ook als we gesloten zijn. Het systeem checkt automatisch onze bezetting en stuurt bevestigingen. Meer reserveringen, minder stress.",
              author: "Lisa Hendricks",
              role: "Manager, Restaurant De Smederij",
              avatar: "LH"
            }, {
              quote: "De review-agent heeft ons van 3,2 naar 4,7 sterren gebracht op Google. Klanten krijgen automatisch een vriendelijk verzoek na hun behandeling.",
              author: "Patricia Mulder",
              role: "Schoonheidssalon Bella Vita",
              avatar: "PM"
            }, {
              quote: "Vroeger zat ik constant aan de telefoon voor reserveringen. Nu focus ik volledig op mijn gasten terwijl de AI alle boekingen afhandelt.",
              author: "David Chen",
              role: "Restaurant Little Saigon",
              avatar: "DC"
            }, {
              quote: "Het CRM-gedeelte houdt perfect bij welke kleur elke klant gebruikt en welke behandelingen ze graag hebben. Persoonlijke service op een hoger niveau!",
              author: "Ingrid Visser",
              role: "Salon Ingrid",
              avatar: "IV"
            }].map((testimonial, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                    <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg italic flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 text-white text-sm sm:text-base font-semibold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.author}</div>
                        <div className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent leading-tight pb-4">We helpen je graag</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Over ons team</h3>
              
              {/* Team Member Profile */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 sm:mb-8 p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100/50">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src="/lovable-uploads/e63e2942-46a9-4993-a1d4-a6b0c7ade3fc.png" 
                      alt="Bart - Lead Velocity Team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Bart</h4>
                  <p className="text-blue-600 font-medium mb-3">AI Automation Specialist</p>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Gespecialiseerd in AI oplossingen. Helpt vele ondernemers om meer tijd te besteden aan hun klanten.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                Wij zijn gespecialiseerd in AI-oplossingen voor salons en horeca. Als ondernemers zelf weten we hoe frustrerend gemiste telefoontjes en no-shows kunnen zijn. Onze missie is om salon- en horeca-eigenaren te helpen meer tijd te besteden aan hun klanten in plaats van aan de telefoon.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700 text-base sm:text-lg">info@leadvelocity.nl</span>
                </div>
                <div className="flex space-x-4 sm:space-x-6">
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base">LinkedIn</a>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base">
                </a>
                </div>
              </div>
            </div>
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 sm:p-8">
                <form className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Naam</label>
                    <input type="text" className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Email</label>
                    <input type="email" className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Bedrijf</label>
                    <input type="text" className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Bericht</label>
                    <textarea rows={4} className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 shadow-lg">
                    Verstuur Bericht
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppChat />
    </div>;
};
export default AIAutomation;