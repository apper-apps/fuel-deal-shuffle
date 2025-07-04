import React from 'react'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const NavigationControls = ({ 
  onPrevious, 
  onNext, 
  currentIndex = 0, 
  totalCount = 0,
  canGoBack = false,
  canGoForward = false
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="md"
        onClick={onPrevious}
        disabled={!canGoBack}
        className="flex items-center space-x-2"
      >
        <ApperIcon name="ChevronLeft" className="w-5 h-5" />
        <span>Previous</span>
      </Button>
      
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>{currentIndex + 1}</span>
        <span>of</span>
        <span>{totalCount}</span>
      </div>
      
      <Button
        variant="ghost"
        size="md"
        onClick={onNext}
        disabled={!canGoForward}
        className="flex items-center space-x-2"
      >
        <span>Next</span>
        <ApperIcon name="ChevronRight" className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default NavigationControls