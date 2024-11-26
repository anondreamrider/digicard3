"use client"

import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { Button } from "./button"
import { useCallback } from "react"

interface FileUploadProps {
  value: any
  onChange: (value: any) => void
  accept?: string
  multiple?: boolean
}

export function FileUpload({ value, onChange, accept, multiple = false }: FileUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const formData = new FormData()
      acceptedFiles.forEach(file => {
        formData.append('file', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')
      
      const data = await response.json()
      onChange(multiple ? [...(value || []), ...data.urls] : data.url)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }, [onChange, multiple, value])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple
  })

  const removeFile = (indexToRemove: number) => {
    onChange(value.filter((_: any, index: number) => index !== indexToRemove))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop files here, or click to select files
        </p>
      </div>

      {multiple && value?.length > 0 && (
        <div className="grid gap-2">
          {value.map((file: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 