import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Loader2, Bot, User, Copy, Check, Mic, Square, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "Wanneer krijg ik mijn salaris?",
  "Waar vind ik mijn loonstrook?",
  "Waar kan ik mijn contract downloaden?",
  "Ik ben ziek, wat moet ik doen?",
  "Hoe vraag ik vakantie aan?"
];

const LiveDemo = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hey 👋 ik ben Milo, je digitale HR-assistent. Je kunt me appen met vragen over loon, contract, planning of verlof — ik help je meteen verder. Wat wil je graag weten?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [awaitingEmailVerification, setAwaitingEmailVerification] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);


  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText, timestamp: new Date() }]);
    setIsLoading(true);

    // Check if user is providing email for verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (awaitingEmailVerification && emailRegex.test(messageText.trim())) {
      // Simulate verification process
      setTimeout(() => {
        setVerifiedEmail(messageText.trim());
        setAwaitingEmailVerification(false);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Top, dankjewel ✅\nJe bent nu geverifieerd — ik help je verder. Wat wil je weten?`,
          timestamp: new Date() 
        }]);
        setIsLoading(false);
      }, 1500);
      return;
    }

    // DEMO MODE: Check for TRULY personal data keywords (not generic questions)
    const personalKeywords = [
      'mijn loon',
      'mijn salaris', 
      'wat is mijn',
      'mijn vakantiesaldo',
      'hoeveel vakantiedagen heb ik',
      'mijn contract',
      'wanneer loopt mijn contract',
      'mijn loonstrook',
      'stuur mijn'
    ];
    
    // Generic questions that should NOT trigger verification
    const genericQuestions = [
      'wanneer krijg ik mijn salaris',
      'hoe vraag ik vakantie',
      'waar vind ik',
      'hoe meld ik'
    ];
    
    const isGeneric = genericQuestions.some(q => messageText.toLowerCase().includes(q));
    const needsVerification = !isGeneric && personalKeywords.some(keyword => 
      messageText.toLowerCase().includes(keyword)
    );

    // Simulate API delay
    setTimeout(() => {
      if (needsVerification && !verifiedEmail) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Even checken of ik de juiste persoon spreek 🙂\nKun je me je e-mailadres sturen (zoals geregistreerd bij het bedrijf)?",
          timestamp: new Date() 
        }]);
        setAwaitingEmailVerification(true);
        setIsLoading(false);
      } else if (needsVerification && verifiedEmail) {
        // Show demo data for verified users
        let demoResponse = "";
        if (messageText.toLowerCase().includes('vakantie')) {
          demoResponse = `Volgens ons systeem heb je nog 22 vakantiedagen over dit jaar, ${verifiedEmail.split('@')[0]}! 🌴`;
        } else if (messageText.toLowerCase().includes('loon') || messageText.toLowerCase().includes('salaris')) {
          demoResponse = `Je salaris van €3.800 wordt altijd op de 25e van de maand uitbetaald. Als de 25e in het weekend valt, krijg je het de vrijdag ervoor.`;
        } else {
          demoResponse = `Als geverifieerde gebruiker (${verifiedEmail}) kan ik je helpen met je persoonlijke HR-gegevens. Wat wil je precies weten?`;
        }
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: demoResponse,
          timestamp: new Date() 
        }]);
        setIsLoading(false);
      } else {
        // Regular questions - call actual API
        callHRChat(messageText);
      }
    }, 800);
  };

  const callHRChat = async (messageText: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('hr-chat', {
        body: { 
          messages: [...messages, { role: 'user', content: messageText }].map(m => ({ role: m.role, content: m.content })),
          verifiedEmail: verifiedEmail
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }]);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Fout",
        description: error.message || "Er ging iets mis. Probeer het opnieuw.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (content: string, idx: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(idx);
    toast({
      title: "Gekopieerd!",
      description: "Bericht is gekopieerd naar klembord",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Fout",
        description: "Kan microfoon niet openen. Geef toegang tot de microfoon.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        if (!base64Audio) {
          throw new Error('Failed to convert audio to base64');
        }

        const { data, error } = await supabase.functions.invoke('transcribe-audio', {
          body: { audio: base64Audio }
        });

        if (error) throw error;

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.text) {
          await handleSend(data.text);
        }
      };
    } catch (error: any) {
      console.error('Transcription error:', error);
      toast({
        title: "Fout",
        description: error.message || "Kon audio niet transcriberen. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <section id="demo" className="py-3 md:py-4 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-blue-50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm mb-6">
              <MessageSquare className="h-4 w-4 text-secondary" />
              <span>Live Demo</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Test het zelf: <span className="gradient-text">Stel een vraag</span>
            </h2>
            
            <p className="text-xl text-muted-foreground">
              Probeer vragen zoals "Wanneer krijg ik mijn salaris?" of "Ik ben ziek, wat moet ik doen?"
            </p>

            {verifiedEmail && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
                <Shield className="h-4 w-4" />
                <span>Geverifieerd als {verifiedEmail}</span>
              </div>
            )}
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Suggested Questions */}
            {showSuggestions && (
              <div className="mb-4 animate-fade-in px-2">
                <p className="text-xs md:text-sm text-muted-foreground mb-3 text-center">Probeer één van deze vragen:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-white border border-secondary/20 rounded-full text-xs md:text-sm hover:bg-secondary/10 transition-colors shadow-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Card className="bg-[#e5ddd5] shadow-xl p-3 md:p-6 animate-scale-in border-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}>
...
              <p className="text-xs text-muted-foreground mt-4 text-center">
                🤖 Powered by Milo - Je digitale HR-assistent die 24/7 je vragen beantwoordt
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;