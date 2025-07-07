import React from 'react'

const Input = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  className = '', 
  disabled = false,
  error = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-white'
  
  const stateClasses = error 
    ? 'border-error focus:border-error focus:ring-error' 
    : 'border-gray-200 focus:border-primary focus:ring-primary hover:border-gray-300 focus:bg-gray-50'
  const classes = `${baseClasses} ${stateClasses} ${className}`
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classes}
      {...props}
    />
  )
}

export default Input