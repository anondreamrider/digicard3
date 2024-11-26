import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getProfileByShareLink } from "@/app/actions/profile"
import { ProfileData } from "@/types/profile"
import { Download, Mail, Phone, Globe } from 'lucide-react'

export default async function ProfilePreview({ params }: { params: { shareId: string } }) {
  const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/s/${params.shareId}`
  const result = await getProfileByShareLink(shareLink)

  if (!result.success || !result.data) {
    notFound()
  }

  const profile: ProfileData = result.data

  const generateVCard = () => {
    let vcard = "BEGIN:VCARD\nVERSION:3.0\n"
    vcard += `FN:${profile.name}\n`
    vcard += `TITLE:${profile.profession}\n`
    vcard += `ORG:${profile.company}\n`
    vcard += `EMAIL:${profile.email}\n`
    vcard += `TEL:${profile.phone}\n`
    vcard += `URL:${profile.website}\n`
    vcard += `NOTE:${profile.bio}\n`
    profile.socialLinks.forEach(link => {
      vcard += `X-SOCIALPROFILE;TYPE=${link.platform}:${link.url}\n`
    })
    vcard += "END:VCARD"
    
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${profile.name}.vcf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            {profile.avatar && (
              <div className="relative w-32 h-32">
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-lg text-muted-foreground">{profile.profession}</p>
              <p className="text-sm">{profile.company}</p>
            </div>

            <div className="w-full max-w-md space-y-2">
              {profile.bio && (
                <p className="text-sm text-center">{profile.bio}</p>
              )}

              <div className="flex flex-col space-y-2">
                {profile.email && (
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${profile.email}`} className="text-sm hover:underline">
                      {profile.email}
                    </a>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${profile.phone}`} className="text-sm hover:underline">
                      {profile.phone}
                    </a>
                  </div>
                )}

                {profile.website && (
                  <div className="flex items-center justify-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                {profile.socialLinks.map((link, index) => {
                  const SocialIcon = socialPlatforms.find(p => p.value === link.platform)?.icon || Globe
                  return (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      <SocialIcon className="w-6 h-6" />
                    </a>
                  )
                })}
              </div>

              {profile.attachments.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {profile.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 border rounded hover:bg-muted"
                      >
                        {attachment.type.startsWith('image/') ? (
                          <Image src={attachment.url} alt={attachment.name} width={40} height={40} className="object-cover rounded mr-2" />
                        ) : attachment.type.startsWith('video/') ? (
                          <Video className="w-10 h-10 text-blue-500 mr-2" />
                        ) : (
                          <Paperclip className="w-10 h-10 text-gray-500 mr-2" />
                        )}
                        <span className="text-sm truncate">{attachment.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6">
                <Button onClick={generateVCard} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Add to Contacts
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Powered by <a href="https://helo.dev" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">Helo</a>
      </div>
    </div>
  )
}

