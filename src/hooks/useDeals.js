import { useEffect, useState } from "react";
import Error from "@/components/ui/Error";
import { dealService } from "@/services/api/dealService";

export const useDeals = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rssSchedule, setRssSchedule] = useState({
    enabled: false,
    interval: 60,
    lastRun: null,
    status: 'idle'
  })
const loadDeals = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await dealService.getAll()
      setDeals(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading deals:', err)
    } finally {
      setLoading(false)
    }
  }

  const createDeal = async (dealData) => {
    try {
      const newDeal = await dealService.create(dealData)
      setDeals(prevDeals => [...prevDeals, newDeal])
      return newDeal
    } catch (err) {
      throw new Error('Failed to create deal')
    }
  }

  const updateDeal = async (id, updateData) => {
    try {
      const updatedDeal = await dealService.update(id, updateData)
      setDeals(prevDeals => 
        prevDeals.map(deal => deal.Id === id ? updatedDeal : deal)
      )
      return updatedDeal
    } catch (err) {
      throw new Error('Failed to update deal')
    }
  }

  const deleteDeal = async (id) => {
    try {
      await dealService.delete(id)
      setDeals(prevDeals => prevDeals.filter(deal => deal.Id !== id))
    } catch (err) {
      throw new Error('Failed to delete deal')
    }
  }

  useEffect(() => {
    loadDeals()
  }, [])

const toggleRssSchedule = (enabled, interval = 60) => {
    setRssSchedule(prev => ({
      ...prev,
      enabled,
      interval,
      status: enabled ? 'scheduled' : 'idle'
    }))
  }

  const updateRssStatus = (status, lastRun = null) => {
    setRssSchedule(prev => ({
      ...prev,
      status,
      lastRun: lastRun || new Date()
    }))
  }

  const updateAffiliateLink = async (id, affiliateLink) => {
    try {
      const updatedDeal = await dealService.updateAffiliateLink(id, affiliateLink)
      setDeals(prevDeals => 
        prevDeals.map(deal => deal.Id === id ? updatedDeal : deal)
      )
      return updatedDeal
    } catch (err) {
      throw new Error('Failed to update affiliate link')
    }
  }

  const bulkUpdateDeals = async (dealIds, updateData) => {
    try {
      const promises = dealIds.map(id => dealService.update(id, updateData))
      const updatedDeals = await Promise.all(promises)
      
      setDeals(prevDeals => 
        prevDeals.map(deal => {
          const updated = updatedDeals.find(u => u.Id === deal.Id)
          return updated || deal
        })
      )
      return updatedDeals
    } catch (err) {
      throw new Error('Failed to bulk update deals')
    }
}

const parseUrlForDealInfo = async (url) => {
    try {
      // Use the enhanced dealService.fetchUrlData method
      const parsedData = await dealService.fetchUrlData(url)
      return parsedData
    } catch (err) {
      throw new Error('Failed to parse URL')
    }
  }

  return {
    deals,
    loading,
    error,
    rssSchedule,
    loadDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    toggleRssSchedule,
    updateRssStatus,
    updateAffiliateLink,
    bulkUpdateDeals,
parseUrlForDealInfo,
    sortDeals,
    filterDeals,
    getCategories
  }
}

// Utility functions for sorting and filtering
const sortDeals = (deals, sortBy) => {
  const sorted = [...deals]
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.fetchedAt) - new Date(a.fetchedAt))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.fetchedAt) - new Date(b.fetchedAt))
    case 'featured':
      return sorted.sort((a, b) => {
        // Featured deals are those with affiliate links, higher view counts, or specific sources
        const aFeatured = (a.affiliateLink ? 1 : 0) + (a.viewCount || 0) * 0.01
        const bFeatured = (b.affiliateLink ? 1 : 0) + (b.viewCount || 0) * 0.01
        return bFeatured - aFeatured
      })
    default:
      return sorted
  }
}

const filterDeals = (deals, category) => {
  if (category === 'all') return deals
  return deals.filter(deal => deal.source === category)
}

const getCategories = (deals) => {
  const categories = [...new Set(deals.map(deal => deal.source).filter(Boolean))]
  return categories.sort()
}