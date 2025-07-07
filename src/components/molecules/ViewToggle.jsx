import React from "react";
import ApperIcon from "@/components/ApperIcon";

const ViewToggle = ({ 
  viewMode, 
  onToggle, 
  masonryColumns = 3, 
  onMasonryColumnsChange,
  sortBy = 'newest',
  onSortChange,
  filterCategory = 'all',
  onCategoryChange,
  categories = []
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 bg-surface rounded-lg p-1 shadow-md">
      <div className="flex items-center">
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
        
        <div className="relative">
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
          
          {viewMode === 'masonry' && (
            <div className="absolute top-full left-0 mt-1 bg-surface rounded-lg shadow-lg border border-gray-200 p-2 z-10">
              <div className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-xs font-medium text-gray-700">Columns:</span>
                <div className="flex space-x-1">
                  {[2, 3, 4].map(cols => (
                    <button
                      key={cols}
                      onClick={() => onMasonryColumnsChange?.(cols)}
                      className={`px-2 py-1 rounded text-xs transition-all duration-200 ${
                        masonryColumns === cols
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cols}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
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

      {(viewMode === 'masonry' || viewMode === 'list') && (
        <div className="flex items-center space-x-2 border-l border-gray-200 pl-2">
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="text-xs px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="featured">Featured First</option>
            <option value="oldest">Oldest</option>
          </select>
          
          {categories.length > 0 && (
            <select
              value={filterCategory}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              className="text-xs px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  )
}

export default ViewToggle
