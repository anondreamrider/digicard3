"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Copy, Download } from 'lucide-react'

interface ProfileShareProps {
  shareLink: string
  qrCodeUrl: string
}

export function ProfileShare({ shareLink, qrCodeUrl }: ProfileShareProps) {
  const { toast } = useToast()

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(shareLink)
    toast({
      title: "Copied!",
      description: "Share link copied to clipboard"
    })
  }

  const downloadQR = () => {
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = 'qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Share Link</h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={shareLink} 
              readOnly 
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button onClick={copyShareLink} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">QR Code</h3>
          <div className="flex flex-col items-center gap-4">
            <Image 
              src={qrCodeUrl} 
              alt="Profile QR Code" 
              width={200} 
              height={200} 
              className="border rounded-lg"
            />
            <Button onClick={downloadQR} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
