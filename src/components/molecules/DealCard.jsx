import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const DealCard = ({ deal, onView, onExternalLink, className = '' }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x200?text=Deal+Image'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-surface rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${className}`}
      onClick={onView}
    >
      <div className="relative">
        <img 
          src={deal.thumbnail || 'https://via.placeholder.com/400x200?text=Deal+Image'} 
          alt={deal.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
          {deal.source || 'LTD Hunt'}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-secondary mb-2 line-clamp-2">
          {deal.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {deal.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <ApperIcon name="Eye" className="w-4 h-4" />
            <span>{deal.viewCount || 0} views</span>
          </div>
          
          <Button
            variant="accent"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onExternalLink(deal.url)
            }}
            className="glow-on-hover"
          >
            <ApperIcon name="ExternalLink" className="w-4 h-4 mr-1" />
            View Deal
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default DealCard