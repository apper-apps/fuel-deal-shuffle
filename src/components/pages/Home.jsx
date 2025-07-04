import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '@/components/organisms/Header'
import DealSlider from '@/components/organisms/DealSlider'
import DealFrame from '@/components/organisms/DealFrame'
import DealModal from '@/components/organisms/DealModal'
import BackendPanel from '@/components/organisms/BackendPanel'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { dealService } from '@/services/api/dealService'

const Home = () => {
  const [deals, setDeals] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState('cards')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBackendOpen, setIsBackendOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDeals()
  }, [])

  const loadDeals = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dealService.getAll()
      setDeals(data)
      if (data.length > 0) {
        setCurrentIndex(0)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error loading deals:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < deals.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleViewToggle = (mode) => {
    setViewMode(mode)
  }

  const handleDealView = async (deal) => {
    setSelectedDeal(deal)
    setIsModalOpen(true)
    
    // Increment view count
    try {
      const updatedDeal = { ...deal, viewCount: (deal.viewCount || 0) + 1 }
      await dealService.update(deal.Id, updatedDeal)
      
      // Update local state
      setDeals(prevDeals => 
        prevDeals.map(d => d.Id === deal.Id ? updatedDeal : d)
      )
    } catch (error) {
      console.error('Error updating view count:', error)
    }
  }

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleBackendToggle = () => {
    setIsBackendOpen(!isBackendOpen)
  }

  const handleProfileEdit = () => {
    toast.info('Profile editing feature coming soon!')
  }

  const handleDealsUpdate = () => {
    loadDeals()
  }

  const currentDeal = deals[currentIndex]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          viewMode={viewMode}
          onViewToggle={handleViewToggle}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={0}
          totalCount={0}
          canGoBack={false}
          canGoForward={false}
          onBackendToggle={handleBackendToggle}
          onProfileEdit={handleProfileEdit}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type={viewMode === 'cards' ? 'card' : 'iframe'} />
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          viewMode={viewMode}
          onViewToggle={handleViewToggle}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={0}
          totalCount={0}
          canGoBack={false}
          canGoForward={false}
          onBackendToggle={handleBackendToggle}
          onProfileEdit={handleProfileEdit}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadDeals} />
        </main>
      </div>
    )
  }

  if (deals.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          viewMode={viewMode}
          onViewToggle={handleViewToggle}
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={0}
          totalCount={0}
          canGoBack={false}
          canGoForward={false}
          onBackendToggle={handleBackendToggle}
          onProfileEdit={handleProfileEdit}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Empty 
            title="No deals available"
            description="Start discovering amazing deals by adding RSS feeds or individual URLs through the backend panel."
            actionText="Manage Deals"
            onAction={() => setIsBackendOpen(true)}
          />
        </main>
        <BackendPanel 
          isOpen={isBackendOpen}
          onClose={() => setIsBackendOpen(false)}
          onDealsUpdate={handleDealsUpdate}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode={viewMode}
        onViewToggle={handleViewToggle}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalCount={deals.length}
        canGoBack={currentIndex > 0}
        canGoForward={currentIndex < deals.length - 1}
        onBackendToggle={handleBackendToggle}
        onProfileEdit={handleProfileEdit}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'cards' ? (
          <DealSlider
            deals={deals}
            currentIndex={currentIndex}
            onDealView={handleDealView}
            onExternalLink={handleExternalLink}
          />
        ) : (
          <DealFrame
            deal={currentDeal}
            onExternalLink={handleExternalLink}
          />
        )}
      </main>

      <DealModal
        deal={selectedDeal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExternalLink={handleExternalLink}
      />

      <BackendPanel 
        isOpen={isBackendOpen}
        onClose={() => setIsBackendOpen(false)}
        onDealsUpdate={handleDealsUpdate}
      />
    </div>
  )
}

export default Home