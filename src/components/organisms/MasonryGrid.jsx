import React from 'react'
import { motion } from 'framer-motion'
import DealCard from '@/components/molecules/DealCard'

const MasonryGrid = ({ 
  deals, 
  columns = 3, 
  onDealView, 
  onExternalLink, 
  className = '' 
}) => {
  const getColumnClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div className={`grid gap-6 ${getColumnClass()} ${className}`}>
      {deals.map((deal, index) => (
        <motion.div
          key={deal.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="break-inside-avoid"
        >
          <DealCard
            deal={deal}
            onView={() => onDealView(deal)}
            onExternalLink={onExternalLink}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default MasonryGrid