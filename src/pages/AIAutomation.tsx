import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Calendar, Mail, Shield, Users, ArrowRight, Play, Brain, Workflow, Bot, Target, TrendingUp, Clock, Mic, MessageSquare, BarChart3, Settings, Database, Link2 } from 'lucide-react';
import TypeWriter from '@/components/TypeWriter';
import GoogleCalendarScheduler from '@/components/GoogleCalendarScheduler';
const AIAutomation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              <TypeWriter text="Automatiseer uw complete workflow met AI" speed={80} />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4">Stop met tijd verspillen en laat AI uw workflow verbeteren en verhoog uw productiviteit met 400%.</p>
          </div>

          {/* Key Benefits */}
          <div className="mb-12 sm:mb-20 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 max-w-6xl mx-auto">
              {[{
              icon: <Bot className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "AI Agents",
              desc: "Intelligente assistenten",
              color: "from-blue-500 to-indigo-500"
            }, {
              icon: <Workflow className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Automation",
              desc: "Slimme workflows",
              color: "from-indigo-500 to-purple-500"
            }, {
              icon: <Mic className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Voice to Action",
              desc: "Spraak naar taken",
              color: "from-blue-600 to-cyan-500"
            }, {
              icon: <Link2 className="h-4 w-4 sm:h-8 sm:w-8" />,
              text: "Integraties",
              desc: "200+ Verbindingen",
              color: "from-blue-500 to-teal-500"
            }].map((benefit, index) => <div key={index} className="text-center p-3 sm:p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:shadow-lg transition-all duration-300">
                  <div className={`mb-2 sm:mb-6 mx-auto w-8 h-8 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white shadow-lg`}>
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
            <Button size="lg" onClick={() => scrollToSection('testimonials')} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg">
              <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Bekijk Ervaringen
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="w-full sm:w-auto border-2 border-gray-300 hover:border-blue-500 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover:bg-blue-50 transition-all">
              Start Automatiseren
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 sm:mt-20 animate-fade-in" style={{
          animationDelay: '0.6s'
        }}>
            <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg">Vertrouwd door 50+ bedrijven in Nederland</p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:space-x-8 opacity-60">
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 rounded-lg text-gray-600 font-medium border border-gray-200/50 text-sm sm:text-base">Consultancy</div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 rounded-lg text-gray-600 font-medium border border-gray-200/50 text-sm sm:text-base">SaaS</div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 rounded-lg text-gray-600 font-medium border border-gray-200/50 text-sm sm:text-base">E-commerce</div>
              <div className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 rounded-lg text-gray-600 font-medium border border-gray-200/50 text-sm sm:text-base">Finance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              Herkenbare uitdagingen die we oplossen
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Inefficiënte processen kosten tijd en geld. WorkflowAI elimineert deze frustraties met intelligente automatisering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {[{
            problem: "Vergaderingen zonder opvolging",
            solution: "Automatische samenvattingen en actiepunten"
          }, {
            problem: "Handmatig e-mail beheer",
            solution: "AI drafts en slimme inbox-organisatie"
          }, {
            problem: "Gefragmenteerde tools en data",
            solution: "Naadloze integraties tussen alle systemen"
          }, {
            problem: "Repetitieve taken en processen",
            solution: "Volledig geautomatiseerde workflows"
          }].map((item, index) => <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 text-red-600 font-medium flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">{item.problem}</span>
                  </div>
                  <div className="text-blue-600 font-medium flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item.solution}</span>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Vier Krachtige Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {[{
            icon: <Brain className="h-8 w-8 sm:h-12 sm:w-12" />,
            title: "AI Agents",
            subtitle: "Intelligente agents die luisteren, redeneren en handelen",
            features: ["Meeting assistant - samenvattingen, taken, follow-ups", "Inbox agent - e-mail drafts en thread management", "CRM & onboarding agents - gepersonaliseerde workflows"],
            gradient: "from-blue-500 to-indigo-500"
          }, {
            icon: <Workflow className="h-8 w-8 sm:h-12 sm:w-12" />,
            title: "Workflow Automation",
            subtitle: "Trigger-gebaseerde taakstromen tussen tools",
            features: ["Kalender → taak → herinnering automatisering", "Auto-routing op basis van context en team", "Wekelijkse rapporten en goedkeuringen door AI"],
            gradient: "from-indigo-500 to-purple-500"
          }, {
            icon: <Mic className="h-8 w-8 sm:h-12 sm:w-12" />,
            title: "Voice to Action",
            subtitle: "Van spraakopnames naar gestructureerde uitkomsten",
            features: ["Transcriptie → Samenvatting → Actiepunten", "Live vergaderingen naar concrete taken", "Spraakopdrachten voor follow-ups en planning"],
            gradient: "from-blue-600 to-cyan-500"
          }, {
            icon: <Link2 className="h-8 w-8 sm:h-12 sm:w-12" />,
            title: "Integraties & Ecosystem",
            subtitle: "Naadloze verbindingen met al uw tools",
            features: ["Google Calendar, Outlook, Slack, Notion, CRM", "API-ready en Zapier/n8n compatibel", "RPA-extensies voor legacy workflows"],
            gradient: "from-blue-500 to-teal-500"
          }].map((feature, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden bg-white">
                <CardContent className="p-6 sm:p-8 relative">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}></div>
                  <div className={`mb-4 sm:mb-6 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">{feature.subtitle}</p>
                  <ul className="space-y-3 sm:space-y-4">
                    {feature.features.map((item, idx) => <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Ervaar Voice to Action Live
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">Zie hoe onze AI spraak omzet in concrete acties.</p>
          
          <div className="relative max-w-5xl mx-auto animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl"></div>
            <div className="relative bg-white rounded-3xl p-2 sm:p-3 shadow-2xl border border-gray-200/50">
              <iframe src="https://preview--whisper-and-act.lovable.app" className="w-full h-64 sm:h-96 md:h-[500px] rounded-2xl border-0" title="Voice to Action Demo" />
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-red-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></div>
              <div className="absolute top-4 sm:top-6 left-7 sm:left-11 bg-yellow-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></div>
              <div className="absolute top-4 sm:top-6 left-10 sm:left-16 bg-green-500 rounded-full w-2 h-2 sm:w-3 sm:h-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Examples */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            AI Agents in Actie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {[{
            title: "Meeting Assistant Workflow",
            steps: ["AI luistert live mee tijdens vergaderingen", "Genereert automatisch gestructureerde samenvattingen", "Extraheert actiepunten en deadlines", "Verstuurt follow-up emails naar deelnemers", "Plant vervolgafspraken in agenda's"],
            icon: <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />
          }, {
            title: "Inbox Agent Automation",
            steps: ["Analyseert inkomende emails per thread", "Categoriseert berichten op urgentie en type", "Drafts intelligente antwoorden in jouw stijl", "Escaleert belangrijke berichten naar je aandacht", "Archiveert en labelt automatisch"],
            icon: <Mail className="h-6 w-6 sm:h-8 sm:w-8" />
          }, {
            title: "CRM & Onboarding Agent",
            steps: ["Detecteert nieuwe leads en klanten automatisch", "Personaliseert onboarding-workflows per profiel", "Synchroniseert data tussen CRM en tools", "Triggert gepaste communicatie op timing", "Rapporteert progress en bottlenecks"],
            icon: <Target className="h-6 w-6 sm:h-8 sm:w-8" />
          }, {
            title: "Voice Command System",
            steps: ["Luistert naar natuurlijke spraakopdrachten", "Interpreteert intentie en context slim", "Voert acties uit in verbonden systemen", "Bevestigt voltooiing met feedback", "Leert van gebruikerspatronen voor optimalisatie"],
            icon: <Mic className="h-6 w-6 sm:h-8 sm:w-8" />
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

      {/* Integrations */}
      <section id="integrations" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Krachtige Integraties
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
            Verbind naadloos met meer dan 200+ tools en platforms. Van legacy systemen tot moderne SaaS-applicaties.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {[{
            icon: <Calendar className="h-6 w-6 sm:h-8 sm:w-8" />,
            title: "Agenda & Planning",
            tools: ["Google Calendar", "Outlook Calendar", "Calendly", "Notion Calendar"]
          }, {
            icon: <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8" />,
            title: "Communicatie",
            tools: ["Slack", "Microsoft Teams", "Zoom", "Discord"]
          }, {
            icon: <Database className="h-6 w-6 sm:h-8 sm:w-8" />,
            title: "CRM & Projecten",
            tools: ["HubSpot", "Salesforce", "Notion", "Asana", "Trello"]
          }].map((category, index) => <Card key={index} className="border-0 shadow-lg text-center bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 sm:mb-6 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl text-blue-600">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">{category.title}</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {category.tools.map((tool, idx) => <div key={idx} className="bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm text-gray-700 font-medium border border-gray-200/50">
                        {tool}
                      </div>)}
                  </div>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 opacity-70">
              {['API-ready', 'Zapier Compatible', 'n8n Support', 'RPA Extensions', 'Webhook Triggers', 'Custom Connectors'].map(feature => <div key={feature} className="bg-white/80 px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-sm border border-gray-200/50 text-gray-700 font-medium backdrop-blur-sm text-xs sm:text-sm">
                  {feature}
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Wat onze klanten zeggen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {[{
            quote: "WorkflowAI heeft onze productiviteit met 40% verhoogd. We missen geen enkel actiepunt meer en onze klanten zijn onder de indruk van onze professionele follow-up.",
            author: "Sarah van der Berg",
            role: "Founder, DesignStudio Amsterdam",
            avatar: "SB"
          }, {
            quote: "Als product manager had ik altijd moeite om alle feedback uit stakeholder meetings bij te houden. Nu krijg ik automatisch gestructureerde samenvattingen die ik direct kan gebruiken voor onze roadmap.",
            author: "Mark Jansen",
            role: "Product Manager, TechCorp",
            avatar: "MJ"
          }].map((testimonial, index) => <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg italic">"{testimonial.quote}"</p>
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
              </Card>)}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">We helpen je graag</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 mb-16">
            <div className="lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Over ons team</h3>
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                Wij zijn een team van AI-experts en productiviteitsspecialisten die gefrustreerd waren door inefficiënte vergaderingen en gemiste follow-ups. Onze missie is om professionals en teams te helpen hun tijd optimaal te benutten.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700 text-base sm:text-lg">hello@leadvelocity.nl</span>
                </div>
                <div className="flex space-x-4 sm:space-x-6">
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base">LinkedIn</a>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base">Twitter</a>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <GoogleCalendarScheduler />
            </div>
            
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-900">Stuur ons een bericht</h3>
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
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default AIAutomation;