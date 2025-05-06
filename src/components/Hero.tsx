
import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart2, Zap, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState(0);
  const {
    toast
  } = useToast();

  // Updated industry list with more consistent lengths and better flow
  const industries = ['Digital Agency', 'Software Company', 'Financial Service', 'Digital Platform', 'Real Estate Firm', 'IT Consultancy', 'Recruitment Agency', 'Education Platform', 'Wholesale Business', 'Business Advisory'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndustry(prev => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('Form_submissions').insert({
        email: email,
        Name: null,
        company: null
      });
      if (error) {
        console.error('Error submitting email:', error);
        toast({
          title: "Submission failed",
          description: "There was an error submitting your email. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Thank you!",
          description: "We'll be in touch with you shortly."
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Exception:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return <section className="relative bg-gradient-to-br from-white to-velocity-lightblue min-h-screen flex items-center">
      <div className="container max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
          <div className="flex flex-col justify-between space-y-10 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight my-[63px]">
                <span className="whitespace-nowrap">Ready to grow your</span>
                <br />
                <div className="flex items-baseline">
                  <span className="text-velocity-blue inline-block min-w-[280px] transition-all duration-300">
                    {industries[currentIndustry]}
                  </span>
                  <span className="ml-1">?</span>
                </div>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg">From outbound campaigns to internal workflows, we design smart, repeatable systems that align with your goals, drive consistent revenue, and set the foundation for long-term business success.</p>
            </div>
            <div className="py-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="flex-grow">
                  <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="h-11" required />
                </div>
                <Button type="submit" size="lg" className="group whitespace-nowrap" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Get Started'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
              <Button variant="link" size="sm" className="mt-2" asChild>
                <a href="#services">Discover Our Services</a>
              </Button>
            </div>
          </div>
          
          <div className="relative flex justify-center animate-fade-in-right">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-md">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Increase Lead Volume</h3>
                    <p className="text-gray-600">Attract high-intent prospects through smarter outreach.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Accelerate Conversions</h3>
                    <p className="text-gray-600">Refine your buyer journey and close faster.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-velocity-lightblue p-3 rounded-lg">
                    <Users className="h-6 w-6 text-velocity-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Build a Stronger Pipeline</h3>
                    <p className="text-gray-600">Fuel your sales team with qualified opportunities, month after month.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
