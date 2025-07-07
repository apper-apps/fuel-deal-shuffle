import { useState, useEffect } from 'react'
import { dealService } from '@/services/api/dealService'

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
    bulkUpdateDeals
  }
}