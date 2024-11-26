"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProfile } from "@/app/actions/profile"
import { ProfileData } from "@/types/profile"
import { Copy, Download } from 'lucide-react'

export default function SharePage({ params }: { params: { profileId: string } }) {
  const { toast } = useToast()
  const [profile, setProfile] = useState<ProfileData | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const result = await getProfile(params.profileId)
      if (result.success && result.data) {
        setProfile(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive"
        })
      }
    }
    loadProfile()
  }, [params.profileId, toast])

  const copyShareLink = () => {
    if (profile?.shareLink) {
      navigator.clipboard.writeText(profile.shareLink)
      toast({
        title: "Success",
        description: "Share link copied to clipboard"
      })
    }
  }

  const downloadQRCode = () => {
    if (profile?.qrCodeUrl) {
      const link = document.createElement('a')
      link.href = profile.qrCodeUrl
      link.download = 'qr-code.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Share Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Share Options</CardTitle>
          <CardDescription>Share your profile link or QR code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Share Link</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={profile.shareLink}
                readOnly
                className="flex-grow p-2 border rounded"
              />
              <Button onClick={copyShareLink} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">QR Code</h3>
            <div className="flex flex-col items-center space-y-2">
              <Image src={profile.qrCodeUrl} alt="QR Code" width={200} height={200} />
              <Button onClick={downloadQRCode} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

