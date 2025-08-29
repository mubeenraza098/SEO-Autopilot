import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Settings, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

interface SetupStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SetupWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    websiteUrl: '',
    cmsType: '',
    ga4Connected: false,
    gscConnected: false,
    cmsConnected: false,
  });
  
  const { addProject, addConnection } = useProject();
  const navigate = useNavigate();

  const steps: SetupStep[] = [
    {
      id: 1,
      title: 'Website Details',
      description: 'Tell us about your website',
      icon: <Globe className="h-6 w-6" />
    },
    {
      id: 2,
      title: 'Connect Analytics',
      description: 'Link Google Analytics & Search Console',
      icon: <Search className="h-6 w-6" />
    },
    {
      id: 3,
      title: 'CMS Integration',
      description: 'Connect your content management system',
      icon: <Settings className="h-6 w-6" />
    },
    {
      id: 4,
      title: 'Launch Setup',
      description: 'Start your SEO automation',
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      // Create project
      const project = addProject({
        name: new URL(formData.websiteUrl).hostname,
        url: formData.websiteUrl,
        cms_type: formData.cmsType as 'wordpress' | 'shopify' | 'custom',
        status: 'active',
        seo_score: 0,
      });

      // Add connections
      if (formData.ga4Connected) {
        addConnection({
          project_id: project.id,
          provider: 'ga4',
          status: 'connected',
          scopes: ['analytics.readonly'],
        });
      }

      if (formData.gscConnected) {
        addConnection({
          project_id: project.id,
          provider: 'gsc',
          status: 'connected',
          scopes: ['webmasters.readonly'],
        });
      }

      if (formData.cmsConnected) {
        addConnection({
          project_id: project.id,
          provider: 'cms',
          status: 'connected',
          scopes: ['posts.write'],
        });
      }

      // Simulate initial audit
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      navigate('/dashboard');
    } catch (error) {
      alert('Setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const connectGA4 = async () => {
    setLoading(true);
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData(prev => ({ ...prev, ga4Connected: true }));
    } finally {
      setLoading(false);
    }
  };

  const connectGSC = async () => {
    setLoading(true);
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData(prev => ({ ...prev, gscConnected: true }));
    } finally {
      setLoading(false);
    }
  };

  const connectCMS = async () => {
    setLoading(true);
    try {
      // Simulate CMS connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData(prev => ({ ...prev, cmsConnected: true }));
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="websiteUrl"
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourwebsite.com"
                value={formData.websiteUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Management System
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['WordPress', 'Shopify', 'Custom'].map((cms) => (
                  <button
                    key={cms}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, cmsType: cms.toLowerCase() }))}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      formData.cmsType === cms.toLowerCase()
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{cms}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Google Analytics 4</h3>
              <p className="text-blue-700 text-sm mb-4">
                Connect GA4 to track website performance and user behavior.
              </p>
              <button
                onClick={connectGA4}
                disabled={loading || formData.ga4Connected}
                className={`px-4 py-2 rounded-lg font-medium ${
                  formData.ga4Connected
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                {formData.ga4Connected ? '✓ Connected' : 'Connect GA4'}
              </button>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Google Search Console</h3>
              <p className="text-green-700 text-sm mb-4">
                Connect GSC to monitor search performance and indexing status.
              </p>
              <button
                onClick={connectGSC}
                disabled={loading || formData.gscConnected}
                className={`px-4 py-2 rounded-lg font-medium ${
                  formData.gscConnected
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } transition-colors`}
              >
                {formData.gscConnected ? '✓ Connected' : 'Connect GSC'}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                {formData.cmsType === 'wordpress' ? 'WordPress' :
                 formData.cmsType === 'shopify' ? 'Shopify' : 'Custom CMS'} Integration
              </h3>
              <p className="text-purple-700 text-sm mb-4">
                Connect your CMS to enable automated content publishing and optimization.
              </p>
              <button
                onClick={connectCMS}
                disabled={loading || formData.cmsConnected}
                className={`px-4 py-2 rounded-lg font-medium ${
                  formData.cmsConnected
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                } transition-colors`}
              >
                {formData.cmsConnected ? '✓ Connected' : `Connect ${formData.cmsType}`}
              </button>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Required Permissions</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Read and edit posts</li>
                <li>• Upload media files</li>
                <li>• Manage categories and tags</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Ready to Launch!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your website is connected and ready. We'll start with a comprehensive SEO audit 
              and begin optimizing your site automatically.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• Full SEO audit (5-10 minutes)</li>
                <li>• Keyword research and content planning</li>
                <li>• Technical issue identification</li>
                <li>• Automated optimization begins</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.websiteUrl && formData.cmsType;
      case 2:
        return formData.ga4Connected || formData.gscConnected;
      case 3:
        return formData.cmsConnected;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <Search className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">SEO Autopilot</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hello! Let's rank your site.
          </h1>
          <p className="text-gray-600">
            We'll connect your website and get everything set up in just a few steps.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep > step.id
                      ? 'bg-green-500 border-green-500 text-white'
                      : currentStep === step.id
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 max-w-20">
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                  } transition-all`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
          
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed() || loading}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Setting up...
              </>
            ) : currentStep === steps.length ? (
              'Launch SEO Automation'
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;