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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate required fields
        if (!deal.title || !deal.url || !deal.description) {
          reject(new Error('Missing required fields: title, url, and description are required'))
          return
        }

        // Validate URL format
        if (!this.isValidUrl(deal.url)) {
          reject(new Error('Invalid URL format'))
          return
        }

        // Validate affiliate link if provided
        if (deal.affiliateLink && !this.isValidUrl(deal.affiliateLink)) {
          reject(new Error('Invalid affiliate link format'))
          return
        }

        const newDeal = {
          ...deal,
          Id: Math.max(...this.deals.map(d => d.Id), 0) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
      const url = new URL(string)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch (_) {
      return false
    }
  }

  async fetchUrlData(url) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.isValidUrl(url)) {
          reject(new Error('Invalid URL format'))
          return
        }

        // Simulate URL parsing and data extraction
        const domain = new URL(url).hostname
        const mockData = {
          title: this.generateTitleFromUrl(url),
          description: this.generateDescriptionFromUrl(url),
          source: this.getSourceFromDomain(domain),
          thumbnail: `https://images.unsplash.com/photo-${Date.now() % 1000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
          affiliateLink: ''
        }

        resolve(mockData)
      }, 1000) // Simulate network delay
    })
  }

  generateTitleFromUrl(url) {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    
    // Extract potential title from URL path
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1]
      return lastSegment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace(/\.(html|php|asp|jsp)$/i, '')
    }
    
    return `Deal from ${urlObj.hostname}`
  }

  generateDescriptionFromUrl(url) {
    const urlObj = new URL(url)
    const domain = urlObj.hostname
    
    // Generate description based on domain patterns
    if (domain.includes('amazon')) {
      return 'Great product deal with fast shipping and reliable customer service.'
    } else if (domain.includes('ebay')) {
      return 'Auction or buy-it-now deal with competitive pricing.'
    } else if (domain.includes('walmart') || domain.includes('target')) {
      return 'Retail deal with store pickup or delivery options available.'
    } else {
      return `Exclusive deal found on ${domain}. Check it out for limited-time savings.`
    }
  }

  getSourceFromDomain(domain) {
    if (domain.includes('amazon')) return 'Amazon'
    if (domain.includes('ebay')) return 'eBay'
    if (domain.includes('walmart')) return 'Walmart'
    if (domain.includes('target')) return 'Target'
    if (domain.includes('bestbuy')) return 'Best Buy'
    
    // Extract main domain name
    const parts = domain.split('.')
    const mainDomain = parts.length > 2 ? parts[parts.length - 2] : parts[0]
    return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1)
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