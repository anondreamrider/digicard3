import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { saveLocalFile } from "@/lib/local-storage"
import { mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const formData = await req.formData()
    const files = formData.getAll('file')
    
    const uploadPromises = files.map(async (file: any) => {
      const buffer = Buffer.from(await file.arrayBuffer())
      const url = await saveLocalFile(buffer, file.name)
      
      return {
        name: file.name,
        url: url,
        type: file.type
      }
    })

    const uploadedFiles = await Promise.all(uploadPromises)

    return NextResponse.json({
      urls: uploadedFiles,
      url: uploadedFiles[0]?.url // For single file uploads
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
} 