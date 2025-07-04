import React from 'react'
import Logo from '@/components/atoms/Logo'
import ViewToggle from '@/components/molecules/ViewToggle'
import NavigationControls from '@/components/molecules/NavigationControls'
import UserDropdown from '@/components/molecules/UserDropdown'

const Header = ({ 
  viewMode, 
  onViewToggle, 
  onPrevious, 
  onNext, 
  currentIndex,
  totalCount,
  canGoBack,
  canGoForward,
  onBackendToggle,
  onProfileEdit 
}) => {
  return (
    <header className="bg-surface shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="md" />
          
          <div className="flex items-center space-x-6">
            <NavigationControls
              onPrevious={onPrevious}
              onNext={onNext}
              currentIndex={currentIndex}
              totalCount={totalCount}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
            />
            
            <ViewToggle 
              viewMode={viewMode} 
              onToggle={onViewToggle} 
            />
            
            <UserDropdown 
              onBackendToggle={onBackendToggle}
              onProfileEdit={onProfileEdit}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header