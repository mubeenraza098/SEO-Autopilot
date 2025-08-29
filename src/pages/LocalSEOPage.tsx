import React, { useState } from 'react';
import { MapPin, Star, MessageCircle, Navigation, Phone, Mail } from 'lucide-react';
import NavigationLayout from '../components/NavigationLayout';

const LocalSEOPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const localTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listings', label: 'Citations' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'posts', label: 'GBP Posts' },
  ];

  const mockCitations = [
    {
      id: '1',
      platform: 'Google Business Profile',
      status: 'verified',
      napConsistency: 100,
      lastUpdated: '2025-01-15',
      url: 'https://g.page/business'
    },
    {
      id: '2',
      platform: 'Yelp',
      status: 'claimed',
      napConsistency: 95,
      lastUpdated: '2025-01-10',
      url: 'https://yelp.com/biz/business'
    },
    {
      id: '3',
      platform: 'Yellow Pages',
      status: 'unclaimed',
      napConsistency: 80,
      lastUpdated: '2024-12-20',
      url: 'https://yellowpages.com/business'
    },
  ];

  const mockReviews = [
    {
      id: '1',
      platform: 'Google',
      rating: 5,
      author: 'Sarah Johnson',
      text: 'Excellent service! The team was professional and delivered exactly what we needed.',
      date: '2025-01-12',
      response: 'Thank you Sarah! We appreciate your business.'
    },
    {
      id: '2',
      platform: 'Yelp',
      rating: 4,
      author: 'Mike Chen',
      text: 'Great experience overall. Quick turnaround and good communication.',
      date: '2025-01-08',
      response: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'claimed':
        return 'bg-blue-100 text-blue-800';
      case 'unclaimed':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Business Info Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Primary NAP</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Business Street, City, ST 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@business.com</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Local SEO Health</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Citation Consistency</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center space-x-1">
                  {renderStars(4)}
                  <span className="text-sm font-medium text-gray-900 ml-1">4.5</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Reviews</span>
                <span className="text-sm font-medium text-gray-900">147</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Navigation className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">23</span>
          </div>
          <h3 className="font-semibold text-blue-800">Local Citations</h3>
          <p className="text-blue-600 text-sm mt-1">+3 this month</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Star className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">4.5</span>
          </div>
          <h3 className="font-semibold text-green-800">Avg Rating</h3>
          <p className="text-green-600 text-sm mt-1">147 total reviews</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <MapPin className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">12</span>
          </div>
          <h3 className="font-semibold text-purple-800">Local Keywords</h3>
          <p className="text-purple-600 text-sm mt-1">Avg position: 8.4</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageCircle className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-600">8</span>
          </div>
          <h3 className="font-semibold text-orange-800">GBP Posts</h3>
          <p className="text-orange-600 text-sm mt-1">This month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow text-left">
          <MapPin className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Update NAP Info</h3>
          <p className="text-sm text-gray-600 mt-1">Sync across all platforms</p>
        </button>

        <button className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow text-left">
          <Star className="h-8 w-8 text-yellow-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Request Reviews</h3>
          <p className="text-sm text-gray-600 mt-1">Send review invitations</p>
        </button>

        <button className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow text-left">
          <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Create GBP Post</h3>
          <p className="text-sm text-gray-600 mt-1">Engage local audience</p>
        </button>
      </div>
    </div>
  );

  const renderCitations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Local Citations</h2>
          <p className="text-gray-600">Manage your business listings across local directories</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Navigation className="h-4 w-4 mr-2" />
          Find More Citations
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>Platform</div>
          <div>Status</div>
          <div>NAP Consistency</div>
          <div>Last Updated</div>
          <div>Actions</div>
        </div>
        
        {mockCitations.map((citation) => (
          <div key={citation.id} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 text-sm">
            <div className="font-medium text-gray-900">{citation.platform}</div>
            <div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(citation.status)}`}>
                {citation.status}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${citation.napConsistency}%` }}
                ></div>
              </div>
              <span className="text-xs">{citation.napConsistency}%</span>
            </div>
            <div className="text-gray-600">{citation.lastUpdated}</div>
            <div>
              <button className="text-blue-600 hover:text-blue-700 text-xs mr-2">
                Edit
              </button>
              <button className="text-gray-600 hover:text-gray-700 text-xs">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Review Management</h2>
          <p className="text-gray-600">Monitor and respond to customer reviews</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Star className="h-4 w-4 mr-2" />
          Request Reviews
        </button>
      </div>

      <div className="grid gap-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{review.platform}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.text}</p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            
            {review.response ? (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Business Response:</span> {review.response}
                </p>
              </div>
            ) : (
              <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm">
                Respond to Review
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Google Business Profile Posts</h2>
          <p className="text-gray-600">Create and schedule posts to engage your local audience</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <MessageCircle className="h-4 w-4 mr-2" />
          Create Post
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">GBP Posts Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Create engaging posts, share updates, and promote special offers directly on your Google Business Profile.
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Local SEO</h1>
            <p className="text-gray-600">
              Optimize your local search presence and manage your business listings.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {localTabs.map((tab) => (
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
              {activeTab === 'listings' && renderCitations()}
              {activeTab === 'reviews' && renderReviews()}
              {activeTab === 'posts' && renderPosts()}
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default LocalSEOPage;