import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Lock, Eye, Database } from 'lucide-react';

const PrivacyPage: React.FC = () => {
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
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
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
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: January 15, 2025
          </p>
        </div>

        {/* Privacy Commitment */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Privacy Commitment</h2>
            <p className="text-blue-800 text-lg">
              Your privacy is fundamental to our service. We collect only the data necessary to provide excellent SEO automation while maintaining the highest security standards.
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Information Collection */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Database className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Email address and name for account creation</li>
              <li>Password (encrypted and never stored in plain text)</li>
              <li>Billing information for paid subscriptions</li>
              <li>Profile preferences and settings</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Website Data</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Website URLs and domain information</li>
              <li>SEO performance metrics and analytics data</li>
              <li>Content and metadata for optimization purposes</li>
              <li>Technical SEO audit results and recommendations</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Integration Data</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Google Analytics and Search Console data (read-only access)</li>
              <li>CMS connection details for content publishing</li>
              <li>Third-party API tokens (encrypted and securely stored)</li>
              <li>Backlink and citation information from external sources</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Optimization</h3>
              <p className="text-gray-700 mb-2">
                We analyze your website data to provide personalized SEO recommendations, automate optimization tasks, and track performance improvements.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Delivery</h3>
              <p className="text-gray-700 mb-2">
                Your data enables us to generate reports, send notifications, publish content, and manage your SEO campaigns effectively.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Improvement</h3>
              <p className="text-gray-700 mb-2">
                We use aggregated, anonymized data to improve our algorithms and develop new features that benefit all users.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Data Protection & Security</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
                <p className="text-sm text-gray-600">All data is encrypted in transit (TLS 1.3) and at rest (AES-256).</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Access Control</h3>
                <p className="text-sm text-gray-600">Strict access controls and authentication for all team members.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Regular Audits</h3>
                <p className="text-sm text-gray-600">Third-party security assessments and compliance monitoring.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibent text-gray-900 mb-2">Data Backup</h3>
                <p className="text-sm text-gray-600">Automated backups with geographically distributed storage.</p>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing & Third Parties</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-yellow-800 mb-2">We Never Sell Your Data</h3>
              <p className="text-yellow-700">
                SEO Autopilot does not sell, rent, or trade your personal information or website data to third parties for marketing purposes.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Limited Sharing Occurs Only For:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Service providers who help us deliver our platform (hosting, email, analytics)</li>
              <li>Legal compliance when required by law or court order</li>
              <li>Business transfers (with user notification and consent)</li>
              <li>With your explicit consent for specific integrations</li>
            </ul>
          </section>

          {/* User Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights & Control</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Access Your Data</h3>
                <p className="text-sm text-blue-800">Request a copy of all data we have about you and your websites.</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Update Information</h3>
                <p className="text-sm text-green-800">Modify your account information and preferences at any time.</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Delete Account</h3>
                <p className="text-sm text-purple-800">Permanently remove your account and associated data.</p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Data Portability</h3>
                <p className="text-sm text-orange-800">Export your data in standard formats for migration.</p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use essential cookies for authentication and site functionality. Optional cookies help us improve your experience and analyze usage patterns. You can control cookie preferences through your browser settings.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Cookie Types We Use:</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li><strong>Essential:</strong> Authentication, security, and core functionality</li>
                <li><strong>Analytics:</strong> Usage patterns and performance measurement</li>
                <li><strong>Preferences:</strong> Your settings and customizations</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or how we handle your data, please contact us:
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Email</h3>
                  <p className="text-blue-800">privacy@seoautopilot.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Mail</h3>
                  <p className="text-blue-800 text-sm">
                    SEO Autopilot Privacy Team<br />
                    123 Innovation Drive<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-700">
              We may update this privacy policy periodically. Significant changes will be communicated via email and through our platform. Continued use of our service after updates constitutes acceptance of the revised policy.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Privacy-First SEO Automation</h3>
          <p className="text-blue-100 mb-4">
            Experience powerful SEO optimization with industry-leading privacy protection.
          </p>
          <Link 
            to="/auth"
            className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;