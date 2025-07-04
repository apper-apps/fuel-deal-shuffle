import React from 'react'

const Loading = ({ type = 'default' }) => {
  if (type === 'card') {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-lg animate-pulse">
        <div className="space-y-4">
          <div className="w-full h-48 bg-gray-200 rounded-lg shimmer"></div>
          <div className="space-y-2">
            <div className="w-3/4 h-6 bg-gray-200 rounded shimmer"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded shimmer"></div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded shimmer"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'iframe') {
    return (
      <div className="w-full h-full bg-surface rounded-xl p-8 shadow-lg animate-pulse">
        <div className="space-y-4">
          <div className="w-1/3 h-8 bg-gray-200 rounded shimmer"></div>
          <div className="w-full h-[calc(100vh-200px)] bg-gray-200 rounded-lg shimmer"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  )
}

export default Loading