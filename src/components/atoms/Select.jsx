import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  error = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-white appearance-none'
  
  const stateClasses = error 
    ? 'border-error focus:border-error focus:ring-error' 
    : 'border-gray-200 focus:border-primary focus:ring-primary hover:border-gray-300'
  
  const classes = `${baseClasses} ${stateClasses} ${className}`
  
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ApperIcon 
        name="ChevronDown" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
      />
    </div>
  )
}

export default Select