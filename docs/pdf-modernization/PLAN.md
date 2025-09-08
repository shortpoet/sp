# PDF Modernization Implementation Plan

> **📁 Source Context**: Migration from html2canvas/jsPDF to modern text-based PDF generation  
> **🎯 Current State**: Image-based PDFs with large file sizes and no text selection  
> **✅ Prerequisites**: Vue 3 app with existing PDF generation, Cloudflare account for Workers

## 🔄 **Comprehensive Implementation Plan: Text-Based PDF Generation**

### **Current State Analysis**

**Problems Identified:**
1. **Image-based PDFs**: html2canvas renders DOM as bitmap → large files (5-20MB+)
2. **No Text Selection**: Content is rasterized, not searchable or accessible
3. **Quality Issues**: Fonts render poorly, especially at different scales
4. **Font Loading Complexity**: Requires FontFaceObserver workarounds
5. **Performance**: Client-side rendering is slow and memory-intensive

**Current Implementation (`app/src/utils/toPDF.js`):**
- Uses html2canvas to capture DOM element as canvas
- Converts canvas to JPEG/PNG image
- Embeds image in PDF using jsPDF
- Multiple pagination attempts (paginate1-3) showing iteration struggles
- File sizes are excessive due to high-resolution scaling (scale: 5)

### **🎯 Implementation Strategy**

## Phase 1: Quick Win - Browser Print API (1 day)

**Immediate fix with minimal code changes - reduces file size by 90%+**

### Step 1.1: Create Print-Optimized Route

**Create `app/src/views/PDFPrint.vue`:**
```vue
<template>
  <div id="pdf-print-container">
    <!-- Your existing PDF content structure -->
    <component :is="pdfContent" v-bind="resumeData" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useResumeStore } from '@/stores/resume'

const route = useRoute()
const resumeStore = useResumeStore()

onMounted(async () => {
  // Load resume data
  await resumeStore.loadResumeData()
  
  // Auto-trigger print if query param present
  if (route.query.print === 'true') {
    setTimeout(() => window.print(), 500)
  }
})
</script>

<style>
/* Screen styles */
@media screen {
  #pdf-print-container {
    max-width: 210mm;
    margin: 0 auto;
    padding: 20px;
    background: white;
  }
}

/* Print styles */
@media print {
  @page {
    size: A4;
    margin: 12mm;
  }
  
  body {
    margin: 0;
    padding: 0;
  }
  
  #pdf-print-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  /* Ensure text stays black and backgrounds print */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  /* Hide UI elements */
  .no-print,
  nav,
  footer,
  .modal,
  .button-float {
    display: none !important;
  }
  
  /* Prevent page breaks inside elements */
  h1, h2, h3, h4, h5, h6,
  .experience-item,
  .education-item,
  .skill-group {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  /* Force page breaks where needed */
  .page-break {
    page-break-before: always;
    break-before: always;
  }
}
</style>
```

### Step 1.2: Update PDF Generation Utility

**Create `app/src/utils/pdf.ts`:**
```typescript
export interface PDFOptions {
  method: 'print' | 'worker' | 'jspdf-html'
  filename?: string
}

export class PDFGenerator {
  /**
   * Generate PDF using browser print dialog
   * Smallest file size, perfect text selection
   */
  static async generateViaPrint(targetElement?: string): Promise<void> {
    if (targetElement) {
      // Clone and print specific element
      const element = document.querySelector(targetElement)
      if (!element) throw new Error(`Element ${targetElement} not found`)
      
      const printWindow = window.open('', '_blank')
      if (!printWindow) throw new Error('Failed to open print window')
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Resume - Carlos Soriano</title>
          <link rel="stylesheet" href="/print.css">
          <style>
            ${this.getInlinePrintStyles()}
          </style>
        </head>
        <body>
          ${element.innerHTML}
        </body>
        </html>
      `)
      
      printWindow.document.close()
      
      // Wait for fonts and images
      await printWindow.document.fonts.ready
      
      setTimeout(() => {
        printWindow.focus()
        printWindow.print()
        printWindow.close()
      }, 250)
    } else {
      // Use dedicated print route
      window.open('/print?print=true', '_blank')
    }
  }
  
  /**
   * Fallback: Improved jsPDF with text (not image)
   */
  static async generateViaJsPDFHTML(targetElement: string): Promise<void> {
    const { jsPDF } = await import('jspdf')
    await import('jspdf-autotable') // For better table support
    
    const element = document.querySelector(targetElement)
    if (!element) throw new Error(`Element ${targetElement} not found`)
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    })
    
    // Use html() method instead of canvas approach
    await pdf.html(element as HTMLElement, {
      callback: (doc) => {
        doc.save(`Carlos_Soriano_Resume_${Date.now()}.pdf`)
      },
      x: 40,
      y: 40,
      width: 515, // A4 width in points minus margins
      windowWidth: 1024,
      html2canvas: {
        scale: 1, // Don't overscale
        useCORS: true,
        letterRendering: true
      },
      autoPaging: 'text' // Ensure text mode
    })
  }
  
  private static getInlinePrintStyles(): string {
    return `
      @page { size: A4; margin: 12mm; }
      body { 
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      h1 { 
        font-family: 'Saira Extra Condensed', Impact, sans-serif;
        color: #2c3e50;
        margin-bottom: 0.5em;
      }
      .section { margin-bottom: 2em; }
      .experience-item { 
        margin-bottom: 1.5em;
        break-inside: avoid;
      }
    `
  }
}

// Vue Composable
export function usePDF() {
  const isGenerating = ref(false)
  const error = ref<string | null>(null)
  
  const generatePDF = async (options: PDFOptions = { method: 'print' }) => {
    isGenerating.value = true
    error.value = null
    
    try {
      switch (options.method) {
        case 'print':
          await PDFGenerator.generateViaPrint()
          break
        case 'jspdf-html':
          await PDFGenerator.generateViaJsPDFHTML('#pdf-content')
          break
        case 'worker':
          // Phase 2 implementation
          throw new Error('Worker method not yet implemented')
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'PDF generation failed'
      console.error('PDF generation error:', err)
    } finally {
      isGenerating.value = false
    }
  }
  
  return {
    generatePDF,
    isGenerating: readonly(isGenerating),
    error: readonly(error)
  }
}
```

### Step 1.3: Update Vue Component

**Update PDF button component:**
```vue
<template>
  <div class="pdf-controls">
    <button 
      @click="generatePDF({ method: 'print' })"
      :disabled="isGenerating"
      class="pdf-button"
    >
      <i class="fas fa-file-pdf"></i>
      {{ isGenerating ? 'Generating...' : 'Download PDF' }}
    </button>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePDF } from '@/utils/pdf'

const { generatePDF, isGenerating, error } = usePDF()
</script>
```

---

## Phase 2: Cloudflare Workers with Browser Rendering (1 week)

**Production-ready solution with perfect fidelity and advanced features**

### Step 2.1: Create PDF Worker

**Initialize Worker project:**
```bash
npm create cloudflare@latest -- pdf-worker
cd pdf-worker
npm i -D @cloudflare/playwright
```

**`wrangler.toml`:**
```toml
name = "shortpoet-pdf"
main = "src/index.ts"
compatibility_date = "2025-09-07"

[browser]
binding = "BROWSER"

[[r2_buckets]]
binding = "PDF_STORAGE"
bucket_name = "shortpoet-pdfs"

[ai]
binding = "AI"

[vars]
ALLOWED_ORIGINS = "https://shortpoet.com,http://localhost:8888"
PDF_CACHE_DURATION = "3600"
```

**`src/index.ts`:**
```typescript
import { launch, type BrowserWorker } from '@cloudflare/playwright'
import { extractText, getDocumentProxy } from 'unpdf'

interface Env {
  BROWSER: BrowserWorker
  PDF_STORAGE: R2Bucket
  AI: Ai
  ALLOWED_ORIGINS: string
  PDF_CACHE_DURATION: string
}

interface PDFRequest {
  url?: string
  html?: string
  css?: string
  filename?: string
  options?: {
    format?: 'A4' | 'Letter'
    landscape?: boolean
    margin?: { top: string; right: string; bottom: string; left: string }
    displayHeaderFooter?: boolean
    headerTemplate?: string
    footerTemplate?: string
  }
  enrich?: {
    summarize?: boolean
    translate?: string
    watermark?: string
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // CORS handling
    const origin = request.headers.get('Origin')
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',')
    
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response('CORS error', { status: 403 })
    }
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    }
    
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }
    
    const url = new URL(request.url)
    
    // Route handling
    switch (url.pathname) {
      case '/generate':
        return handleGenerate(request, env, ctx, corsHeaders)
      case '/status':
        return handleStatus(request, env, corsHeaders)
      case '/download':
        return handleDownload(request, env, corsHeaders)
      default:
        return new Response('Not found', { status: 404, headers: corsHeaders })
    }
  },
}

async function handleGenerate(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  corsHeaders: Record<string, string>
): Promise<Response> {
  try {
    const body: PDFRequest = await request.json()
    
    // Generate unique ID
    const pdfId = crypto.randomUUID()
    const filename = body.filename || `resume-${Date.now()}.pdf`
    
    // Launch browser
    const browser = await launch(env.BROWSER)
    const page = await browser.newPage()
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1280, height: 720 })
    
    // Load content
    if (body.url) {
      await page.goto(body.url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      })
    } else if (body.html) {
      const fullHtml = createFullHTML(body.html, body.css)
      await page.setContent(fullHtml, { 
        waitUntil: 'networkidle' 
      })
    } else {
      throw new Error('Either url or html must be provided')
    }
    
    // Emulate print media
    await page.emulateMedia({ media: 'print' })
    
    // Wait for fonts
    await page.evaluateHandle(() => document.fonts.ready)
    
    // Generate PDF with options
    const pdfOptions = {
      format: body.options?.format || 'A4',
      landscape: body.options?.landscape || false,
      printBackground: true,
      margin: body.options?.margin || {
        top: '12mm',
        right: '12mm',
        bottom: '12mm',
        left: '12mm'
      },
      displayHeaderFooter: body.options?.displayHeaderFooter || false,
      headerTemplate: body.options?.headerTemplate || '',
      footerTemplate: body.options?.footerTemplate || generateFooterTemplate(),
    }
    
    const pdfBuffer = await page.pdf(pdfOptions)
    await browser.close()
    
    // Apply enrichments if requested
    let finalPdf = pdfBuffer
    
    if (body.enrich?.watermark) {
      finalPdf = await addWatermark(pdfBuffer, body.enrich.watermark)
    }
    
    // Store in R2
    const metadata: Record<string, string> = {
      filename,
      generated: new Date().toISOString(),
      size: String(finalPdf.byteLength),
    }
    
    // Add AI enrichments asynchronously
    if (body.enrich?.summarize || body.enrich?.translate) {
      ctx.waitUntil(
        enrichPDFWithAI(env, pdfId, finalPdf, body.enrich)
      )
    }
    
    await env.PDF_STORAGE.put(
      `pdfs/${pdfId}.pdf`,
      finalPdf,
      {
        httpMetadata: { contentType: 'application/pdf' },
        customMetadata: metadata,
      }
    )
    
    // Return response with download URL
    const downloadUrl = `${url.origin}/download?id=${pdfId}`
    
    return new Response(JSON.stringify({
      success: true,
      pdfId,
      downloadUrl,
      filename,
      size: finalPdf.byteLength,
      expiresIn: parseInt(env.PDF_CACHE_DURATION),
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
    
  } catch (error) {
    console.error('PDF generation error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'PDF generation failed',
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  }
}

async function handleDownload(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  const url = new URL(request.url)
  const pdfId = url.searchParams.get('id')
  
  if (!pdfId) {
    return new Response('Missing PDF ID', { status: 400, headers: corsHeaders })
  }
  
  const object = await env.PDF_STORAGE.get(`pdfs/${pdfId}.pdf`)
  
  if (!object) {
    return new Response('PDF not found', { status: 404, headers: corsHeaders })
  }
  
  const filename = object.customMetadata?.filename || 'document.pdf'
  
  return new Response(object.body, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': `public, max-age=${env.PDF_CACHE_DURATION}`,
    },
  })
}

function createFullHTML(html: string, css?: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        /* Print-specific styles */
        @media print {
          body { margin: 0; }
          .page-break { page-break-before: always; }
          .no-break { break-inside: avoid; }
        }
        
        /* Custom styles */
        ${css || ''}
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `
}

function generateFooterTemplate(): string {
  return `
    <div style="width: 100%; font-size: 10px; padding: 0 12mm; display: flex; justify-content: space-between;">
      <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      <span>Generated on <span class="date"></span></span>
    </div>
  `
}

async function enrichPDFWithAI(
  env: Env,
  pdfId: string,
  pdfBuffer: ArrayBuffer,
  options: { summarize?: boolean; translate?: string }
): Promise<void> {
  try {
    // Extract text from PDF
    const doc = await getDocumentProxy(new Uint8Array(pdfBuffer))
    const { text } = await extractText(doc, { mergePages: true })
    
    // Generate summary if requested
    if (options.summarize) {
      const summary = await env.AI.run(
        '@cf/facebook/bart-large-cnn',
        { input_text: text }
      )
      
      await env.PDF_STORAGE.put(
        `enrichments/${pdfId}.summary.txt`,
        summary.summary,
        {
          httpMetadata: { contentType: 'text/plain' },
        }
      )
    }
    
    // Translate if requested
    if (options.translate) {
      const translation = await env.AI.run(
        '@cf/meta/m2m100-1.2b',
        {
          text,
          source_lang: 'en',
          target_lang: options.translate,
        }
      )
      
      await env.PDF_STORAGE.put(
        `enrichments/${pdfId}.${options.translate}.txt`,
        translation.translated_text,
        {
          httpMetadata: { contentType: 'text/plain; charset=utf-8' },
        }
      )
    }
  } catch (error) {
    console.error('AI enrichment error:', error)
  }
}

async function addWatermark(
  pdfBuffer: ArrayBuffer,
  watermarkText: string
): Promise<ArrayBuffer> {
  // Implement using pdf-lib
  const { PDFDocument, rgb, degrees } = await import('pdf-lib')
  
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const pages = pdfDoc.getPages()
  
  for (const page of pages) {
    const { width, height } = page.getSize()
    
    page.drawText(watermarkText, {
      x: width / 2 - 100,
      y: height / 2,
      size: 50,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.3,
      rotate: degrees(45),
    })
  }
  
  return pdfDoc.save()
}
```

### Step 2.2: Frontend Integration

**Update `app/src/services/pdf.service.ts`:**
```typescript
interface WorkerPDFOptions {
  method?: 'url' | 'html'
  format?: 'A4' | 'Letter'
  landscape?: boolean
  watermark?: string
  summarize?: boolean
  translate?: string
}

export class PDFService {
  private static readonly WORKER_URL = import.meta.env.PROD
    ? 'https://shortpoet-pdf.workers.dev'
    : 'http://localhost:8787'
  
  static async generateViaWorker(
    options: WorkerPDFOptions = {}
  ): Promise<{ downloadUrl: string; pdfId: string }> {
    const payload: any = {
      filename: `Carlos_Soriano_Resume_${Date.now()}.pdf`,
      options: {
        format: options.format || 'A4',
        landscape: options.landscape || false,
        displayHeaderFooter: true,
      },
    }
    
    // Use URL method if on /print route
    if (window.location.pathname === '/print') {
      payload.url = window.location.href
    } else {
      // Extract HTML from current page
      const element = document.querySelector('#pdf-content')
      if (!element) throw new Error('PDF content element not found')
      
      payload.html = element.innerHTML
      payload.css = await this.extractCSS()
    }
    
    // Add enrichments
    if (options.watermark || options.summarize || options.translate) {
      payload.enrich = {
        watermark: options.watermark,
        summarize: options.summarize,
        translate: options.translate,
      }
    }
    
    const response = await fetch(`${this.WORKER_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    
    if (!response.ok) {
      throw new Error(`Worker error: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'PDF generation failed')
    }
    
    return {
      downloadUrl: result.downloadUrl,
      pdfId: result.pdfId,
    }
  }
  
  private static async extractCSS(): Promise<string> {
    // Extract relevant CSS from current page
    const styles: string[] = []
    
    // Get all stylesheets
    for (const sheet of document.styleSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules
        for (const rule of rules) {
          if (rule instanceof CSSStyleRule) {
            // Filter relevant selectors
            if (rule.selectorText?.includes('pdf') ||
                rule.selectorText?.includes('resume') ||
                rule.selectorText?.includes('print')) {
              styles.push(rule.cssText)
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheets will throw
        console.warn('Could not access stylesheet:', e)
      }
    }
    
    // Get computed styles from critical elements
    const criticalElements = [
      '#pdf-content',
      '.resume-header',
      '.experience-section',
      '.education-section',
      '.skills-section',
    ]
    
    for (const selector of criticalElements) {
      const element = document.querySelector(selector)
      if (element) {
        const computed = window.getComputedStyle(element)
        const important = [
          'font-family',
          'font-size',
          'line-height',
          'color',
          'margin',
          'padding',
        ]
        
        const rules = important
          .map(prop => `${prop}: ${computed.getPropertyValue(prop)}`)
          .join('; ')
        
        styles.push(`${selector} { ${rules} }`)
      }
    }
    
    return styles.join('\n')
  }
  
  static async downloadPDF(pdfId: string): Promise<void> {
    const url = `${this.WORKER_URL}/download?id=${pdfId}`
    
    // Create invisible link and trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = `resume-${Date.now()}.pdf`
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
```

### Step 2.3: Advanced Vue Component

**Create `app/src/components/PDFGenerator.vue`:**
```vue
<template>
  <div class="pdf-generator">
    <!-- Method Selection -->
    <div class="pdf-methods">
      <h3>Generate PDF</h3>
      
      <div class="method-cards">
        <!-- Quick Print Method -->
        <div class="method-card">
          <h4>Quick Print</h4>
          <p>Instant, smallest file size</p>
          <button 
            @click="generatePDF('print')"
            :disabled="isGenerating"
            class="btn btn-primary"
          >
            <i class="fas fa-print"></i> Print to PDF
          </button>
        </div>
        
        <!-- Cloud Rendering -->
        <div class="method-card">
          <h4>Cloud Rendering</h4>
          <p>Perfect quality, advanced features</p>
          <button 
            @click="showCloudOptions = true"
            :disabled="isGenerating"
            class="btn btn-primary"
          >
            <i class="fas fa-cloud"></i> Generate in Cloud
          </button>
        </div>
      </div>
    </div>
    
    <!-- Cloud Options Modal -->
    <Teleport to="body">
      <div v-if="showCloudOptions" class="modal-overlay" @click.self="showCloudOptions = false">
        <div class="modal-content">
          <h3>Cloud PDF Options</h3>
          
          <div class="options-form">
            <!-- Format -->
            <div class="form-group">
              <label>Page Format</label>
              <select v-model="cloudOptions.format">
                <option value="A4">A4</option>
                <option value="Letter">Letter (US)</option>
              </select>
            </div>
            
            <!-- Orientation -->
            <div class="form-group">
              <label>
                <input 
                  type="checkbox" 
                  v-model="cloudOptions.landscape"
                > Landscape orientation
              </label>
            </div>
            
            <!-- Watermark -->
            <div class="form-group">
              <label>Watermark (optional)</label>
              <input 
                type="text" 
                v-model="cloudOptions.watermark"
                placeholder="e.g., DRAFT, CONFIDENTIAL"
              >
            </div>
            
            <!-- AI Features -->
            <div class="form-group">
              <h4>AI Enhancements</h4>
              <label>
                <input 
                  type="checkbox" 
                  v-model="cloudOptions.summarize"
                > Generate AI summary
              </label>
              
              <label>
                Translate to:
                <select v-model="cloudOptions.translate">
                  <option value="">None</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                </select>
              </label>
            </div>
            
            <!-- Actions -->
            <div class="modal-actions">
              <button 
                @click="showCloudOptions = false"
                class="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                @click="generateCloudPDF"
                :disabled="isGenerating"
                class="btn btn-primary"
              >
                <span v-if="isGenerating">
                  <i class="fas fa-spinner fa-spin"></i> Generating...
                </span>
                <span v-else>
                  <i class="fas fa-file-pdf"></i> Generate PDF
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Status Messages -->
    <div v-if="statusMessage" class="status-message" :class="statusType">
      {{ statusMessage }}
      
      <div v-if="downloadUrl" class="download-section">
        <a 
          :href="downloadUrl"
          target="_blank"
          class="btn btn-success"
        >
          <i class="fas fa-download"></i> Download PDF
        </a>
        
        <button 
          @click="copyDownloadLink"
          class="btn btn-secondary"
        >
          <i class="fas fa-link"></i> Copy Link
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PDFGenerator } from '@/utils/pdf'
import { PDFService } from '@/services/pdf.service'

const isGenerating = ref(false)
const showCloudOptions = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error' | 'info'>('info')
const downloadUrl = ref('')

const cloudOptions = reactive({
  format: 'A4' as 'A4' | 'Letter',
  landscape: false,
  watermark: '',
  summarize: false,
  translate: '',
})

async function generatePDF(method: 'print' | 'cloud') {
  isGenerating.value = true
  statusMessage.value = ''
  downloadUrl.value = ''
  
  try {
    if (method === 'print') {
      await PDFGenerator.generateViaPrint()
      statusMessage.value = 'Print dialog opened. Select "Save as PDF" to download.'
      statusType.value = 'success'
    }
  } catch (error) {
    statusMessage.value = error instanceof Error ? error.message : 'Generation failed'
    statusType.value = 'error'
  } finally {
    isGenerating.value = false
  }
}

async function generateCloudPDF() {
  isGenerating.value = true
  statusMessage.value = 'Generating PDF in the cloud...'
  statusType.value = 'info'
  showCloudOptions.value = false
  
  try {
    const result = await PDFService.generateViaWorker({
      format: cloudOptions.format,
      landscape: cloudOptions.landscape,
      watermark: cloudOptions.watermark || undefined,
      summarize: cloudOptions.summarize,
      translate: cloudOptions.translate || undefined,
    })
    
    downloadUrl.value = result.downloadUrl
    statusMessage.value = 'PDF generated successfully!'
    statusType.value = 'success'
    
    // Auto-download
    await PDFService.downloadPDF(result.pdfId)
    
  } catch (error) {
    statusMessage.value = error instanceof Error ? error.message : 'Generation failed'
    statusType.value = 'error'
  } finally {
    isGenerating.value = false
  }
}

async function copyDownloadLink() {
  if (downloadUrl.value) {
    await navigator.clipboard.writeText(downloadUrl.value)
    statusMessage.value = 'Download link copied to clipboard!'
  }
}
</script>

<style scoped>
.pdf-generator {
  padding: 2rem;
}

.method-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.method-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: box-shadow 0.3s;
}

.method-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.method-card h4 {
  margin: 0 0 0.5rem;
  color: #333;
}

.method-card p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.options-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.status-message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  animation: slideIn 0.3s ease;
}

.status-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.download-section {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #545b62;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #218838;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

---

## Phase 3: Advanced Features & Optimization (2 weeks)

### 3.1: Performance Optimization with Durable Objects

**Create `src/browser-session.ts`:**
```typescript
export class BrowserSession {
  private browser: Browser | null = null
  private lastUsed: number = Date.now()
  private readonly IDLE_TIMEOUT = 60000 // 60 seconds
  
  constructor(
    private state: DurableObjectState,
    private env: Env
  ) {
    // Set up cleanup interval
    this.state.blockConcurrencyWhile(async () => {
      const alarm = await this.state.storage.getAlarm()
      if (!alarm) {
        await this.state.storage.setAlarm(Date.now() + this.IDLE_TIMEOUT)
      }
    })
  }
  
  async fetch(request: Request): Promise<Response> {
    const { launch } = await import('@cloudflare/playwright')
    
    // Reuse or create browser
    if (!this.browser) {
      this.browser = await launch(this.env.BROWSER)
    }
    
    this.lastUsed = Date.now()
    
    // Parse request
    const body = await request.json()
    
    // Create new page in existing browser
    const page = await this.browser.newPage()
    
    try {
      // Process PDF request...
      const pdf = await page.pdf(body.options)
      
      return new Response(pdf, {
        headers: { 'Content-Type': 'application/pdf' }
      })
    } finally {
      await page.close()
    }
  }
  
  async alarm(): Promise<void> {
    // Check if browser should be closed
    if (this.browser && Date.now() - this.lastUsed > this.IDLE_TIMEOUT) {
      await this.browser.close()
      this.browser = null
    }
    
    // Reset alarm
    await this.state.storage.setAlarm(Date.now() + this.IDLE_TIMEOUT)
  }
}
```

### 3.2: Queue-Based Processing for Batch Jobs

**Create `src/pdf-queue-handler.ts`:**
```typescript
interface PDFQueueMessage {
  id: string
  type: 'generate' | 'enrich' | 'merge'
  payload: any
  retries: number
  createdAt: string
}

export default {
  async queue(
    batch: MessageBatch<PDFQueueMessage>,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    // Process messages in parallel with concurrency limit
    const concurrency = 5
    const chunks = chunk(batch.messages, concurrency)
    
    for (const messageChunk of chunks) {
      await Promise.all(
        messageChunk.map(async (message) => {
          try {
            await processMessage(message, env)
            message.ack()
          } catch (error) {
            console.error(`Failed to process message ${message.id}:`, error)
            
            if (message.body.retries < 3) {
              // Retry with exponential backoff
              await message.retry({
                delaySeconds: Math.pow(2, message.body.retries) * 10
              })
            } else {
              // Dead letter queue
              await env.PDF_STORAGE.put(
                `failed/${message.body.id}.json`,
                JSON.stringify({
                  message: message.body,
                  error: error.message,
                  timestamp: new Date().toISOString()
                })
              )
              message.ack() // Remove from queue
            }
          }
        })
      )
    }
  }
}

async function processMessage(
  message: Message<PDFQueueMessage>,
  env: Env
): Promise<void> {
  const { type, payload } = message.body
  
  switch (type) {
    case 'generate':
      await generatePDFFromQueue(payload, env)
      break
    case 'enrich':
      await enrichPDFFromQueue(payload, env)
      break
    case 'merge':
      await mergePDFsFromQueue(payload, env)
      break
  }
}
```

### 3.3: Edge Caching for Frequent PDFs

**Add to Worker `src/index.ts`:**
```typescript
async function handleGenerateWithCache(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const cache = caches.default
  
  // Create cache key from request
  const cacheKey = new Request(
    request.url,
    {
      method: 'GET',
      headers: request.headers
    }
  )
  
  // Check cache
  const cached = await cache.match(cacheKey)
  if (cached) {
    return cached
  }
  
  // Generate PDF
  const response = await handleGenerate(request, env, ctx, {})
  
  // Cache successful responses
  if (response.ok) {
    const cacheResponse = response.clone()
    cacheResponse.headers.set('Cache-Control', `public, max-age=${env.PDF_CACHE_DURATION}`)
    ctx.waitUntil(cache.put(cacheKey, cacheResponse))
  }
  
  return response
}
```

---

## Migration Timeline

### Week 1: Phase 1 Implementation
- **Day 1**: Implement browser print method
- **Day 2-3**: Create print-optimized route and styles
- **Day 4**: Update Vue components
- **Day 5**: Testing and bug fixes

### Week 2: Phase 2 Development
- **Day 1-2**: Set up Cloudflare Worker project
- **Day 3-4**: Implement core PDF generation
- **Day 5-6**: Add AI enrichment features
- **Day 7**: Frontend integration

### Week 3: Testing & Deployment
- **Day 1-2**: Comprehensive testing
- **Day 3**: Performance optimization
- **Day 4**: Deploy to production
- **Day 5**: Monitor and fix issues

### Week 4: Advanced Features
- **Day 1-2**: Implement Durable Objects
- **Day 3-4**: Add queue processing
- **Day 5**: Documentation and training

---

## Cost Analysis

### Phase 1 (Browser Print)
- **Cost**: $0 (client-side only)
- **File Size**: ~100KB (95% reduction)
- **Quality**: Perfect text selection

### Phase 2 (Cloudflare Workers)
- **Workers**: Free tier includes 100,000 requests/day
- **Browser Rendering**: ~$5/month for 1,000 PDFs
- **R2 Storage**: $0.015/GB/month
- **AI**: $0.01 per 1,000 requests
- **Total**: ~$10-20/month for moderate usage

---

## Testing Strategy

### Unit Tests
```typescript
// app/tests/unit/pdf/pdf-generator.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { PDFGenerator } from '@/utils/pdf'

describe('PDFGenerator', () => {
  it('should open print dialog for print method', async () => {
    const printSpy = vi.spyOn(window, 'print')
    await PDFGenerator.generateViaPrint()
    expect(printSpy).toHaveBeenCalled()
  })
  
  it('should generate PDF via jsPDF HTML method', async () => {
    const element = document.createElement('div')
    element.id = 'test-pdf'
    element.innerHTML = '<h1>Test PDF</h1>'
    document.body.appendChild(element)
    
    const saveSpy = vi.fn()
    vi.mock('jspdf', () => ({
      jsPDF: vi.fn(() => ({
        html: vi.fn((el, options) => {
          options.callback({ save: saveSpy })
        })
      }))
    }))
    
    await PDFGenerator.generateViaJsPDFHTML('#test-pdf')
    expect(saveSpy).toHaveBeenCalled()
  })
})
```

### E2E Tests
```typescript
// app/tests/e2e/pdf-generation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('PDF Generation', () => {
  test('should generate PDF via print method', async ({ page }) => {
    await page.goto('/resume')
    
    // Mock print dialog
    await page.evaluate(() => {
      window.print = () => {
        window.printCalled = true
      }
    })
    
    await page.click('button:has-text("Download PDF")')
    
    const printCalled = await page.evaluate(() => window.printCalled)
    expect(printCalled).toBe(true)
  })
  
  test('should generate PDF via Worker', async ({ page }) => {
    await page.goto('/resume')
    
    // Intercept Worker request
    await page.route('**/pdf-worker/generate', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          pdfId: 'test-123',
          downloadUrl: 'https://example.com/pdf/test-123'
        })
      })
    })
    
    await page.click('button:has-text("Generate in Cloud")')
    await page.click('button:has-text("Generate PDF")')
    
    await expect(page.locator('.status-message.success')).toBeVisible()
  })
})
```

---

## Monitoring & Analytics

### Performance Metrics
```typescript
// Add to Worker
async function trackMetrics(
  env: Env,
  metrics: {
    duration: number
    fileSize: number
    method: string
    success: boolean
  }
): Promise<void> {
  await env.ANALYTICS.writeDataPoint({
    blobs: [
      'pdf_generation',
      metrics.method,
      metrics.success ? 'success' : 'failure'
    ],
    doubles: [
      metrics.duration,
      metrics.fileSize
    ],
    indexes: ['pdf_metrics']
  })
}
```

### Error Tracking
```typescript
// Add to Worker
async function logError(
  env: Env,
  error: Error,
  context: Record<string, any>
): Promise<void> {
  await env.ERROR_LOG.put(
    `errors/${Date.now()}-${crypto.randomUUID()}.json`,
    JSON.stringify({
      error: {
        message: error.message,
        stack: error.stack
      },
      context,
      timestamp: new Date().toISOString()
    })
  )
}
```

---

## Rollback Plan

### Phase 1 Rollback
1. Keep original `toPDF.js` as `toPDF.legacy.js`
2. Add feature flag: `VUE_APP_USE_LEGACY_PDF`
3. Toggle in `.env` if issues arise

### Phase 2 Rollback
1. Maintain Worker versioning with Wrangler
2. Use gradual rollout with `compatibility_flags`
3. Implement circuit breaker pattern

```typescript
// Fallback to legacy method
async function generatePDFWithFallback() {
  try {
    // Try new method
    return await PDFService.generateViaWorker()
  } catch (error) {
    console.error('Worker PDF failed, falling back to legacy', error)
    // Fall back to legacy
    return await legacyToPDF()
  }
}
```

---

## Documentation Updates

### User Documentation
1. Update user guide with new PDF options
2. Create video tutorial for cloud features
3. Add FAQ for common issues

### Developer Documentation
1. API documentation for Worker endpoints
2. Architecture diagrams
3. Troubleshooting guide

---

## Success Metrics

### Target Improvements
- **File Size**: 95% reduction (20MB → 200KB)
- **Generation Time**: 50% faster
- **Text Selection**: 100% selectable text
- **Accessibility**: WCAG 2.1 AA compliant
- **User Satisfaction**: Measure via feedback form

### KPIs to Track
1. Average PDF file size
2. Generation success rate
3. Time to generate
4. User adoption rate
5. Error rate

---

## Conclusion

This comprehensive plan provides:

1. **Immediate Solution** (Phase 1): Browser print method for instant improvement
2. **Production Solution** (Phase 2): Cloudflare Workers for perfect quality
3. **Advanced Features** (Phase 3): AI enrichment, caching, and optimization

The migration path is incremental, allowing you to see immediate benefits while building toward a full-featured solution. Start with Phase 1 today to reduce file sizes by 95%, then progressively add cloud features for the ultimate PDF generation experience.