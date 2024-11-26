"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Trash2, UploadCloud } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        onChange(data.url)
      } catch (error) {
        console.error('Upload failed:', error)
      }
    }
  }, [onChange])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  })

  return (
    <div className={className}>
      {value ? (
        <div className="relative aspect-square">
          <Image
            src={value}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
          <button
            onClick={() => onChange("")}
            className="absolute bottom-0 right-0 p-1 bg-background rounded-full shadow"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-full aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-primary"
        >
          <input {...getInputProps()} />
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">Upload Photo</p>
        </div>
      )}
    </div>
  )
}
