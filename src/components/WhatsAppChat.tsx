import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+31625471528"; // WhatsApp format without spaces
  const message = "Hallo! Ik ben geïnteresseerd in jullie AI telefonie oplossing voor salons/horeca. Kunnen jullie me meer informatie geven?";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">LeadVelocity</h4>
                <p className="text-sm text-gray-600">Meestal online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm text-gray-700">
              👋 Hallo! Heb je vragen over onze AI telefonie voor salons en horeca? 
              Stuur ons een berichtje via WhatsApp!
            </p>
          </div>
          
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Start WhatsApp chat
          </Button>
        </div>
      )}
      
      {/* WhatsApp button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default WhatsAppChat;