import React from 'react'
import Input from '@/components/atoms/Input'

const FormField = ({ 
  label, 
  error, 
  helperText, 
  required = false, 
  className = '',
  children,
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      {children || <Input error={!!error} {...props} />}
      
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-600">{helperText}</p>
      )}
    </div>
  )
}

export default FormField