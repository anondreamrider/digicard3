import { writeFile } from 'fs/promises'
import path from 'path'

export async function saveLocalFile(file: Buffer, fileName: string) {
  try {
    // Create a unique filename
    const uniqueFileName = `${Date.now()}-${fileName}`
    // Set the upload directory path
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    // Full path for the file
    const filePath = path.join(uploadDir, uniqueFileName)
    
    // Write the file
    await writeFile(filePath, file)
    
    // Return the public URL
    return `/uploads/${uniqueFileName}`
  } catch (error) {
    console.error('Error saving file:', error)
    throw new Error('Failed to save file')
  }
}
