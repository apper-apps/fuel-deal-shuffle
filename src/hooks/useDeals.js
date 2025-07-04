import { useState, useEffect } from 'react'
import { dealService } from '@/services/api/dealService'

export const useDeals = () => {
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return {
    deals,
    loading,
    error,
    loadDeals,
    createDeal,
    updateDeal,
    deleteDeal
  }
}