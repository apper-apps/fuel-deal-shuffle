import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import Loading from '@/components/ui/Loading'
import { dealService } from '@/services/api/dealService'

const BackendPanel = ({ isOpen, onClose, onDealsUpdate }) => {
  const [rssUrl, setRssUrl] = useState('https://ltdhunt.com/rss')
  const [singleUrl, setSingleUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState(60)
  const [rssStatus, setRssStatus] = useState('idle') // idle, fetching, success, error
  const [lastFetch, setLastFetch] = useState(null)
const handleFetchRSS = async () => {
    if (!rssUrl.trim()) {
      toast.error('Please enter an RSS URL')
      return
    }

    setIsLoading(true)
    setRssStatus('fetching')
    try {
      // Simulate RSS fetching
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockDeals = [
        {
          Id: Date.now(),
          title: 'Amazing Software Deal - 90% Off',
          url: 'https://ltdhunt.com/deal/amazing-software',
          description: 'Get this incredible software at an unbeatable price. Limited time offer with lifetime access.',
          thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80',
          source: 'LTD Hunt',
          fetchedAt: new Date().toISOString(),
          viewCount: 0,
          affiliateLink: ''
        },
        {
          Id: Date.now() + 1,
          title: 'Premium Marketing Tool Bundle',
          url: 'https://ltdhunt.com/deal/marketing-bundle',
          description: 'Complete marketing toolkit with analytics, automation, and social media management.',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
          source: 'LTD Hunt',
          fetchedAt: new Date().toISOString(),
          viewCount: 0,
          affiliateLink: ''
        }
      ]

      for (const deal of mockDeals) {
        await dealService.create(deal)
      }

      setRssStatus('success')
      setLastFetch(new Date())
      toast.success(`Successfully fetched ${mockDeals.length} deals from RSS`)
      onDealsUpdate()
      setRssUrl('')
    } catch (error) {
      setRssStatus('error')
      toast.error('Failed to fetch RSS feed')
      console.error('RSS fetch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
    if (!autoRefresh) {
      toast.success(`Auto-refresh enabled (${refreshInterval} minutes)`)
    } else {
      toast.info('Auto-refresh disabled')
    }
  }

  const handleAddSingleUrl = async () => {
    if (!singleUrl.trim()) {
      toast.error('Please enter a URL')
      return
    }

    setIsLoading(true)
    try {
      // Simulate URL processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const deal = {
        Id: Date.now(),
        title: 'Custom Deal Added',
        url: singleUrl,
        description: 'This deal was manually added and needs proper description.',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
        source: 'Manual',
        fetchedAt: new Date().toISOString(),
        viewCount: 0
      }

      await dealService.create(deal)
      toast.success('Deal added successfully')
      onDealsUpdate()
      setSingleUrl('')
    } catch (error) {
      toast.error('Failed to add deal')
      console.error('Add deal error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Settings" className="w-6 h-6" />
                  <h2 className="font-display font-bold text-xl">Deal Management</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-purple-200 transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-6 h-6" />
                </button>
              </div>
            </div>

<div className="p-6 space-y-8">
              {/* RSS Feed Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-lg text-secondary flex items-center">
                    <ApperIcon name="Rss" className="w-5 h-5 mr-2 text-accent" />
                    RSS Feed Manager
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      rssStatus === 'fetching' ? 'bg-yellow-500 animate-pulse' :
                      rssStatus === 'success' ? 'bg-green-500' :
                      rssStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      {rssStatus === 'fetching' ? 'Fetching...' :
                       rssStatus === 'success' ? 'Connected' :
                       rssStatus === 'error' ? 'Error' : 'Idle'}
                    </span>
                  </div>
                </div>
                
                <FormField
                  label="RSS Feed URL"
                  value={rssUrl}
                  onChange={(e) => setRssUrl(e.target.value)}
                  placeholder="https://ltdhunt.com/rss"
                  helperText="Enter the RSS feed URL to automatically fetch deals"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="primary"
                    onClick={handleFetchRSS}
                    disabled={isLoading}
                    className="glow-on-hover"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Fetching...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Download" className="w-4 h-4 mr-2" />
                        Manual Fetch
                      </>
                    )}
                  </Button>

                  <Button
                    variant={autoRefresh ? "accent" : "secondary"}
                    onClick={handleToggleAutoRefresh}
                    className="glow-on-hover"
                  >
                    <ApperIcon name={autoRefresh ? "PauseCircle" : "PlayCircle"} className="w-4 h-4 mr-2" />
                    {autoRefresh ? 'Auto On' : 'Auto Off'}
                  </Button>
                </div>

                {autoRefresh && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Refresh Interval (minutes)
                    </label>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                      <option value={360}>6 hours</option>
                    </select>
                  </div>
                )}

                {lastFetch && (
                  <p className="text-sm text-gray-600">
                    Last fetch: {lastFetch.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Single URL Section */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-secondary flex items-center">
                  <ApperIcon name="Link" className="w-5 h-5 mr-2 text-accent" />
                  Add Single URL
                </h3>
                
                <FormField
                  label="Deal URL"
                  value={singleUrl}
                  onChange={(e) => setSingleUrl(e.target.value)}
                  placeholder="https://example.com/deal"
                  helperText="Add a single deal URL manually"
                />
                
                <Button
                  variant="accent"
                  onClick={handleAddSingleUrl}
                  disabled={isLoading}
                  className="w-full glow-on-hover"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding Deal...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                      Add Deal
                    </>
                  )}
                </Button>
</div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Deal Management Quick Actions */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-secondary flex items-center">
                  <ApperIcon name="Settings" className="w-5 h-5 mr-2 text-accent" />
                  Deal Management
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="accent"
                    onClick={() => window.open('/deals/manage', '_blank')}
                    className="glow-on-hover"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                    Edit Deals
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={() => onDealsUpdate()}
                    className="glow-on-hover"
                  >
                    <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                    Refresh List
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BackendPanel