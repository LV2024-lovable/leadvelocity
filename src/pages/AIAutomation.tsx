
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bot, Workflow, Clock, TrendingUp, CheckCircle, Star, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AIAutomation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen flex items-center pt-20">
        <div className="container max-w-7xl mx-auto py-16">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Business Automation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Business with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Automation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Streamline operations, boost productivity, and scale your business with intelligent automation solutions that work 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our <span className="text-blue-600">AI Automation</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our cutting-edge AI solutions are designed to revolutionize how you work and grow your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Bot className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Smart Chatbots</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>24/7 customer support that learns and improves with every interaction</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Workflow className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Process Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Streamline repetitive tasks and complex workflows automatically</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-purple-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Time Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Reduce manual work by up to 80% and focus on what matters most</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-2 mx-auto mb-4" />
                <CardTitle className="text-lg">Scale Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Handle increased volume without hiring additional staff</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Unlock the Power of <span className="text-blue-600">Intelligent Automation</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Our AI automation solutions are designed to transform your business operations, increase efficiency, and drive growth through intelligent process optimization.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Increased Productivity</h3>
                    <p className="text-gray-600">Automate repetitive tasks and free up your team for strategic work</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Reduction</h3>
                    <p className="text-gray-600">Significantly reduce operational costs while maintaining quality</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">24/7 Operations</h3>
                    <p className="text-gray-600">Keep your business running around the clock without human intervention</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Scalable Solutions</h3>
                    <p className="text-gray-600">Easily scale your operations as your business grows</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">80%</div>
                    <div className="text-sm text-gray-600">Time Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
                    <div className="text-sm text-gray-600">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-blue-600">AI Automation</span> Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive automation solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-100 hover:border-blue-300 transition-colors">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>Customer Service Automation</CardTitle>
                <CardDescription>
                  Intelligent chatbots and automated response systems that handle customer inquiries 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• AI-powered chatbots</li>
                  <li>• Automated ticket routing</li>
                  <li>• Sentiment analysis</li>
                  <li>• Multi-channel support</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-indigo-100 hover:border-indigo-300 transition-colors">
              <CardHeader>
                <Users className="h-8 w-8 text-indigo-600 mb-4" />
                <CardTitle>Sales Process Automation</CardTitle>
                <CardDescription>
                  Streamline your sales pipeline with automated lead qualification and follow-up systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Lead scoring automation</li>
                  <li>• Automated email sequences</li>
                  <li>• CRM integration</li>
                  <li>• Performance analytics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-100 hover:border-purple-300 transition-colors">
              <CardHeader>
                <Workflow className="h-8 w-8 text-purple-600 mb-4" />
                <CardTitle>Operations Automation</CardTitle>
                <CardDescription>
                  Automate internal processes and workflows to increase efficiency and reduce errors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Document processing</li>
                  <li>• Inventory management</li>
                  <li>• Report generation</li>
                  <li>• Quality assurance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from businesses that trust our AI automation solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "The AI automation solutions have transformed our customer service. We now handle 3x more inquiries with the same team size."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-gray-500">CEO, TechStart Inc.</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Our sales process is now 80% automated. This has freed up our team to focus on closing deals rather than administrative tasks."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-gray-500">Sales Director, GrowthCorp</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "The ROI has been incredible. We've reduced operational costs by 50% while improving service quality."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold">Emily Rodriguez</div>
                <div className="text-sm text-gray-500">Operations Manager, Streamline Co.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses that have already automated their way to success. 
            Let's discuss how AI automation can work for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AIAutomation;
