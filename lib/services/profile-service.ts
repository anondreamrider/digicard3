import { prisma } from "@/lib/prisma"

export class ProfileService {
  static async getProfile(userId: string) {
    return await prisma.profile.findUnique({
      where: { userId }
    })
  }

  static async updateProfile(userId: string, data: any) {
    return await prisma.profile.upsert({
      where: { userId },
      update: {
        name: data.name,
        profession: data.profession,
        company: data.company,
        bio: data.bio,
        email: data.email,
        phone: data.phone,
        website: data.website,
        avatar: data.avatar,
        socialLinks: data.socialLinks,
        attachments: data.attachments
      },
      create: {
        userId,
        ...data
      }
    })
  }

  static async deleteProfile(userId: string) {
    return await prisma.profile.delete({
      where: { userId }
    })
  }
}