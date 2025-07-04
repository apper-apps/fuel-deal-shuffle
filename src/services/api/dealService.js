import mockDeals from '@/services/mockData/deals.json'

class DealService {
  constructor() {
    this.deals = [...mockDeals]
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.deals])
      }, 300)
    })
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deal = this.deals.find(d => d.Id === id)
        if (deal) {
          resolve({ ...deal })
        } else {
          reject(new Error('Deal not found'))
        }
      }, 200)
    })
  }

  async create(deal) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDeal = {
          ...deal,
          Id: Math.max(...this.deals.map(d => d.Id), 0) + 1
        }
        this.deals.push(newDeal)
        resolve({ ...newDeal })
      }, 400)
    })
  }

  async update(id, updateData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.deals.findIndex(d => d.Id === id)
        if (index !== -1) {
          this.deals[index] = { ...this.deals[index], ...updateData }
          resolve({ ...this.deals[index] })
        } else {
          reject(new Error('Deal not found'))
        }
      }, 300)
    })
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.deals.findIndex(d => d.Id === id)
        if (index !== -1) {
          const deletedDeal = this.deals.splice(index, 1)[0]
          resolve({ ...deletedDeal })
        } else {
          reject(new Error('Deal not found'))
        }
      }, 250)
    })
}

  async updateAffiliateLink(id, affiliateLink) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.deals.findIndex(d => d.Id === id)
        if (index !== -1) {
          // Validate affiliate link format
          if (affiliateLink && !this.isValidUrl(affiliateLink)) {
            reject(new Error('Invalid affiliate link format'))
            return
          }
          
          this.deals[index] = { 
            ...this.deals[index], 
            affiliateLink: affiliateLink || '',
            updatedAt: new Date().toISOString()
          }
          resolve({ ...this.deals[index] })
        } else {
          reject(new Error('Deal not found'))
        }
      }, 200)
    })
  }

  async getRssStatus() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'active',
          lastFetch: new Date().toISOString(),
          nextScheduled: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          totalFetched: this.deals.length
        })
      }, 100)
    })
  }

  async updateRssSchedule(enabled, interval) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          enabled,
          interval,
          nextRun: enabled ? new Date(Date.now() + interval * 60 * 1000).toISOString() : null,
          updatedAt: new Date().toISOString()
        })
      }, 150)
    })
  }

  isValidUrl(string) {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  async searchDeals(query, filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.deals]
        
        if (query) {
          filtered = filtered.filter(deal => 
            deal.title.toLowerCase().includes(query.toLowerCase()) ||
            deal.description.toLowerCase().includes(query.toLowerCase())
          )
        }
        
        if (filters.source) {
          filtered = filtered.filter(deal => deal.source === filters.source)
        }
        
        if (filters.hasAffiliateLink !== undefined) {
          filtered = filtered.filter(deal => 
            filters.hasAffiliateLink ? deal.affiliateLink : !deal.affiliateLink
          )
        }
        
        resolve(filtered)
      }, 200)
    })
  }
}

export const dealService = new DealService()