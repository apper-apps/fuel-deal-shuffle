export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    return 'Invalid date'
  }
}

export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0'
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  
  return `${text.substring(0, maxLength)}...`
}

export const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export const extractDomain = (url) => {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch (_) {
    return 'unknown'
  }
}

export const generateThumbnail = (url, width = 400, height = 200) => {
  const domain = extractDomain(url)
  return `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=${width}x${height}`
}