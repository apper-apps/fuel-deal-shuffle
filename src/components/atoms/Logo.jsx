import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }
  
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  }
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-gradient-to-br from-primary to-purple-600 rounded-lg p-1.5">
        <ApperIcon name="Shuffle" className={`${iconSizes[size]} text-white`} />
      </div>
      <span className={`font-display font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ${sizes[size]}`}>
        DealShuffle
      </span>
    </div>
  )
}

export default Logo