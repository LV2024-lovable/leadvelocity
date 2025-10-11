import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Mic, Square, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: 'user' | 'ai';
  text: string;
  time: string;
}

const LiveDemo = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'ai', 
      text: 'Hoi! Ik ben je AI HR-assistent. Vraag me iets over vakantiedagen, loon, ziekteverzuim, of andere HR-zaken.', 
      time: '10:13' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Hoeveel vakantiedagen heb ik nog?',
    'Wanneer krijg ik mijn loon?',
    'Hoe moet ik mij ziek melden?',
    'Wat zijn de HR openingstijden?',
    'Waar kan ik mijn loonstrook vinden?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      type: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage].map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const { data, error } = await supabase.functions.invoke('hr-chat', {
        body: { messages: conversationHistory }
      });

      if (error) throw error;

      const aiMessage: Message = {
        type: 'ai',
        text: data.message || 'Sorry, ik kon je vraag niet verwerken. Probeer het opnieuw.',
        time: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Fout',
        description: error.message || 'Er ging iets mis. Probeer het opnieuw.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
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
        title: 'Microfoon fout',
        description: 'Kon geen toegang krijgen tot de microfoon',
        variant: 'destructive'
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];

        const { data, error } = await supabase.functions.invoke('transcribe-audio', {
          body: { audio: base64Audio }
        });

        setIsTranscribing(false);

        if (error) throw error;

        if (data?.text) {
          await handleSendMessage(data.text);
        }
      };
    } catch (error: any) {
      console.error('Error transcribing audio:', error);
      setIsTranscribing(false);
      toast({
        title: 'Transcriptie fout',
        description: error.message || 'Kon audio niet verwerken',
        variant: 'destructive'
      });
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
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
                onClick={() => handleSendMessage(question)}
                disabled={isLoading}
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-xl">
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-muted/20 to-background">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className={`max-w-[75%] rounded-2xl p-4 ${
                    message.type === 'user' 
                      ? 'bg-[#25D366] text-white' 
                      : 'bg-white border border-border shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <p className={`text-xs ${
                        message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.time}
                      </p>
                      {message.type === 'ai' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(message.text, index)}
                        >
                          {copiedIndex === index ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] rounded-2xl p-4 bg-white border border-border shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {isTranscribing && (
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl p-4 bg-[#25D366] text-white">
                    <p className="text-sm">Transcriberen...</p>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Typ je vraag hier..."
                  disabled={isLoading || isRecording || isTranscribing}
                  className="flex-1"
                />
                
                {!isRecording ? (
                  <>
                    <Button
                      onClick={startRecording}
                      disabled={isLoading || isTranscribing}
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={isLoading || !inputValue.trim() || isTranscribing}
                      size="icon"
                      className="shrink-0 bg-[#25D366] hover:bg-[#25D366]/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={stopRecording}
                    variant="destructive"
                    size="icon"
                    className="shrink-0 animate-pulse"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                🤖 Powered by AI - De agent leert van echte HR-data en kan 24/7 vragen beantwoorden
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LiveDemo;
