import React, { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const UserFavorites = () => {
  const [favorites] = useState([])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-secondary mb-2">
          Favorite Deals
        </h1>
        <p className="text-gray-600">
          Keep track of deals you love and want to revisit
        </p>
      </div>

      {/* Favorites Content */}
      {favorites.length === 0 ? (
        <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Heart" className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-700 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start adding deals to your favorites by clicking the heart icon on any deal card. 
              They'll appear here for easy access.
            </p>
            <Button variant="primary" onClick={() => window.location.href = '/'}>
              <ApperIcon name="Search" className="w-4 h-4 mr-2" />
              Browse Deals
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Favorite deals would be rendered here */}
          {favorites.map(deal => (
            <div key={deal.Id} className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Deal card content */}
            </div>
          ))}
        </div>
      )}

      {/* Coming Soon Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Feature Coming Soon</h4>
            <p className="text-blue-700 text-sm">
              The favorites system is currently being developed. Soon you'll be able to save your favorite deals, 
              organize them into collections, and get notified when similar deals become available.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFavorites