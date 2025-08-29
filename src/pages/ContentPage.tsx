import React, { useState } from 'react';
import { Plus, Search, FileText, Eye, Edit, Calendar, Target } from 'lucide-react';
import NavigationLayout from '../components/NavigationLayout';

const ContentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [generating, setGenerating] = useState(false);

  const contentTabs = [
    { id: 'content', label: 'Content Library' },
    { id: 'keywords', label: 'Keywords' },
    { id: 'planning', label: 'Content Calendar' },
  ];

  const mockContent = [
    {
      id: '1',
      title: 'Complete Guide to Local SEO in 2025',
      status: 'published',
      keyword: 'local SEO guide',
      publishDate: '2025-01-15',
      wordCount: 2847,
      readingTime: '12 min',
      performance: { views: 1247, clicks: 89, ctr: 7.1 }
    },
    {
      id: '2',
      title: 'How to Optimize Core Web Vitals',
      status: 'draft',
      keyword: 'core web vitals optimization',
      publishDate: 'Scheduled for 2025-01-18',
      wordCount: 1923,
      readingTime: '8 min',
      performance: { views: 0, clicks: 0, ctr: 0 }
    },
    {
      id: '3',
      title: 'Technical SEO Checklist for Beginners',
      status: 'outline',
      keyword: 'technical SEO checklist',
      publishDate: 'In progress',
      wordCount: 0,
      readingTime: 'TBD',
      performance: { views: 0, clicks: 0, ctr: 0 }
    },
  ];

  const mockKeywords = [
    {
      id: '1',
      term: 'local SEO tips',
      intent: 'informational',
      volume: 8100,
      difficulty: 45,
      position: 12,
      opportunities: 3,
      trend: 'up'
    },
    {
      id: '2',
      term: 'SEO audit checklist',
      intent: 'informational',
      volume: 5400,
      difficulty: 38,
      position: 8,
      opportunities: 5,
      trend: 'up'
    },
    {
      id: '3',
      term: 'page speed optimization',
      intent: 'commercial',
      volume: 12000,
      difficulty: 62,
      position: 23,
      opportunities: 2,
      trend: 'neutral'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      case 'outline':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const generateContentPlan = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGenerating(false);
  };

  const renderContentLibrary = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Content Library</h2>
          <p className="text-gray-600">Manage your SEO-optimized content and publications</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={generateContentPlan}
            disabled={generating}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Generate Plan
              </>
            )}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        {mockContent.map((content) => (
          <div key={content.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                    {content.status}
                  </span>
                  <span>• {content.keyword}</span>
                  <span>• {content.publishDate}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Word Count</span>
                <p className="font-semibold text-gray-900">{content.wordCount}</p>
              </div>
              <div>
                <span className="text-gray-500">Reading Time</span>
                <p className="font-semibold text-gray-900">{content.readingTime}</p>
              </div>
              <div>
                <span className="text-gray-500">Views</span>
                <p className="font-semibold text-gray-900">{content.performance.views}</p>
              </div>
              <div>
                <span className="text-gray-500">CTR</span>
                <p className="font-semibold text-gray-900">{content.performance.ctr}%</p>
              </div>
            </div>

            {content.status === 'draft' && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Publish Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderKeywords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Keyword Research</h2>
          <p className="text-gray-600">Track and optimize your target keywords</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Search className="h-4 w-4 mr-2" />
          Find Keywords
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>Keyword</div>
          <div>Intent</div>
          <div>Volume</div>
          <div>Difficulty</div>
          <div>Position</div>
          <div>Opportunities</div>
          <div>Actions</div>
        </div>
        
        {mockKeywords.map((keyword) => (
          <div key={keyword.id} className="grid grid-cols-7 gap-4 p-4 border-b border-gray-100 text-sm">
            <div>
              <p className="font-medium text-gray-900">{keyword.term}</p>
            </div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                keyword.intent === 'informational' ? 'bg-blue-100 text-blue-800' : 
                keyword.intent === 'commercial' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {keyword.intent}
              </span>
            </div>
            <div className="font-medium">{keyword.volume.toLocaleString()}</div>
            <div className={`font-medium ${keyword.difficulty > 50 ? 'text-red-600' : keyword.difficulty > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
              {keyword.difficulty}
            </div>
            <div className="font-medium">{keyword.position}</div>
            <div className="text-blue-600 font-medium">{keyword.opportunities}</div>
            <div>
              <button className="text-blue-600 hover:text-blue-700 text-xs">
                Create Content
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentCalendar = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Content Calendar</h2>
          <p className="text-gray-600">Plan and schedule your content strategy</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Content
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-4 h-64">
          {/* Calendar grid would go here */}
          <div className="col-span-7 flex items-center justify-center text-gray-500">
            <Calendar className="h-8 w-8 mr-2" />
            Content calendar coming soon
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Hub</h1>
            <p className="text-gray-600">
              AI-powered content creation and optimization for your SEO strategy.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {contentTabs.map((tab) => (
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
              {activeTab === 'content' && renderContentLibrary()}
              {activeTab === 'keywords' && renderKeywords()}
              {activeTab === 'planning' && renderContentCalendar()}
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default ContentPage;