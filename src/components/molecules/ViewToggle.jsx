import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const ViewToggle = ({ viewMode, onToggle }) => {
  return (
    <div className="flex items-center bg-surface rounded-lg p-1 shadow-md">
      <button
        onClick={() => onToggle('cards')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          viewMode === 'cards' 
            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-secondary hover:bg-gray-100'
        }`}
      >
        <ApperIcon name="LayoutGrid" className="w-4 h-4" />
        <span className="text-sm font-medium">Cards</span>
      </button>
      
      <button
        onClick={() => onToggle('masonry')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          viewMode === 'masonry' 
            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-secondary hover:bg-gray-100'
        }`}
      >
        <ApperIcon name="Grid3x3" className="w-4 h-4" />
        <span className="text-sm font-medium">Masonry</span>
      </button>
      
      <button
        onClick={() => onToggle('list')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          viewMode === 'list' 
            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-secondary hover:bg-gray-100'
        }`}
      >
        <ApperIcon name="List" className="w-4 h-4" />
        <span className="text-sm font-medium">List</span>
      </button>
      
      <button
        onClick={() => onToggle('iframe')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
          viewMode === 'iframe' 
            ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md' 
            : 'text-gray-600 hover:text-secondary hover:bg-gray-100'
        }`}
      >
        <ApperIcon name="Monitor" className="w-4 h-4" />
        <span className="text-sm font-medium">Frame</span>
      </button>
    </div>
  )
}

export default ViewToggle