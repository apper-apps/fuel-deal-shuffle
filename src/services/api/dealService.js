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
}

export const dealService = new DealService()