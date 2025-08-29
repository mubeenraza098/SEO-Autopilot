import React, { useState } from 'react';
import { BarChart3, AlertCircle, CheckCircle, Clock, TrendingUp, Zap } from 'lucide-react';
import NavigationLayout from '../components/NavigationLayout';

const AuditsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const auditTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'onpage', label: 'On-Page' },
    { id: 'technical', label: 'Technical' },
    { id: 'offpage', label: 'Off-Page' },
    { id: 'local', label: 'Local SEO' },
  ];

  const auditResults = {
    overview: {
      score: 78,
      lastRun: '2 hours ago',
      issues: {
        critical: 3,
        warning: 12,
        passed: 45,
      }
    },
    onpage: [
      { type: 'critical', title: 'Missing H1 tags', count: 12, description: 'Pages without H1 tags hurt content structure' },
      { type: 'warning', title: 'Duplicate meta descriptions', count: 8, description: 'Meta descriptions should be unique' },
      { type: 'warning', title: 'Thin content pages', count: 5, description: 'Pages with less than 300 words' },
      { type: 'passed', title: 'Optimized titles', count: 234, description: 'Pages with SEO-friendly titles' },
    ],
    technical: [
      { type: 'critical', title: 'Core Web Vitals', count: 1, description: 'LCP > 2.5s on mobile pages' },
      { type: 'critical', title: '404 errors', count: 23, description: 'Broken internal links found' },
      { type: 'warning', title: 'Image optimization', count: 156, description: 'Images without alt text or oversized' },
      { type: 'passed', title: 'HTTPS secure', count: 1, description: 'Site uses secure HTTPS protocol' },
    ],
    offpage: [
      { type: 'warning', title: 'Toxic backlinks', count: 7, description: 'Links from low-quality domains' },
      { type: 'warning', title: 'Missing citations', count: 15, description: 'Business not listed in key directories' },
      { type: 'passed', title: 'Quality backlinks', count: 89, description: 'High-authority referring domains' },
    ],
    local: [
      { type: 'critical', title: 'NAP inconsistency', count: 1, description: 'Address variations across listings' },
      { type: 'warning', title: 'Missing reviews', count: 1, description: 'Low review count impacts local ranking' },
      { type: 'passed', title: 'Google Business Profile', count: 1, description: 'Profile optimized and verified' },
    ]
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'passed':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
          <span className="text-3xl font-bold text-blue-600">{auditResults.overview.score}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall SEO Score</h2>
        <p className="text-gray-600">Last updated {auditResults.overview.lastRun}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-red-600">{auditResults.overview.issues.critical}</span>
          </div>
          <h3 className="font-semibold text-red-800">Critical Issues</h3>
          <p className="text-red-600 text-sm mt-1">Urgent fixes needed</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-600">{auditResults.overview.issues.warning}</span>
          </div>
          <h3 className="font-semibold text-yellow-800">Warnings</h3>
          <p className="text-yellow-600 text-sm mt-1">Improvements recommended</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold text-green-600">{auditResults.overview.issues.passed}</span>
          </div>
          <h3 className="font-semibold text-green-800">Passed Checks</h3>
          <p className="text-green-600 text-sm mt-1">Working correctly</p>
        </div>
      </div>
    </div>
  );

  const renderAuditDetails = (category: string) => {
    const results = auditResults[category as keyof typeof auditResults] as any[];
    if (!results || !Array.isArray(results)) return null;

    return (
      <div className="space-y-4">
        {results.map((item, index) => (
          <div
            key={index}
            className={`border rounded-xl p-6 ${getStatusColor(item.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {getStatusIcon(item.type)}
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                {item.type !== 'passed' && (
                  <button className="block mt-2 text-sm text-blue-600 hover:text-blue-700">
                    Fix Issues
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Audits</h1>
            <p className="text-gray-600">
              Comprehensive analysis of your website's SEO performance and optimization opportunities.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {auditTabs.map((tab) => (
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
              {activeTab === 'overview' ? renderOverview() : renderAuditDetails(activeTab)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <BarChart3 className="h-5 w-5 mr-2" />
              Run New Audit
            </button>
            <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Zap className="h-5 w-5 mr-2" />
              Auto-Fix Issues
            </button>
            <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default AuditsPage;