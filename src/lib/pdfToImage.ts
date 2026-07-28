import * as pdfjsLib from "pdfjs-dist"
import { createCanvas } from "canvas"

export interface PdfToImageResult {
  base64: string
  mimeType: 'image/png'
}

export async function pdfToBase64Image(pdfBuffer: Buffer): Promise<PdfToImageResult> {
  try {
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(pdfBuffer) })
    const pdf = await loadingTask.promise
    
    // Get page 1
    const page = await pdf.getPage(1)
    
    // Calculate scale for high quality (2x for 200 DPI equivalent)
    const scale = 2.0
    const viewport = page.getViewport({ scale })
    
    // Create canvas
    const canvas = createCanvas(viewport.width, viewport.height)
    const context = canvas.getContext('2d')
    
    // Render PDF page to canvas
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise
    
    // Convert canvas to PNG base64
    const imageBuffer = canvas.toBuffer('image/png')
    const base64 = imageBuffer.toString('base64')
    
    return {
      base64,
      mimeType: 'image/png'
    }
  } catch (error) {
    throw new Error(`Failed to convert PDF to image: ${error instanceof Error ? error.message : String(error)}`)
  }
}
