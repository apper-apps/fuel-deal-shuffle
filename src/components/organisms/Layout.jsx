import React, { useState } from 'react'
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import UserDropdown from '@/components/molecules/UserDropdown'
import Logo from '@/components/atoms/Logo'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isUserDashboard = location.pathname.startsWith('/user')

  const navigationItems = [
    {
      name: 'User Profile',
      path: '/user/profile',
      icon: 'User'
    },
    {
      name: 'Deals',
      path: '/user',
      icon: 'ShoppingBag'
    },
    {
      name: 'Favorites',
      path: '/user/favorites', 
      icon: 'Heart'
    },
    {
      name: 'Recently Viewed',
      path: '/user/recently-viewed',
      icon: 'Clock'
    }
  ]

  const isActivePath = (path) => {
    if (path === '/user') {
      return location.pathname === '/user' || location.pathname === '/user/'
    }
    return location.pathname === path
  }

  if (!isUserDashboard) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Logo className="w-8 h-8" />
              <span className="font-display font-bold text-xl text-secondary">
                Dashboard
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className={`w-5 h-5 ${isActivePath(item.path) ? 'text-white' : 'text-gray-500'}`} 
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full justify-center"
            >
              <ApperIcon name="Home" className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-surface shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="Menu" className="w-6 h-6" />
              </button>
              
              <div className="hidden lg:block">
                <h1 className="font-display text-xl font-semibold text-secondary">
                  {navigationItems.find(item => isActivePath(item.path))?.name || 'Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <UserDropdown />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout