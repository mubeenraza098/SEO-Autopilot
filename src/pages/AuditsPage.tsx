import React, { useState } from 'react';
import { BarChart3, AlertCircle, CheckCircle, Clock, TrendingUp, Zap, Download, FileText } from 'lucide-react';
import NavigationLayout from '../components/NavigationLayout';
import { useProject } from '../contexts/ProjectContext';

const AuditsPage: React.FC = () => {
  const { activeProject } = useProject();
  const [activeTab, setActiveTab] = useState('overview');
  const [auditRunning, setAuditRunning] = useState(false);
  const [autoFixing, setAutoFixing] = useState(false);
  const [exportingReport, setExportingReport] = useState(false);
  const [lastAuditTime, setLastAuditTime] = useState('2 hours ago');
  const [auditScore, setAuditScore] = useState(78);
  const [fixedIssues, setFixedIssues] = useState<string[]>([]);

  const auditTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'onpage', label: 'On-Page' },
    { id: 'technical', label: 'Technical' },
    { id: 'offpage', label: 'Off-Page' },
    { id: 'local', label: 'Local SEO' },
  ];

  const auditResults = {
    overview: {
      score: auditScore,
      lastRun: lastAuditTime,
      issues: {
        critical: Math.max(0, 3 - fixedIssues.filter(i => i.includes('critical')).length),
        warning: Math.max(0, 12 - fixedIssues.filter(i => i.includes('warning')).length),
        passed: 45 + fixedIssues.length,
      }
    },
    onpage: [
      { 
        type: fixedIssues.includes('critical-h1-tags') ? 'passed' : 'critical', 
        title: 'Missing H1 tags', 
        count: fixedIssues.includes('critical-h1-tags') ? 0 : (activeProject ? Math.floor(Math.random() * 15) + 5 : 12), 
        description: fixedIssues.includes('critical-h1-tags') ? 'All pages now have proper H1 tags' : 'Pages without H1 tags hurt content structure',
        fixable: true
      },
      { 
        type: fixedIssues.includes('warning-meta-descriptions') ? 'passed' : 'warning', 
        title: 'Duplicate meta descriptions', 
        count: fixedIssues.includes('warning-meta-descriptions') ? 0 : (activeProject ? Math.floor(Math.random() * 10) + 3 : 8), 
        description: fixedIssues.includes('warning-meta-descriptions') ? 'Meta descriptions are now unique' : 'Meta descriptions should be unique',
        fixable: true
      },
      { 
        type: fixedIssues.includes('warning-thin-content') ? 'passed' : 'warning', 
        title: 'Thin content pages', 
        count: fixedIssues.includes('warning-thin-content') ? 0 : (activeProject ? Math.floor(Math.random() * 8) + 2 : 5), 
        description: fixedIssues.includes('warning-thin-content') ? 'Content has been enhanced' : 'Pages with less than 300 words',
        fixable: true
      },
      { type: 'passed', title: 'Optimized titles', count: activeProject ? Math.floor(Math.random() * 100) + 200 : 234, description: 'Pages with SEO-friendly titles' },
    ],
    technical: [
      { 
        type: fixedIssues.includes('critical-core-web-vitals') ? 'passed' : 'critical', 
        title: 'Core Web Vitals', 
        count: fixedIssues.includes('critical-core-web-vitals') ? 0 : 1, 
        description: fixedIssues.includes('critical-core-web-vitals') ? 'Core Web Vitals optimized' : 'LCP > 2.5s on mobile pages',
        fixable: true
      },
      { 
        type: fixedIssues.includes('critical-404-errors') ? 'passed' : 'critical', 
        title: '404 errors', 
        count: fixedIssues.includes('critical-404-errors') ? 0 : (activeProject ? Math.floor(Math.random() * 30) + 10 : 23), 
        description: fixedIssues.includes('critical-404-errors') ? 'Broken links fixed' : 'Broken internal links found',
        fixable: true
      },
      { 
        type: fixedIssues.includes('warning-image-optimization') ? 'passed' : 'warning', 
        title: 'Image optimization', 
        count: fixedIssues.includes('warning-image-optimization') ? 0 : (activeProject ? Math.floor(Math.random() * 200) + 50 : 156), 
        description: fixedIssues.includes('warning-image-optimization') ? 'Images optimized with alt text' : 'Images without alt text or oversized',
        fixable: true
      },
      { type: 'passed', title: 'HTTPS secure', count: 1, description: 'Site uses secure HTTPS protocol' },
    ],
    offpage: [
      { 
        type: fixedIssues.includes('warning-toxic-backlinks') ? 'passed' : 'warning', 
        title: 'Toxic backlinks', 
        count: fixedIssues.includes('warning-toxic-backlinks') ? 0 : (activeProject ? Math.floor(Math.random() * 12) + 3 : 7), 
        description: fixedIssues.includes('warning-toxic-backlinks') ? 'Toxic backlinks disavowed' : 'Links from low-quality domains',
        fixable: true
      },
      { type: 'warning', title: 'Missing citations', count: activeProject ? Math.floor(Math.random() * 20) + 5 : 15, description: 'Business not listed in key directories' },
      { type: 'passed', title: 'Quality backlinks', count: activeProject ? Math.floor(Math.random() * 50) + 50 : 89, description: 'High-authority referring domains' },
    ],
    local: [
      { type: 'critical', title: 'NAP inconsistency', count: activeProject ? Math.floor(Math.random() * 3) : 1, description: 'Address variations across listings' },
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

  const runNewAudit = async () => {
    if (!activeProject) {
      alert('Please select a website to audit');
      return;
    }
    
    setAuditRunning(true);
    
    // Simulate audit process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Generate new audit results
    const newScore = Math.floor(Math.random() * 30) + 70; // 70-100
    setAuditScore(newScore);
    setLastAuditTime('Just now');
    setAuditRunning(false);
  };

  const autoFixIssues = async () => {
    if (!activeProject) {
      alert('Please select a website to fix issues for');
      return;
    }
    
    setAutoFixing(true);
    
    // Simulate auto-fixing critical and warning issues
    const criticalIssues = ['critical-h1-tags', 'critical-404-errors', 'critical-core-web-vitals'];
    const warningIssues = ['warning-meta-descriptions', 'warning-thin-content', 'warning-image-optimization', 'warning-toxic-backlinks'];
    
    // Fix issues one by one
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (i < criticalIssues.length) {
        setFixedIssues(prev => [...prev, criticalIssues[i]]);
      }
      if (i < warningIssues.length) {
        setFixedIssues(prev => [...prev, warningIssues[i]]);
      }
      
      // Update score as we fix issues
      setAuditScore(prev => Math.min(100, prev + 3));
    }
    
    setAutoFixing(false);
    setLastAuditTime('Just now');
  };

  const exportReport = async () => {
    if (!activeProject) {
      alert('Please select a website to export report for');
      return;
    }
    
    setExportingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create and download report
    const reportData = {
      website: activeProject.name,
      url: activeProject.url,
      auditDate: new Date().toISOString(),
      score: auditScore,
      issues: auditResults.overview.issues,
      recommendations: [
        'Optimize Core Web Vitals for better user experience',
        'Fix missing H1 tags on key pages',
        'Improve meta descriptions uniqueness',
        'Optimize images with proper alt text',
        'Address broken internal links'
      ]
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-audit-${activeProject.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExportingReport(false);
  };

  const fixIndividualIssue = async (issueTitle: string) => {
    if (!activeProject) return;
    
    const issueKey = issueTitle.toLowerCase().replace(/\s+/g, '-');
    const issueType = auditResults.onpage.concat(auditResults.technical, auditResults.offpage, auditResults.local)
      .find(item => item.title === issueTitle)?.type;
    
    const issueId = `${issueType}-${issueKey}`;
    
    if (fixedIssues.includes(issueId)) return;
    
    setAutoFixing(true);
    
    // Simulate fixing the specific issue
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFixedIssues(prev => [...prev, issueId]);
    setAuditScore(prev => Math.min(100, prev + 2));
    setLastAuditTime('Just now');
    
    setAutoFixing(false);
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
                {item.type !== 'passed' && item.fixable && (
                  <button 
                    onClick={() => fixIndividualIssue(item.title)}
                    className="block mt-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
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

          {/* Current Website Info */}
          {activeProject ? (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900">Currently Auditing: {activeProject.name}</h3>
              <p className="text-blue-700 text-sm">{activeProject.url}</p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900">No Website Selected</h3>
              <p className="text-yellow-700 text-sm">Please select a website from the Dashboard to run audits.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={runNewAudit}
              disabled={auditRunning || !activeProject}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {auditRunning ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Running Audit...
                </>
              ) : (
                <>
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Run New Audit
                </>
              )}
            </button>
            
            <button 
              onClick={autoFixIssues}
              disabled={autoFixing || !activeProject}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {autoFixing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Auto-Fixing...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Auto-Fix Issues
                </>
              )}
            </button>
            
            <button 
              onClick={exportReport}
              disabled={exportingReport || !activeProject}
              className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {exportingReport ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Export Report
                </>
              )}
            </button>
          </div>

          {/* Fixed Issues Display */}
          {fixedIssues.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Recently Fixed Issues ({fixedIssues.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {fixedIssues.map((issue, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">{issue.replace(/^(critical|warning)-/, '').replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default AuditsPage;