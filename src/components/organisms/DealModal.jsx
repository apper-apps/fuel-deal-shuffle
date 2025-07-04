import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const DealModal = ({ deal, isOpen, onClose, onExternalLink }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x300?text=Deal+Image'
  }

  return (
    <AnimatePresence>
      {isOpen && deal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
transition={{ duration: 0.3 }}
            className="bg-surface rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200 z-10"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
              
              <img 
                src={deal.thumbnail || 'https://via.placeholder.com/600x300?text=Deal+Image'} 
                alt={deal.title}
                className="w-full h-64 object-cover"
                onError={handleImageError}
              />
              
              <div className="absolute bottom-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                {deal.source || 'LTD Hunt'}
              </div>
</div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <h2 className="font-display font-bold text-2xl text-secondary mb-4">
                {deal.title}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {deal.description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Eye" className="w-4 h-4" />
                    <span>{deal.viewCount || 0} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Clock" className="w-4 h-4" />
                    <span>{new Date(deal.fetchedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => onExternalLink(deal.url)}
                  className="flex-1 glow-on-hover"
                >
                  <ApperIcon name="ExternalLink" className="w-5 h-5 mr-2" />
                  View Deal
                </Button>
                
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DealModal