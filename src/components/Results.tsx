
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const testimonials = [
  {
    quote: "Lead Velocity transformed our marketing approach. We've seen a 215% increase in qualified leads within just 3 months of working with them.",
    author: "Michael Jansen",
    position: "Marketing Director, TechFlow Solutions",
    image: "/placeholder.svg",
    initials: "MJ",
    stars: 5,
  },
  {
    quote: "Their strategic approach and attention to detail have been exceptional. Our conversion rates have improved by 78% since implementing their recommendations.",
    author: "Sophia van den Berg",
    position: "CEO, GrowthMarket",
    image: "/placeholder.svg",
    initials: "SB",
    stars: 5,
  },
  {
    quote: "Working with Lead Velocity has been a game-changer for our B2B sales process. They've helped us generate consistent leads that actually convert.",
    author: "Thomas de Vries",
    position: "Sales Manager, Enterprise Solutions",
    image: "/placeholder.svg",
    initials: "TV",
    stars: 5,
  },
];

const stats = [
  { value: "200+", label: "Satisfied Clients" },
  { value: "300%", label: "Average Lead Increase" },
  { value: "85%", label: "Client Retention Rate" },
  { value: "€1.2M", label: "Generated in Revenue" },
];

const Results = () => {
  return (
    <section id="results" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proven Results</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            We don't just promise results - we deliver them. See what our clients have to say about working with Lead Velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-velocity-blue text-velocity-blue" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-velocity-blue rounded-xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
