import React from 'react'
import { motion } from 'framer-motion'
import DealCard from '@/components/molecules/DealCard'

const DealSlider = ({ deals, currentIndex, onDealView, onExternalLink }) => {
  if (!deals || deals.length === 0) {
    return null
  }

  const currentDeal = deals[currentIndex]

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        key={currentDeal.Id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <DealCard
          deal={currentDeal}
          onView={() => onDealView(currentDeal)}
          onExternalLink={onExternalLink}
        />
      </motion.div>
    </div>
  )
}

export default DealSlider