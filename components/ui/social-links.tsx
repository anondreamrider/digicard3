"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const SOCIAL_PLATFORMS = [
  { value: 'github', label: 'GitHub', icon: 'github' },
  { value: 'twitter', label: 'Twitter', icon: 'twitter' },
  { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
  { value: 'instagram', label: 'Instagram', icon: 'instagram' },
  { value: 'facebook', label: 'Facebook', icon: 'facebook' }
]

interface SocialLinksProps {
  value: Array<{ platform: string; url: string }>
  onChange: (value: Array<{ platform: string; url: string }>) => void
}

export function SocialLinks({ value, onChange }: SocialLinksProps) {
  const addLink = () => {
    onChange([...value, { platform: '', url: '' }])
  }

  const removeLink = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateLink = (index: number, field: 'platform' | 'url', newValue: string) => {
    const newLinks = [...value]
    newLinks[index] = { ...newLinks[index], [field]: newValue }
    onChange(newLinks)
  }

  return (
    <div className="space-y-4">
      {value.map((link, index) => (
        <div key={index} className="flex gap-4">
          <Select
            value={link.platform}
            onValueChange={(newValue) => updateLink(index, 'platform', newValue)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {SOCIAL_PLATFORMS.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  <div className="flex items-center gap-2">
                    <i className={`fab fa-${platform.icon}`} />
                    {platform.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Profile URL"
            value={link.url}
            onChange={(e) => updateLink(index, 'url', e.target.value)}
            className="flex-1"
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeLink(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addLink}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Social Link
      </Button>
    </div>
  )
}
