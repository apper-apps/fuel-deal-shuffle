import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "No deals found", 
  description = "Start by adding some deals to discover amazing offers!",
  actionText = "Add First Deal",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-surface rounded-xl p-8 shadow-lg">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="Package" className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      {onAction && (
        <Button
          onClick={onAction}
          className="bg-gradient-to-r from-accent to-orange-600 hover:from-orange-600 hover:to-accent text-white px-8 py-3 rounded-lg glow-on-hover transition-all duration-300 transform hover:scale-105"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionText}
        </Button>
      )}
    </div>
  )
}

export default Empty