import React, { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const RecentlyViewed = () => {
  const [recentDeals] = useState([])

  const clearHistory = () => {
    // In a real app, this would clear the viewing history
    console.log('Clearing viewing history...')
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-secondary mb-2">
            Recently Viewed
          </h1>
          <p className="text-gray-600">
            Quick access to deals you've recently looked at
          </p>
        </div>
        {recentDeals.length > 0 && (
          <Button variant="secondary" onClick={clearHistory}>
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        )}
      </div>

      {/* Recently Viewed Content */}
      {recentDeals.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Clock" className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-700 mb-2">
              No recent activity
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Your recently viewed deals will appear here. Start browsing to see your viewing history.
            </p>
            <Button variant="primary" onClick={() => window.location.href = '/'}>
              <ApperIcon name="Search" className="w-4 h-4 mr-2" />
              Browse Deals
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Recent deals would be rendered here */}
          {recentDeals.map(deal => (
            <div key={deal.Id} className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Deal card content with timestamp */}
            </div>
          ))}
        </div>
      )}

      {/* Coming Soon Notice */}
      <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Clock" className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900 mb-1">Feature Coming Soon</h4>
            <p className="text-purple-700 text-sm">
              View tracking is currently being implemented. Soon you'll see a chronological list of all deals 
              you've viewed, with timestamps and the ability to quickly revisit them.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentlyViewed