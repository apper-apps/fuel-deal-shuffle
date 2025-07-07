import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const UserDropdown = ({ onProfileEdit }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const userAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <img 
          src={userAvatar} 
          alt="User Avatar" 
          className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
        />
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src={userAvatar} 
                  alt="User Avatar" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-secondary">Deal Hunter</p>
                  <p className="text-sm text-gray-600">dealhunter@example.com</p>
                </div>
              </div>
            </div>
<div className="py-2">
              <button
                onClick={() => {
                  onProfileEdit()
                  setIsOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <ApperIcon name="User" className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-secondary">Edit Profile</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDropdown