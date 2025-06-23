
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';

interface GoogleCalendarSchedulerProps {
  title?: string;
  description?: string;
  duration?: number; // in minutes
  location?: string;
}

const GoogleCalendarScheduler: React.FC<GoogleCalendarSchedulerProps> = ({
  title = "WorkflowAI Consultation Call",
  description = "Discover how WorkflowAI can transform your business processes with intelligent automation.",
  duration = 30,
  location = "Google Meet (link will be provided)"
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const generateGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return '';

    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    const formatDateTime = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}`,
      details: description,
      location: location,
      trp: 'true'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleScheduleCall = () => {
    const url = generateGoogleCalendarUrl();
    if (url) {
      window.open(url, '_blank');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl text-blue-600">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">Plan een Gratis Consultatie</h3>
          <p className="text-gray-600">Kies een datum en tijd die voor u uitkomt</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Datum
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getMinDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Tijd
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Selecteer een tijd</option>
              {getTimeSlots().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Wat kunt u verwachten:</h4>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Persoonlijke analyse van uw workflow</li>
                  <li>• Demonstratie van WorkflowAI mogelijkheden</li>
                  <li>• Antwoorden op al uw vragen</li>
                  <li>• Geen verplichtingen</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            onClick={handleScheduleCall}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Voeg toe aan Google Calendar
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Dit opent Google Calendar waar u de afspraak kunt bevestigen
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleCalendarScheduler;
