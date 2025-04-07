
import React from 'react';
import { Rocket, Trophy, LineChart, PieChart, MegaphoneSimple, BarChart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

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
      <CardFooter>
        <Button variant="link" className="p-0 h-auto font-semibold text-velocity-blue">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Lead Generation',
      description: 'We create targeted campaigns to attract your ideal prospects and convert them into qualified leads.',
      icon: <Rocket className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Marketing Strategy',
      description: 'We develop comprehensive marketing plans aligned with your business goals to maximize ROI.',
      icon: <Trophy className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Performance Marketing',
      description: 'Data-driven campaigns optimized for conversions and measurable business results.',
      icon: <LineChart className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Analytics & Reporting',
      description: 'Clear insights and regular reports to track progress and make informed decisions.',
      icon: <PieChart className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Content Marketing',
      description: 'Strategic content that attracts, engages, and converts your target audience.',
      icon: <MegaphoneSimple className="h-6 w-6 text-velocity-blue" />,
    },
    {
      title: 'Growth Consulting',
      description: 'Expert guidance to optimize your sales funnel and scale your business effectively.',
      icon: <BarChart className="h-6 w-6 text-velocity-blue" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Comprehensive solutions designed to accelerate your business growth and deliver measurable results.
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
