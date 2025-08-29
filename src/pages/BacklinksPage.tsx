import React, { useState } from 'react';
import { ExternalLink, TrendingUp, Search, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import NavigationLayout from '../components/NavigationLayout';

const BacklinksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const backlinkTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'backlinks', label: 'Backlinks' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'outreach', label: 'Outreach' },
  ];

  const mockBacklinks = [
    {
      id: '1',
      sourceUrl: 'techcrunch.com',
      targetUrl: '/blog/seo-guide',
      anchorText: 'comprehensive SEO guide',
      domainRating: 91,
      traffic: 12500000,
      type: 'editorial',
      status: 'live',
      dateFound: '2025-01-10'
    },
    {
      id: '2',
      sourceUrl: 'searchenginejournal.com',
      targetUrl: '/tools/audit',
      anchorText: 'SEO audit tool',
      domainRating: 87,
      traffic: 4200000,
      type: 'resource',
      status: 'live',
      dateFound: '2025-01-08'
    },
    {
      id: '3',
      sourceUrl: 'spammy-site.xyz',
      targetUrl: '/services',
      anchorText: 'click here',
      domainRating: 12,
      traffic: 850,
      type: 'spam',
      status: 'disavowed',
      dateFound: '2025-01-05'
    },
  ];

  const mockOpportunities = [
    {
      id: '1',
      domain: 'moz.com',
      domainRating: 89,
      relevance: 95,
      difficulty: 'medium',
      contactInfo: 'content@moz.com',
      strategy: 'Guest post about local SEO trends',
      estimatedValue: 'high'
    },
    {
      id: '2',
      domain: 'hubspot.com',
      domainRating: 92,
      relevance: 88,
      difficulty: 'high',
      contactInfo: 'partnerships@hubspot.com',
      strategy: 'Resource page inclusion',
      estimatedValue: 'very high'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'disavowed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'editorial':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'resource':
        return <ExternalLink className="h-4 w-4 text-blue-500" />;
      case 'spam':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <ExternalLink className="h-4 w-4 text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <ExternalLink className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">1,234</span>
          </div>
          <h3 className="font-semibold text-blue-800">Total Backlinks</h3>
          <p className="text-blue-600 text-sm mt-1">+89 this month</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">567</span>
          </div>
          <h3 className="font-semibold text-green-800">Quality Links</h3>
          <p className="text-green-600 text-sm mt-1">DR 50+ domains</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">342</span>
          </div>
          <h3 className="font-semibold text-purple-800">Referring Domains</h3>
          <p className="text-purple-600 text-sm mt-1">Unique domains</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Search className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-600">23</span>
          </div>
          <h3 className="font-semibold text-orange-800">New Opportunities</h3>
          <p className="text-orange-600 text-sm mt-1">This week</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Backlink Activity</h3>
        <div className="space-y-4">
          {mockBacklinks.slice(0, 3).map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getTypeIcon(link.type)}
                <div>
                  <p className="font-medium text-gray-900">{link.sourceUrl}</p>
                  <p className="text-sm text-gray-600">→ {link.targetUrl}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(link.status)}`}>
                  {link.status}
                </span>
                <p className="text-sm text-gray-500 mt-1">DR {link.domainRating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBacklinks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Backlink Portfolio</h2>
          <p className="text-gray-600">Monitor and analyze all backlinks pointing to your site</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Search className="h-4 w-4 mr-2" />
            Discover Links
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>Source Domain</div>
          <div>Target URL</div>
          <div>Anchor Text</div>
          <div>DR</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        
        {mockBacklinks.map((link) => (
          <div key={link.id} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 text-sm">
            <div className="flex items-center space-x-2">
              {getTypeIcon(link.type)}
              <span className="font-medium text-gray-900">{link.sourceUrl}</span>
            </div>
            <div className="text-gray-600">{link.targetUrl}</div>
            <div className="text-gray-600 truncate">{link.anchorText}</div>
            <div className="font-medium">{link.domainRating}</div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(link.status)}`}>
                {link.status}
              </span>
            </div>
            <div>
              <button className="text-blue-600 hover:text-blue-700 text-xs">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Link Opportunities</h2>
          <p className="text-gray-600">Potential high-quality backlink prospects</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <TrendingUp className="h-4 w-4 mr-2" />
          Find More
        </button>
      </div>

      <div className="grid gap-6">
        {mockOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{opportunity.domain}</h3>
                <p className="text-gray-600 mt-1">{opportunity.strategy}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                opportunity.estimatedValue === 'very high' ? 'bg-red-100 text-red-800' :
                opportunity.estimatedValue === 'high' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {opportunity.estimatedValue} value
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-gray-500 text-sm">Domain Rating</span>
                <p className="font-semibold text-gray-900">{opportunity.domainRating}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Relevance</span>
                <p className="font-semibold text-gray-900">{opportunity.relevance}%</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Difficulty</span>
                <p className={`font-semibold ${
                  opportunity.difficulty === 'high' ? 'text-red-600' :
                  opportunity.difficulty === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {opportunity.difficulty}
                </p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Contact</span>
                <p className="font-semibold text-gray-900 text-sm">{opportunity.contactInfo}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Add to Outreach
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOutreach = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Outreach Management</h2>
          <p className="text-gray-600">Track your link building campaigns and communications</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <ExternalLink className="h-4 w-4 mr-2" />
          New Campaign
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <ExternalLink className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Outreach Queue Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Manage your link building campaigns, track email outreach, and monitor response rates all in one place.
        </p>
      </div>
    </div>
  );

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Backlinks</h1>
            <p className="text-gray-600">
              Monitor your backlink profile and discover new link building opportunities.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {backlinkTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'backlinks' && renderBacklinks()}
              {activeTab === 'opportunities' && renderOpportunities()}
              {activeTab === 'outreach' && renderOutreach()}
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default BacklinksPage;