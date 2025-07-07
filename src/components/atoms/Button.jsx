import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95'
  
const variants = {
    primary: 'bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white focus:ring-primary glow-on-hover',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-100 text-secondary focus:ring-gray-300 border border-gray-300',
    accent: 'bg-gradient-to-r from-accent to-orange-600 hover:from-orange-600 hover:to-accent text-white focus:ring-accent glow-on-hover',
    ghost: 'bg-transparent hover:bg-gray-100 text-secondary focus:ring-gray-300',
    danger: 'bg-gradient-to-r from-error to-red-600 hover:from-red-600 hover:to-error text-white focus:ring-error',
    success: 'bg-gradient-to-r from-success to-green-600 hover:from-green-600 hover:to-success text-white focus:ring-success glow-on-hover'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button