'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db'
import { ProfileFormData } from '@/types/profile'
import { auth } from '@clerk/nextjs/server'
import { nanoid } from 'nanoid'
import QRCode from 'qrcode'
import { put } from '@vercel/blob'

type SocialLink = {
  id?: string
  platform: string
  url: string
}

type Attachment = {
  id?: string
  name: string
  type: string
  url: string
}

type Profile = {
  id: string
  userId: string
  name: string
  profession: string
  company: string
  bio: string
  email: string
  phone: string
  website: string
  avatar: string
  shareLink: string
  qrCodeUrl: string
  socialLinks: SocialLink[]
  attachments: Attachment[]
  createdAt: Date
  updatedAt: Date
}

type ActionResult<T> = { success: true; data: T } | { success: false; error: string }

export async function createProfile(data: ProfileFormData): Promise<ActionResult<Profile>> {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    // Generate unique share link and QR code
    const shareId = nanoid(10)
    const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/p/${shareId}`
    const qrCodeDataUrl = await QRCode.toDataURL(shareLink)
    const qrCodeBlob = await fetch(qrCodeDataUrl).then(res => res.blob())
    const { url: qrCodeUrl } = await put(`qr-codes/${shareId}.png`, qrCodeBlob, {
      access: 'public',
      contentType: 'image/png'
    })

    // Create profile with relations
    const profile = await prisma.profile.create({
      data: {
        userId,
        name: data.name || '',
        profession: data.profession,
        company: data.company,
        bio: data.bio,
        email: data.email,
        phone: data.phone,
        website: data.website,
        avatar: data.avatar,
        shareLink,
        qrCodeUrl,
        socialLinks: {
          createMany: {
            data: data.socialLinks?.map(link => ({
              platform: link.platform,
              url: link.url
            })) || []
          }
        },
        attachments: {
          createMany: {
            data: data.attachments?.map(attachment => ({
              name: attachment.name,
              type: attachment.type,
              url: attachment.url
            })) || []
          }
        }
      },
      include: {
        socialLinks: true,
        attachments: true
      }
    })

    revalidatePath('/dashboard/profile')
    return { success: true, data: profile }
  } catch (error) {
    console.error('Failed to create profile:', error)
    return { success: false, error: 'Failed to create profile' }
  }
}

export async function updateProfile(profileId: string, data: ProfileFormData): Promise<ActionResult<Profile>> {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    // Verify ownership
    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { userId: true, shareLink: true, qrCodeUrl: true }
    })

    if (!existingProfile || existingProfile.userId !== userId) {
      throw new Error('Unauthorized')
    }

    // Generate share link and QR code if they don't exist
    let shareLink = existingProfile.shareLink
    let qrCodeUrl = existingProfile.qrCodeUrl

    if (!shareLink) {
      const shareId = nanoid(10)
      shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/p/${shareId}`
      const qrCodeDataUrl = await QRCode.toDataURL(shareLink)
      const qrCodeBlob = await fetch(qrCodeDataUrl).then(res => res.blob())
      const { url } = await put(`qr-codes/${shareId}.png`, qrCodeBlob, {
        access: 'public',
        contentType: 'image/png'
      })
      qrCodeUrl = url
    }

    // Update profile with new data
    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        name: data.name || '',
        profession: data.profession,
        company: data.company,
        bio: data.bio,
        email: data.email,
        phone: data.phone,
        website: data.website,
        avatar: data.avatar,
        shareLink,
        qrCodeUrl,
        socialLinks: {
          deleteMany: {},
          createMany: {
            data: data.socialLinks?.map(link => ({
              platform: link.platform,
              url: link.url
            })) || []
          }
        },
        attachments: {
          deleteMany: {},
          createMany: {
            data: data.attachments?.map(attachment => ({
              name: attachment.name,
              type: attachment.type,
              url: attachment.url
            })) || []
          }
        }
      },
      include: {
        socialLinks: true,
        attachments: true
      }
    })

    revalidatePath('/dashboard/profile')
    return { success: true, data: profile }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}

export async function getProfile(profileId: string): Promise<ActionResult<Profile>> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        socialLinks: true,
        attachments: true
      }
    })

    if (!profile || profile.userId !== userId) {
      throw new Error('Profile not found')
    }

    return { success: true, data: profile }
  } catch (error) {
    console.error('Error fetching profile:', error)
    return { success: false, error: 'Failed to fetch profile' }
  }
}

export async function deleteProfile(profileId: string): Promise<ActionResult<void>> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { userId: true }
    })

    if (!existingProfile || existingProfile.userId !== userId) {
      throw new Error('Unauthorized')
    }

    await prisma.profile.delete({
      where: { id: profileId }
    })

    revalidatePath('/dashboard/profile')
    return { success: true, data: undefined }
  } catch (error) {
    console.error('Error deleting profile:', error)
    return { success: false, error: 'Failed to delete profile' }
  }
}

export async function getUserProfiles(): Promise<ActionResult<Profile[]>> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const profiles = await prisma.profile.findMany({
      where: { userId },
      include: {
        socialLinks: true,
        attachments: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, data: profiles }
  } catch (error) {
    console.error('Error fetching user profiles:', error)
    return { success: false, error: 'Failed to fetch profiles' }
  }
}