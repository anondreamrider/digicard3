import { useState, useEffect } from 'react'
import { useToast } from './use-toast'

interface SocialLink {
  platform: string
  url: string
}

interface ProfileData {
  name: string
  profession: string
  company: string
  email: string
  phone: string
  website: string
  bio: string
  avatar: string | null
  socialLinks: SocialLink[]
  attachments: Array<{
    name: string
    url: string
    type: string
  }>
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (!response.ok) throw new Error('Failed to fetch profile')
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to update profile')
      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
      return false
    }
  }

  return { profile, loading, updateProfile }
} 