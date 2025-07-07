import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeals } from "@/hooks/useDeals";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import FormField from "@/components/molecules/FormField";

const DealManagement = () => {
  const navigate = useNavigate()
  const { 
    deals, 
    loading, 
    error, 
    updateDeal, 
    deleteDeal, 
    updateAffiliateLink,
    bulkUpdateDeals
  } = useDeals()
  
const [searchQuery, setSearchQuery] = useState('')
  const [selectedDeals, setSelectedDeals] = useState([])
  const [filterSource, setFilterSource] = useState('all')
  const [showAffiliateOnly, setShowAffiliateOnly] = useState(false)

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSource = filterSource === 'all' || deal.source === filterSource
    const matchesAffiliate = !showAffiliateOnly || deal.affiliateLink
    
    return matchesSearch && matchesSource && matchesAffiliate
  })

const sources = [...new Set(deals.map(deal => deal.source))]

  const handleUpdateAffiliateLink = async (dealId, affiliateLink) => {
    try {
      await updateAffiliateLink(dealId, affiliateLink)
      toast.success('Affiliate link updated')
    } catch (error) {
      toast.error('Failed to update affiliate link')
    }
  }

  const handleDeleteDeal = async (dealId) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(dealId)
        toast.success('Deal deleted successfully')
      } catch (error) {
        toast.error('Failed to delete deal')
      }
    }
  }

  const handleBulkAction = async (action) => {
    if (selectedDeals.length === 0) {
      toast.warning('Please select deals first')
      return
    }

    try {
      switch (action) {
        case 'delete':
          if (confirm(`Delete ${selectedDeals.length} selected deals?`)) {
            await Promise.all(selectedDeals.map(id => deleteDeal(id)))
            toast.success(`${selectedDeals.length} deals deleted`)
            setSelectedDeals([])
          }
          break
        case 'clearAffiliate':
          await bulkUpdateDeals(selectedDeals, { affiliateLink: '' })
          toast.success('Affiliate links cleared')
          setSelectedDeals([])
          break
      }
    } catch (error) {
      toast.error('Bulk action failed')
    }
  }

  const toggleSelectDeal = (dealId) => {
    setSelectedDeals(prev => 
      prev.includes(dealId) 
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    )
  }

  const selectAllDeals = () => {
    setSelectedDeals(
      selectedDeals.length === filteredDeals.length 
        ? [] 
        : filteredDeals.map(deal => deal.Id)
    )
  }

if (loading) return <Loading />
  if (error) return <Error message={error} />
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">
              Edit deals, manage affiliate links, and organize your content
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {filteredDeals.length} of {deals.length} deals
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField
            label="Search Deals"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, descriptions..."
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Source</label>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAffiliateOnly}
                onChange={(e) => setShowAffiliateOnly(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">
                Has Affiliate Link
              </span>
            </label>
          </div>

          <div className="flex items-end space-x-2">
            <Button
              variant="secondary"
              onClick={selectAllDeals}
              size="sm"
            >
              {selectedDeals.length === filteredDeals.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedDeals.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">
                {selectedDeals.length} selected:
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleBulkAction('delete')}
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-1" />
                Delete
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleBulkAction('clearAffiliate')}
              >
                <ApperIcon name="LinkOff" className="w-4 h-4 mr-1" />
                Clear Links
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {filteredDeals.map(deal => (
          <div
            key={deal.Id}
            className={`bg-surface rounded-xl shadow-sm border-2 transition-all duration-200 ${
              selectedDeals.includes(deal.Id) 
                ? 'border-primary bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedDeals.includes(deal.Id)}
                  onChange={() => toggleSelectDeal(deal.Id)}
                  className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                />
                
                <img
                  src={deal.thumbnail}
                  alt={deal.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg text-secondary mb-2">
                        {deal.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {deal.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <ApperIcon name="Globe" className="w-4 h-4 mr-1" />
                          {deal.source}
                        </span>
                        <span className="flex items-center">
                          <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
                          {deal.viewCount} views
                        </span>
                        <span className="flex items-center">
                          <ApperIcon name="Calendar" className="w-4 h-4 mr-1" />
                          {new Date(deal.fetchedAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Affiliate Link Section */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Affiliate Link
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="url"
                            value={deal.affiliateLink || ''}
                            onChange={(e) => {
                              const updatedDeal = { ...deal, affiliateLink: e.target.value }
                              // Update local state immediately for responsive UI
                            }}
                            onBlur={(e) => handleUpdateAffiliateLink(deal.Id, e.target.value)}
                            placeholder="https://affiliate.example.com/deal/..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          {deal.affiliateLink && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(deal.affiliateLink, '_blank')}
                              className="p-2"
                            >
                              <ApperIcon name="ExternalLink" className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
</div>

                    <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(deal.url, '_blank')}
                        className="p-3 min-w-[44px] min-h-[44px] sm:p-2 sm:min-w-0 sm:min-h-0"
                        title="Open Original Deal"
                      >
                        <ApperIcon name="ExternalLink" className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteDeal(deal.Id)}
                        className="p-3 min-w-[44px] min-h-[44px] sm:p-2 sm:min-w-0 sm:min-h-0"
                        title="Delete Deal"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="Search" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="font-display text-lg font-semibold text-gray-700 mb-2">
            No deals found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
)}
    </div>
  )
}

export default DealManagement