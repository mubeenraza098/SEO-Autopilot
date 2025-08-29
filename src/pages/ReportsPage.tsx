import React, { useState } from 'react';
import { FileBarChart, Download, Calendar, Mail, TrendingUp, BarChart3, Eye, ExternalLink } from 'lucide-react';
import NavigationLayout from '../components/NavigationLayout';

const ReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const mockReports = [
    {
      id: '1',
      title: 'Monthly SEO Report - January 2025',
      period: 'January 2025',
      type: 'monthly',
      status: 'completed',
      generatedAt: '2025-01-15',
      fileSize: '2.4 MB',
      format: 'PDF'
    },
    {
      id: '2',
      title: 'Weekly Performance - Week 2',
      period: 'Jan 8-14, 2025',
      type: 'weekly',
      status: 'completed',
      generatedAt: '2025-01-14',
      fileSize: '1.1 MB',
      format: 'PDF'
    },
    {
      id: '3',
      title: 'Quarterly Review - Q4 2024',
      period: 'Oct-Dec 2024',
      type: 'quarterly',
      status: 'completed',
      generatedAt: '2025-01-01',
      fileSize: '5.7 MB',
      format: 'PDF'
    },
  ];

  const mockMetrics = {
    seoScore: { current: 78, previous: 72, change: '+8.3%' },
    organicTraffic: { current: '12,450', previous: '10,230', change: '+21.7%' },
    rankings: { current: '142', previous: '127', change: '+11.8%' },
    backlinks: { current: '1,234', previous: '1,145', change: '+7.8%' },
    indexedPages: { current: '847', previous: '823', change: '+2.9%' },
    contentPublished: { current: '8', previous: '6', change: '+33.3%' }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const generateReport = async () => {
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Report generated successfully!');
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
                <p className="text-gray-600">
                  Track your SEO progress with comprehensive reports and performance insights.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={generateReport}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileBarChart className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Settings
                </button>
              </div>
            </div>
          </div>

          {/* Period Selector */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
            
            <div className="flex space-x-4 mb-6">
              {['weekly', 'monthly', 'quarterly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-green-600">{mockMetrics.seoScore.change}</span>
                </div>
                <h3 className="text-sm text-blue-700 mb-1">SEO Score</h3>
                <p className="text-2xl font-bold text-blue-900">{mockMetrics.seoScore.current}/100</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{mockMetrics.organicTraffic.change}</span>
                </div>
                <h3 className="text-sm text-green-700 mb-1">Organic Traffic</h3>
                <p className="text-2xl font-bold text-green-900">{mockMetrics.organicTraffic.current}</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium text-green-600">{mockMetrics.rankings.change}</span>
                </div>
                <h3 className="text-sm text-purple-700 mb-1">Keywords Ranking</h3>
                <p className="text-2xl font-bold text-purple-900">{mockMetrics.rankings.current}</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <ExternalLink className="h-6 w-6 text-orange-600" />
                  <span className="text-sm font-medium text-green-600">{mockMetrics.backlinks.change}</span>
                </div>
                <h3 className="text-sm text-orange-700 mb-1">Total Backlinks</h3>
                <p className="text-2xl font-bold text-orange-900">{mockMetrics.backlinks.current}</p>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <FileBarChart className="h-6 w-6 text-teal-600" />
                  <span className="text-sm font-medium text-green-600">{mockMetrics.indexedPages.change}</span>
                </div>
                <h3 className="text-sm text-teal-700 mb-1">Indexed Pages</h3>
                <p className="text-2xl font-bold text-teal-900">{mockMetrics.indexedPages.current}</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="h-6 w-6 text-red-600" />
                  <span className="text-sm font-medium text-green-600">{mockMetrics.contentPublished.change}</span>
                </div>
                <h3 className="text-sm text-red-700 mb-1">Content Published</h3>
                <p className="text-2xl font-bold text-red-900">{mockMetrics.contentPublished.current}</p>
              </div>
            </div>
          </div>

          {/* Reports Archive */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Reports Archive</h2>
            
            <div className="space-y-4">
              {mockReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileBarChart className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{report.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{report.fileSize}</span>
                          <span>•</span>
                          <span>Generated: {report.generatedAt}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockReports.length === 0 && (
              <div className="text-center py-12">
                <FileBarChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reports Yet</h3>
                <p className="text-gray-600 mb-4">Generate your first SEO report to get started.</p>
                <button
                  onClick={generateReport}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate Report
                </button>
              </div>
            )}
          </div>

          {/* Email Automation */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Reports</h3>
                <p className="text-gray-600">Get weekly and monthly reports delivered to your inbox automatically.</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                Configure Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default ReportsPage;