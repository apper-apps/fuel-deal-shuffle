import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDeals } from "@/hooks/useDeals";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import FormField from "@/components/molecules/FormField";

const DealManagement = () => {
  const navigate = useNavigate()
  const { 
    deals, 
    loading, 
    error, 
    createDeal,
    updateDeal, 
    deleteDeal, 
    updateAffiliateLink,
    bulkUpdateDeals
  } = useDeals()
  
const [searchQuery, setSearchQuery] = useState('')
  const [selectedDeals, setSelectedDeals] = useState([])
  const [filterSource, setFilterSource] = useState('all')
  const [showAffiliateOnly, setShowAffiliateOnly] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDeal, setNewDeal] = useState({
    title: '',
    url: '',
    description: '',
    affiliateLink: '',
    source: 'Manual Entry'
  })
  const [editingLinks, setEditingLinks] = useState({})
  const [pendingLinks, setPendingLinks] = useState({})
  const [fetchedData, setFetchedData] = useState(null)
  const [showAllFields, setShowAllFields] = useState(false)
  const [fetchingUrl, setFetchingUrl] = useState(false)
const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSource = filterSource === 'all' || deal.source === filterSource
    const matchesAffiliate = !showAffiliateOnly || deal.affiliateLink
    
    return matchesSearch && matchesSource && matchesAffiliate
  })
const sources = [...new Set(deals.map(deal => deal.source))]

const handleFetchUrl = async () => {
    if (!newDeal.url) {
      toast.warning('Please enter a URL first')
      return
    }

    setFetchingUrl(true)
    try {
      const { dealService } = await import('@/services/api/dealService')
      const fetchedInfo = await dealService.fetchUrlData(newDeal.url)
      
      setFetchedData(fetchedInfo)
      setNewDeal(prev => ({
        ...prev,
        title: fetchedInfo.title || prev.title,
        description: fetchedInfo.description || prev.description,
        source: fetchedInfo.source || prev.source,
        affiliateLink: fetchedInfo.affiliateLink || prev.affiliateLink
      }))
      setShowAllFields(true)
      toast.success('Information fetched successfully')
    } catch (error) {
      toast.error('Failed to fetch URL information')
    } finally {
      setFetchingUrl(false)
    }
  }

  const handleAddDeal = async (e) => {
    e.preventDefault()
    if (!newDeal.title || !newDeal.url || !newDeal.description) {
      toast.warning('Please fill in all required fields')
      return
    }

    try {
await createDeal({
        ...newDeal,
        thumbnail: fetchedData?.thumbnail || `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        fetchedAt: new Date().toISOString(),
        viewCount: 0
      })
      toast.success('Deal added successfully')
      setNewDeal({
        title: '',
        url: '',
        description: '',
        affiliateLink: '',
        source: 'Manual Entry'
      })
      setFetchedData(null)
      setShowAllFields(false)
      setShowAddForm(false)
    } catch (error) {
      toast.error('Failed to add deal')
    }
  }

  const handleLinkChange = (dealId, linkType, value) => {
    setPendingLinks(prev => ({
      ...prev,
      [dealId]: {
        ...prev[dealId],
        [linkType]: value
      }
    }))
    setEditingLinks(prev => ({
      ...prev,
      [dealId]: true
    }))
  }

  const handleSaveLinks = async (dealId) => {
    const links = pendingLinks[dealId]
    if (!links) return

    try {
      await updateDeal(dealId, {
        url: links.url !== undefined ? links.url : deals.find(d => d.Id === dealId)?.url,
        affiliateLink: links.affiliateLink !== undefined ? links.affiliateLink : deals.find(d => d.Id === dealId)?.affiliateLink
      })
toast.success('Deal information updated successfully')
      setEditingLinks(prev => ({ ...prev, [dealId]: false }))
      setPendingLinks(prev => {
        const newState = { ...prev }
        delete newState[dealId]
        return newState
      })
    } catch (error) {
      toast.error('Failed to update links')
    }
  }

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

      {/* Add Deal Section */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-secondary flex items-center">
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Add New Deal
          </h2>
<Button
            variant={showAddForm ? 'secondary' : 'primary'}
            onClick={() => {
              setShowAddForm(!showAddForm)
              if (!showAddForm) {
                setShowAllFields(false)
                setFetchedData(null)
                setNewDeal({
                  title: '',
                  url: '',
                  description: '',
                  affiliateLink: '',
                  source: 'Manual Entry'
                })
              }
            }}
            size="sm"
          >
            {showAddForm ? 'Cancel' : 'Add Deal'}
          </Button>
        </div>

{showAddForm && (
          <div className="space-y-4">
            {/* Step 1: URL Input */}
            {!showAllFields && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deal URL *
                  </label>
                  <div className="flex space-x-3">
                    <Input
                      type="url"
                      value={newDeal.url}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://example.com/deal - Enter URL to fetch information"
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleFetchUrl}
                      disabled={!newDeal.url || fetchingUrl}
                      className="min-w-[120px]"
                    >
                      {fetchingUrl ? (
                        <>
                          <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        <>
                          <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                          Fetch
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Enter a deal URL and click Fetch to automatically extract deal information
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Full Form After Fetch */}
            {showAllFields && (
              <form onSubmit={handleAddDeal} className="space-y-4">
{fetchedData && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <ApperIcon name="CheckCircle" className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        Information fetched successfully! {fetchedData.thumbnail ? 'Thumbnail and content' : 'Content'} extracted. Review and edit the fields below before saving.
                      </span>
                    </div>
                    {fetchedData.thumbnail && (
                      <div className="mt-3 flex items-center text-sm text-green-700">
                        <ApperIcon name="Image" className="w-4 h-4 mr-1" />
                        <span>Thumbnail image detected and ready to use</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deal Title *
                    </label>
                    <Input
                      value={newDeal.title}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter deal title..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deal URL *
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        type="url"
                        value={newDeal.url}
                        onChange={(e) => setNewDeal(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://example.com/deal"
                        required
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setShowAllFields(false)
                          setFetchedData(null)
                        }}
                        size="sm"
                        title="Change URL"
                      >
                        <ApperIcon name="Edit3" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newDeal.description}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the deal..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none transition-all duration-200 bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Affiliate Link (Optional)
                    </label>
                    <Input
                      type="url"
                      value={newDeal.affiliateLink}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, affiliateLink: e.target.value }))}
                      placeholder="https://affiliate.example.com/deal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source
                    </label>
                    <Input
                      value={newDeal.source}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, source: e.target.value }))}
                      placeholder="Source name"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Add Deal
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowAllFields(false)
                      setFetchedData(null)
                      setNewDeal({
                        title: '',
                        url: '',
                        description: '',
                        affiliateLink: '',
                        source: 'Manual Entry'
                      })
                    }}
                  >
                    Start Over
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
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
{/* Links Management Section */}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Current Link (Original URL)
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="url"
                              value={pendingLinks[deal.Id]?.url !== undefined ? pendingLinks[deal.Id].url : deal.url}
                              onChange={(e) => handleLinkChange(deal.Id, 'url', e.target.value)}
                              placeholder="https://example.com/deal"
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(deal.url, '_blank')}
                              className="p-2"
                              title="Open Original Deal"
                            >
                              <ApperIcon name="ExternalLink" className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Affiliate Link
                          </label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="url"
                              value={pendingLinks[deal.Id]?.affiliateLink !== undefined ? pendingLinks[deal.Id].affiliateLink : (deal.affiliateLink || '')}
                              onChange={(e) => handleLinkChange(deal.Id, 'affiliateLink', e.target.value)}
                              placeholder="https://affiliate.example.com/deal..."
                              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                            />
                            {(deal.affiliateLink || pendingLinks[deal.Id]?.affiliateLink) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(pendingLinks[deal.Id]?.affiliateLink || deal.affiliateLink, '_blank')}
                                className="p-2"
                                title="Open Affiliate Link"
                              >
                                <ApperIcon name="ExternalLink" className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {editingLinks[deal.Id] && (
                          <div className="flex items-center space-x-2 pt-2">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleSaveLinks(deal.Id)}
                            >
                              <ApperIcon name="Save" className="w-4 h-4 mr-1" />
                              Save Links
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setEditingLinks(prev => ({ ...prev, [deal.Id]: false }))
                                setPendingLinks(prev => {
                                  const newState = { ...prev }
                                  delete newState[deal.Id]
                                  return newState
                                })
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

<div className="flex items-center space-x-2 ml-4 flex-shrink-0">
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