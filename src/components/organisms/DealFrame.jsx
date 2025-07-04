import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'

const DealFrame = ({ deal, onExternalLink }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (!deal) {
    return (
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Monitor" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary mb-2">No Deal Selected</h3>
          <p className="text-gray-600">Navigate to a deal to view it here.</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      key={deal.Id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-surface rounded-xl shadow-lg overflow-hidden h-[calc(100vh-120px)]"
    >
      <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-xl truncate mb-1">
              {deal.title}
            </h2>
            <p className="text-purple-100 text-sm truncate">
              {deal.url}
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onExternalLink(deal.url)}
            className="ml-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
            Open Original
          </Button>
        </div>
      </div>

      <div className="relative h-[calc(100%-80px)]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <Loading type="iframe" />
          </div>
        )}
        
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface">
            <div className="text-center">
              <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">Cannot Load Page</h3>
              <p className="text-gray-600 mb-4">
                This site cannot be displayed in a frame.
              </p>
              <Button
                variant="accent"
                onClick={() => onExternalLink(deal.url)}
                className="glow-on-hover"
              >
                <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>
          </div>
        ) : (
          <iframe
            src={deal.url}
            className="w-full h-full border-0"
            onLoad={handleLoad}
            onError={handleError}
            title={deal.title}
          />
        )}
      </div>
    </motion.div>
  )
}

export default DealFrame