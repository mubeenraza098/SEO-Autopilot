import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Plus, X, BarChart3, TrendingUp, AlertCircle, 
  CheckCircle, Clock, Zap, Eye, MousePointer, ExternalLink 
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useAuth } from '../contexts/AuthContext';
import NavigationLayout from '../components/NavigationLayout';

interface KPIWidget {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const Dashboard: React.FC = () => {
  const { 
    projects, 
    activeProject, 
    openTabs, 
    openProjectTab, 
    closeProjectTab, 
    setActiveProject,
    addProject,
    showTabLimitModal,
    setShowTabLimitModal,
    addConnection
  } = useProject();
  const { user, logout } = useAuth();
  const [auditRunning, setAuditRunning] = useState(false);
  const [contentGenerating, setContentGenerating] = useState(false);
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [cmsType, setCmsType] = useState<'wordpress' | 'shopify' | 'custom'>('wordpress');
  const [addWebsiteStep, setAddWebsiteStep] = useState(1);
  const [websiteAccessGranted, setWebsiteAccessGranted] = useState(false);
  const [gaAccessGranted, setGaAccessGranted] = useState(false);
  const [gscAccessGranted, setGscAccessGranted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<{
    website: boolean;
    ga: boolean;
    gsc: boolean;
  } | null>(null);

  const mockKPIs: KPIWidget[] = [
    {
      title: 'SEO Score',
      value: '78/100',
      change: '+12 pts',
      trend: 'up',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'blue'
    },
    {
      title: 'Core Web Vitals',
      value: 'Good',
      change: 'Improved',
      trend: 'up',
      icon: <Zap className="h-5 w-5" />,
      color: 'green'
    },
    {
      title: 'Indexed Pages',
      value: '847',
      change: '+23',
      trend: 'up',
      icon: <Search className="h-5 w-5" />,
      color: 'purple'
    },
    {
      title: 'Backlinks',
      value: '1,234',
      change: '+89',
      trend: 'up',
      icon: <ExternalLink className="h-5 w-5" />,
      color: 'orange'
    },
    {
      title: 'Avg. Position',
      value: '12.4',
      change: '-2.1',
      trend: 'up',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'teal'
    },
    {
      title: 'Content Velocity',
      value: '8/month',
      change: '+3',
      trend: 'up',
      icon: <Eye className="h-5 w-5" />,
      color: 'red'
    }
  ];

  const runFullAudit = async () => {
    setAuditRunning(true);
    // Simulate audit process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAuditRunning(false);
  };

  const generateContentPlan = async () => {
    setContentGenerating(true);
    // Simulate content generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    setContentGenerating(false);
  };

  const openNewProject = () => {
    if (openTabs.length >= 10) {
      setShowTabLimitModal(true);
      return;
    }
    setShowAddWebsiteModal(true);
  };

  const handleGoogleAnalyticsAuth = async () => {
    // Simulate OAuth flow
    setVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGaAccessGranted(true);
    setVerifying(false);
  };

  const handleGoogleSearchConsoleAuth = async () => {
    // Simulate OAuth flow
    setVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGscAccessGranted(true);
    setVerifying(false);
  };

  const handleWebsiteAccess = async () => {
    // Simulate website access verification
    setVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setWebsiteAccessGranted(true);
    setVerifying(false);
  };

  const handleVerifyAccess = async () => {
    setVerifying(true);
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const results = {
      website: websiteAccessGranted,
      ga: gaAccessGranted,
      gsc: gscAccessGranted,
    };
    
    setVerificationResults(results);
    setVerifying(false);
    
    if (results.website && results.ga && results.gsc) {
      // All verifications passed, create project
      setTimeout(() => {
        handleFinalAddWebsite();
      }, 1000);
    }
  };

  const handleFinalAddWebsite = () => {
    if (!websiteUrl || !websiteName) {
      return;
    }

    const newProject = addProject({
      name: websiteName,
      url: websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`,
      cms_type: cmsType,
      status: 'active',
      seo_score: Math.floor(Math.random() * 40) + 60,
    });

    // Add connections for this project
    addConnection({
      project_id: newProject.id,
      provider: 'ga4',
      status: 'connected',
      scopes: ['analytics.readonly']
    });

    addConnection({
      project_id: newProject.id,
      provider: 'gsc',
      status: 'connected',
      scopes: ['webmasters.readonly']
    });

    addConnection({
      project_id: newProject.id,
      provider: 'cms',
      status: 'connected',
      scopes: ['site.read', 'site.analyze']
    });

    // Open the new project tab
    openProjectTab(newProject.id);

    // Reset form and close modal
    resetAddWebsiteModal();
  };

  const resetAddWebsiteModal = () => {
    setWebsiteUrl('');
    setWebsiteName('');
    setCmsType('wordpress');
    setAddWebsiteStep(1);
    setWebsiteAccessGranted(false);
    setGaAccessGranted(false);
    setGscAccessGranted(false);
    setVerifying(false);
    setVerificationResults(null);
    setShowAddWebsiteModal(false);
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral', color: string) => {
    if (trend === 'up') return `text-green-600`;
    if (trend === 'down') return `text-red-600`;
    return `text-gray-600`;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      purple: 'bg-purple-50 text-purple-700',
      orange: 'bg-orange-50 text-orange-700',
      teal: 'bg-teal-50 text-teal-700',
      red: 'bg-red-50 text-red-700',
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-700';
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Project Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {openTabs.map(tabId => {
                const project = projects.find(p => p.id === tabId);
                if (!project) return null;
                
                return (
                  <div
                    key={tabId}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 cursor-pointer transition-colors ${
                      activeProject?.id === tabId
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveProject(tabId)}
                  >
                    <span className="text-sm font-medium whitespace-nowrap">
                      {project.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeProjectTab(tabId);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
              
              {openTabs.length < 10 && (
                <button
                  onClick={openNewProject}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Site</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeProject ? (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{activeProject.name}</h1>
                  <p className="text-gray-600 mt-1">{activeProject.url}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={runFullAudit}
                    disabled={auditRunning}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {auditRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Running Audit...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Run Full Audit
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={generateContentPlan}
                    disabled={contentGenerating}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {contentGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Generate Content Plan
                      </>
                    )}
                  </button>
                  
                  <Link
                    to="/content"
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Publish Post Now
                  </Link>
                </div>
              </div>

              {/* Current Project SEO Score */}
              {activeProject && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Current SEO Score</h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">{activeProject.seo_score}/100</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activeProject.seo_score >= 80 ? 'Excellent' : 
                         activeProject.seo_score >= 60 ? 'Good' : 
                         activeProject.seo_score >= 40 ? 'Needs Improvement' : 'Poor'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 rounded-full border-4 border-blue-200 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">
                          {Math.round((activeProject.seo_score / 100) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockKPIs.map((kpi, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${getColorClasses(kpi.color)}`}>
                        {kpi.icon}
                      </div>
                      <span className={`text-sm font-medium ${getTrendColor(kpi.trend, kpi.color)}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium">{kpi.title}</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  </div>
                ))}
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Tasks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">Optimizing meta descriptions (47 pages)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Internal linking suggestions (12 completed)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span className="text-gray-700">Content brief generation (3 in queue)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Improve page load speed (3.2s → 2.1s target)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      <span className="text-gray-700">Target "local SEO tips" keyword cluster</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="h-5 w-5 text-purple-500" />
                      <span className="text-gray-700">5 high-authority backlink opportunities found</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/audits"
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">View Audits</h3>
                  <p className="text-sm text-gray-600 mt-1">Detailed SEO analysis</p>
                </Link>

                <Link
                  to="/content"
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <Eye className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Content Hub</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage & publish content</p>
                </Link>

                <Link
                  to="/backlinks"
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <ExternalLink className="h-8 w-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Backlinks</h3>
                  <p className="text-sm text-gray-600 mt-1">Link building & tracking</p>
                </Link>

                <Link
                  to="/reports"
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <MousePointer className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Reports</h3>
                  <p className="text-sm text-gray-600 mt-1">Performance insights</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Project</h2>
              <p className="text-gray-600 mb-6">Select a project tab above or add a new website to get started.</p>
              <button
                onClick={openNewProject}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Website
              </button>
            </div>
          )}
        </div>

        {/* Add Website Modal */}
        {showAddWebsiteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Add New Website</h2>
                  <p className="text-sm text-gray-600">Step {addWebsiteStep} of 4</p>
                </div>
                <button
                  onClick={resetAddWebsiteModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(addWebsiteStep / 4) * 100}%` }}
                ></div>
              </div>
              
              {/* Step 1: Website Details */}
              {addWebsiteStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Website Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website Name
                    </label>
                    <input
                      type="text"
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                      placeholder="My Awesome Website"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CMS Type
                    </label>
                    <select
                      value={cmsType}
                      onChange={(e) => setCmsType(e.target.value as 'wordpress' | 'shopify' | 'custom')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="wordpress">WordPress</option>
                      <option value="shopify">Shopify</option>
                      <option value="custom">Custom/Other</option>
                    </select>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setAddWebsiteStep(2)}
                      disabled={!websiteUrl || !websiteName}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Google Analytics */}
              {addWebsiteStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Connect Google Analytics</h3>
                  <p className="text-gray-600">
                    Grant access to Google Analytics to track website performance and user behavior.
                  </p>
                  
                  <div className={`p-4 rounded-lg border-2 ${gaAccessGranted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {gaAccessGranted ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-medium">Google Analytics 4</h4>
                          <p className="text-sm text-gray-600">Website traffic and performance data</p>
                        </div>
                      </div>
                      {!gaAccessGranted && (
                        <button
                          onClick={handleGoogleAnalyticsAuth}
                          disabled={verifying}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {verifying ? 'Connecting...' : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setAddWebsiteStep(1)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setAddWebsiteStep(3)}
                      disabled={!gaAccessGranted}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Google Search Console */}
              {addWebsiteStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Connect Google Search Console</h3>
                  <p className="text-gray-600">
                    Grant access to Search Console to monitor SEO performance and search visibility.
                  </p>
                  
                  <div className={`p-4 rounded-lg border-2 ${gscAccessGranted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {gscAccessGranted ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-medium">Google Search Console</h4>
                          <p className="text-sm text-gray-600">Search performance and indexing data</p>
                        </div>
                      </div>
                      {!gscAccessGranted && (
                        <button
                          onClick={handleGoogleSearchConsoleAuth}
                          disabled={verifying}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {verifying ? 'Connecting...' : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setAddWebsiteStep(2)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setAddWebsiteStep(4)}
                      disabled={!gscAccessGranted}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Website Access & Verification */}
              {addWebsiteStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Website Access & Verification</h3>
                  <p className="text-gray-600">
                    Grant website access for data fetching and verify all connections.
                  </p>
                  
                  <div className={`p-4 rounded-lg border-2 ${websiteAccessGranted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {websiteAccessGranted ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Clock className="h-6 w-6 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-medium">Website Access</h4>
                          <p className="text-sm text-gray-600">Direct access for SEO analysis</p>
                        </div>
                      </div>
                      {!websiteAccessGranted && (
                        <button
                          onClick={handleWebsiteAccess}
                          disabled={verifying}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {verifying ? 'Verifying...' : 'Grant Access'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Verification Results */}
                  {verificationResults && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Verification Results</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          {verificationResults.website ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-sm">Website Access</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          {verificationResults.ga ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-sm">Google Analytics</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          {verificationResults.gsc ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-sm">Google Search Console</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setAddWebsiteStep(3)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleVerifyAccess}
                      disabled={!websiteAccessGranted || verifying}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {verifying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                          Verifying...
                        </>
                      ) : (
                        'Verify & Add Website'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Limit Modal */}
        {showTabLimitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Maximum Tabs Reached</h2>
                <button
                  onClick={() => setShowTabLimitModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-4">
                  You can have a maximum of 10 tabs open. Please close an existing tab to add a new website.
                </p>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Open Tabs:</h3>
                  <div className="max-h-40 overflow-y-auto">
                    {openTabs.map(tabId => {
                      const project = projects.find(p => p.id === tabId);
                      if (!project) return null;
                      
                      return (
                        <div key={tabId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-700 truncate">{project.name}</span>
                          <button
                            onClick={() => {
                              closeProjectTab(tabId);
                              if (openTabs.length <= 10) {
                                setShowTabLimitModal(false);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowTabLimitModal(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </NavigationLayout>
  );
};

export default Dashboard;