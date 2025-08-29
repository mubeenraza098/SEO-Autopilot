import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Target, Zap, Shield, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Search className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SEO Autopilot</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link 
                to="/auth" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SEO Autopilot</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing SEO with AI-powered automation that handles every aspect of search optimization while you focus on your business.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              To democratize SEO success by making enterprise-level optimization accessible to every website owner through intelligent automation and ethical practices.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethical SEO</h3>
              <p className="text-gray-600">
                We follow white-hat practices and Google guidelines to ensure sustainable, long-term growth for your website.
              </p>
            </div>
            
            <div className="text-center">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation First</h3>
              <p className="text-gray-600">
                Our AI handles repetitive SEO tasks so you can focus on strategy and business growth instead of manual optimization.
              </p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Results Driven</h3>
              <p className="text-gray-600">
                Every feature is designed to improve your search rankings, organic traffic, and overall online visibility.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            SEO Autopilot was born from the frustration of spending countless hours on repetitive SEO tasks that could be automated. Our founders, experienced in both search engine optimization and artificial intelligence, recognized the opportunity to create a platform that could handle the technical complexity of modern SEO while maintaining the strategic insight that drives results.
          </p>
          <p className="text-gray-700 mb-4">
            After years of development and testing with hundreds of websites, we've created an autonomous SEO platform that can handle everything from technical audits to content creation, link building to local optimization. Our AI learns from your website's unique characteristics and audience to deliver personalized optimization strategies.
          </p>
          <p className="text-gray-700">
            Today, SEO Autopilot helps thousands of businesses improve their search presence through intelligent automation, ethical practices, and continuous innovation in the rapidly evolving world of search engine optimization.
          </p>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sarah Chen</h3>
              <p className="text-blue-600 mb-2">CEO & Co-founder</p>
              <p className="text-gray-600 text-sm">
                10+ years in SEO strategy and digital marketing. Former Head of SEO at leading SaaS companies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Michael Rodriguez</h3>
              <p className="text-green-600 mb-2">CTO & Co-founder</p>
              <p className="text-gray-600 text-sm">
                AI/ML expert with 12+ years building scalable automation systems. PhD in Computer Science.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions about our platform or want to learn more about how we can help your business grow?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              to="/auth"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;