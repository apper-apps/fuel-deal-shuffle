import React from 'react'
import { motion } from 'framer-motion'
import DealCard from '@/components/molecules/DealCard'

const ListView = ({ 
  deals, 
  onDealView, 
  onExternalLink, 
  className = '' 
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {deals.map((deal, index) => (
        <motion.div
          key={deal.Id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <DealCard
            deal={deal}
            onView={() => onDealView(deal)}
            onExternalLink={onExternalLink}
            variant="list"
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ListView