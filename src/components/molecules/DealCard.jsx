import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const DealCard = ({ 
  deal, 
  onView, 
  onExternalLink, 
  className = '', 
  variant = 'card' // 'card' or 'list'
}) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x200?text=Deal+Image'
  }

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-surface rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${className}`}
        onClick={onView}
      >
        <div className="flex items-center p-4 space-x-4">
          <div className="relative flex-shrink-0">
            <img 
              src={deal.thumbnail || `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} 
              alt={deal.title}
              className="w-20 h-20 object-cover rounded-lg transition-all duration-300"
              onError={handleImageError}
              loading="lazy"
            />
            {(!deal.thumbnail || 
              deal.thumbnail === `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80` ||
              deal.thumbnail.includes('via.placeholder.com')) && (
              <div className="absolute top-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-xs">
                <ApperIcon name="Image" className="w-2 h-2 inline mr-1" />
                Auto
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg text-secondary mb-1 line-clamp-2">
                  {deal.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {deal.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <ApperIcon name="Eye" className="w-3 h-3 mr-1" />
                    {deal.viewCount || 0} views
                  </span>
                  <span className="flex items-center">
                    <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                    {new Date(deal.fetchedAt).toLocaleDateString()}
                  </span>
                  <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                    {deal.source || 'LTD Hunt'}
                  </span>
                </div>
              </div>
              
              <Button
                variant="accent"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onExternalLink(deal.url)
                }}
                className="glow-on-hover ml-4 flex-shrink-0"
              >
                <ApperIcon name="ExternalLink" className="w-4 h-4 mr-1" />
                View Deal
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
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