"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { QRCodeSVG } from "qrcode.react"

export default function BusinessCardPage() {
  const { toast } = useToast()
  const [name, setName] = useState("John Doe")
  const [title, setTitle] = useState("Software Developer")
  const [company, setCompany] = useState("Tech Corp")
  const [email, setEmail] = useState("john@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [website, setWebsite] = useState("https://johndoe.com")
  const [bio, setBio] = useState("Passionate about creating innovative solutions.")

  const handleSave = () => {
    // Here you would typically send this data to your backend
    console.log({ name, title, company, email, phone, website, bio })
    toast({
      title: "Business Card Updated",
      description: "Your digital business card has been successfully updated.",
    })
  }

  const cardData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${title}
ORG:${company}
EMAIL:${email}
TEL:${phone}
URL:${website}
NOTE:${bio}
END:VCARD`

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Digital Business Card</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Your Business Card</CardTitle>
            <CardDescription>Update your digital business card information</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>This is how your digital business card will look</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-lg">{title}</p>
              <p>{company}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{website}</p>
              <p className="mt-2">{bio}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">QR Code</h3>
              <QRCodeSVG value={cardData} size={200} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

