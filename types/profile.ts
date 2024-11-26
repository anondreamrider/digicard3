export interface SocialLink {
    id?: string
    platform: string
    url: string
  }
  
  export interface Attachment {
    id?: string
    name: string
    type: string
    url: string
  }
  
  export interface ProfileFormData {
    id?: string
    name: string
    profession?: string
    company?: string
    bio?: string
    email?: string
    phone?: string
    website?: string
    avatar?: string
    socialLinks: SocialLink[]
    attachments: Attachment[]
  }
  