import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { profileId: string } }
) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: params.profileId },
      include: {
        socialLinks: true,
        attachments: true
      }
    })

    if (!profile) {
      return new NextResponse('Profile not found', { status: 404 })
    }

    // Remove sensitive information if needed
    const publicProfile = {
      ...profile,
      userId: undefined
    }

    return NextResponse.json(publicProfile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
