import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
const Contact = () => {
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon."
    });
    // Reset form fields here if needed
  };
  return <section id="contact" className="py-20 bg-velocity-gray">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Discuss Your Growth Strategy</h2>
            <p className="text-lg text-gray-700 mb-8">
              Ready to accelerate your business growth? Contact us today to schedule a free strategy call and discover how we can help you generate more leads and increase revenue.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-velocity-lightblue p-3 rounded-full">
                  <Phone className="h-5 w-5 text-velocity-blue" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-700">+31 6 25 47 15 28</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-velocity-lightblue p-3 rounded-full">
                  <Mail className="h-5 w-5 text-velocity-blue" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-700">info@leadvelocity.nl</p>
                </div>
              </div>
              
              
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="block font-medium">
                    Company
                  </label>
                  <Input id="company" placeholder="Your company" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-medium">
                    Phone
                  </label>
                  <Input id="phone" placeholder="Your phone number" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="How can we help you?" rows={4} required />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;