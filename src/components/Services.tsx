
import React from 'react';
import { LineChart, Users, BarChart, MessageSquare, PieChart, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="bg-velocity-lightblue p-3 rounded-lg w-fit mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Growth Strategy',
      description: 'We co-create a growth roadmap aligned with your revenue goals — built to adapt, scale, and win in your market.',
      icon: <LineChart className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'B2B Lead Generation',
      description: 'Hyper-targeted outbound campaigns that bring in decision-makers who match your Ideal Customer Profile.',
      icon: <Users className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Performance Campaigns',
      description: 'Data-led marketing funnels that optimize every touchpoint for maximum conversion and ROI.',
      icon: <BarChart className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Sales Enablement & Consulting',
      description: 'We don\'t just deliver leads — we help you convert them. From pitch refinement to funnel feedback, we\'re in it with you.',
      icon: <MessageSquare className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Insight & Optimization',
      description: 'Clear dashboards and continuous feedback loops to keep you informed, agile, and always improving.',
      icon: <PieChart className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Content & Positioning',
      description: 'Thoughtful messaging and content that resonates with buyers, builds authority, and drives inbound interest.',
      icon: <FileText className="h-6 w-6 text-velocity-blue" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Strategic levers to unlock sustainable growth, tailored to your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
