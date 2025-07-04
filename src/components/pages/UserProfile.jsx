import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    bio: 'Deal enthusiast and bargain hunter',
    location: 'New York, NY',
    website: 'https://johndoe.com'
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    dealAlerts: true,
    weeklyDigest: false,
    publicProfile: true
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    toast.success('Profile updated successfully')
    setIsEditing(false)
  }

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }))
    toast.success('Setting updated')
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.success('Account deletion initiated')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-purple-600 transition-colors">
              <ApperIcon name="Camera" className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-secondary mb-1">
              {profile.name}
            </h1>
            <p className="text-gray-600 mb-2">{profile.email}</p>
            <p className="text-sm text-gray-500">{profile.bio}</p>
          </div>
          <Button
            variant={isEditing ? 'accent' : 'secondary'}
            onClick={() => setIsEditing(!isEditing)}
          >
            <ApperIcon name={isEditing ? 'Save' : 'Edit'} className="w-4 h-4 mr-2" />
            {isEditing ? 'Save' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-display text-xl font-semibold text-secondary mb-6">
          Profile Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            disabled={!isEditing}
          />
          
          <FormField
            label="Email Address"
            value={profile.email}
            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
            type="email"
            disabled={!isEditing}
          />
          
          <FormField
            label="Location"
            value={profile.location}
            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
            disabled={!isEditing}
          />
          
          <FormField
            label="Website"
            value={profile.website}
            onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
            type="url"
            disabled={!isEditing}
          />
        </div>

        <div className="mt-6">
          <FormField
            label="Bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            type="textarea"
            rows={3}
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-display text-xl font-semibold text-secondary mb-6">
          Notification Settings
        </h2>
        
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <h3 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h3>
                <p className="text-sm text-gray-500">
                  {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                  {key === 'dealAlerts' && 'Get notified when new deals match your interests'}
                  {key === 'weeklyDigest' && 'Receive a weekly summary of top deals'}
                  {key === 'publicProfile' && 'Make your profile visible to other users'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-surface rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="font-display text-xl font-semibold text-secondary mb-6">
          Account Actions
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-500">Download all your data in JSON format</p>
            </div>
            <Button variant="secondary">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <h3 className="font-medium text-red-600">Delete Account</h3>
              <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger" onClick={handleDeleteAccount}>
              <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile