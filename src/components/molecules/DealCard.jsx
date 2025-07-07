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
          src={deal.thumbnail || `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
          alt={deal.title}
          className="w-full h-48 object-cover transition-all duration-300"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
          {deal.source || 'LTD Hunt'}
        </div>
        {(!deal.thumbnail || 
          deal.thumbnail === `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80` ||
          deal.thumbnail.includes('via.placeholder.com')) && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            <ApperIcon name="Image" className="w-3 h-3 inline mr-1" />
            Auto-generated
          </div>
        )}
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