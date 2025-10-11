
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters hebben" }),
  business: z.string().min(2, { message: "Bedrijfsnaam is verplicht" }),
  email: z.string().email({ message: "Voer een geldig e-mailadres in" }),
  phone: z.string().min(10, { message: "Telefoon is verplicht voor demo planning" }),
  branch: z.enum(["salon", "horeca"], { message: "Selecteer uw branche" }),
  current_system: z.string().optional(),
  message: z.string().min(10, { message: "Bericht moet minimaal 10 karakters hebben" })
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps = {}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      business: '',
      email: '',
      phone: '',
      branch: undefined,
      current_system: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setDebugInfo(null);
    console.log("Form submission started with data:", data);
    
    try {
      // First, save to database
      console.log("Saving to database...");
      const { error: dbError } = await supabase
        .from('Form_submissions')
        .insert({
          Name: data.name,
          company: data.business,
          email: data.email,
          phone: data.phone ? Number(data.phone) : null,
          Message: `Branche: ${data.branch}\nHuidig systeem: ${data.current_system || 'Niet opgegeven'}\n\n${data.message}`
        });

      if (dbError) {
        console.error('Error saving to database:', dbError);
        setDebugInfo(prev => (prev || '') + `\nDatabase Error: ${dbError.message}`);
        throw dbError;
      }
      console.log("Successfully saved to database");

      // Then, send to Slack
      console.log("Sending to Slack...");
      const slackResponse = await supabase.functions.invoke('slack-notify', {
        body: data
      });

      console.log("Slack response:", slackResponse);
      
      if (slackResponse.error) {
        console.error('Error sending to Slack:', slackResponse.error);
        console.error('Slack error details:', JSON.stringify(slackResponse));
        setDebugInfo(prev => (prev || '') + `\nSlack Error: ${JSON.stringify(slackResponse.error)}`);
        // Don't throw here - we still want to continue with the email notification
      } else {
        console.log("Slack notification sent successfully:", slackResponse.data);
      }

      // Also, send an email notification
      console.log("Sending email notification...");
      const emailResponse = await supabase.functions.invoke('email-notify', {
        body: data
      });

      console.log("Email response:", emailResponse);
      
      if (emailResponse.error) {
        console.error('Error sending email notification:', emailResponse.error);
        console.error('Email error details:', JSON.stringify(emailResponse));
        setDebugInfo(prev => (prev || '') + `\nEmail Error: ${JSON.stringify(emailResponse.error)}`);
        // Don't throw here - we still want to show success if DB save worked
      } else {
        console.log("Email notification sent successfully:", emailResponse.data);
      }

      toast({
        title: "Demo aanvraag verzonden!",
        description: "Bedankt voor je interesse. We nemen binnen 24 uur contact op voor je demo."
      });
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      console.error('Form submission error:', error);
      setDebugInfo(prev => (prev || '') + `\nGeneral Error: ${error.message}`);
      toast({
        title: "Verzending mislukt",
        description: "Er is een fout opgetreden. Probeer het opnieuw of bel ons direct.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Plan je gratis demo</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Naam *</FormLabel>
                  <FormControl>
                    <Input placeholder="Je naam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="business"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Bedrijfsnaam *</FormLabel>
                  <FormControl>
                    <Input placeholder="Naam van je salon/restaurant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="je@bedrijf.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Telefoon *</FormLabel>
                  <FormControl>
                    <Input placeholder="06 12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Branche *</FormLabel>
                  <FormControl>
                    <select 
                      {...field} 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecteer branche</option>
                      <option value="salon">Salon (kapper/nagels/beauty)</option>
                      <option value="horeca">Horeca (restaurant/café/bar)</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="current_system"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Huidig systeem</FormLabel>
                  <FormControl>
                    <Input placeholder="Welk systeem gebruik je nu?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Bericht</FormLabel>
                <FormControl>
                  <Textarea placeholder="Vertel ons over je uitdagingen met telefonie en afspraken..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" disabled={isSubmitting}>
            {isSubmitting ? 'Demo wordt aangevraagd...' : 'Plan gratis demo'}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Door dit formulier in te vullen ga je akkoord met onze AVG-voorwaarden
          </p>
          
          {debugInfo && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-sm">
              <p className="font-bold mb-2">Debug Information:</p>
              <pre className="whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
