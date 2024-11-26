import { z } from "zod"

export const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string().url()
})

export const attachmentSchema = z.object({
  name: z.string(),
  url: z.string(),
  type: z.string()
})

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  avatar: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).optional(),
  attachments: z.array(attachmentSchema).optional()
})

export type ProfileFormData = z.infer<typeof profileSchema>