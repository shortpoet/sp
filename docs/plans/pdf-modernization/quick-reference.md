# PDF Modernization Quick Reference

## 🚀 Quick Start Commands

### Phase 1: Browser Print (Today!)

```bash
# 1. Create new branch
git checkout -b feature/pdf-modernization

# 2. Copy the new PDF utility
cp docs/pdf-modernization/PLAN.md .
# Extract the code from Step 1.2 in the plan

# 3. Install minimal dependencies
cd app
pnpm add -D jspdf-autotable  # Optional for better tables

# 4. Test locally
pnpm dev
# Navigate to /resume and test the print button
```

### Phase 2: Cloudflare Worker (Week 2)

```bash
# 1. Create Worker project
npm create cloudflare@latest -- pdf-worker
cd pdf-worker

# 2. Install dependencies
npm i -D @cloudflare/playwright unpdf pdf-lib

# 3. Copy Worker code from plan
# See Phase 2, Step 2.1 in PLAN.md

# 4. Test locally
npx wrangler dev --local

# 5. Deploy
npx wrangler deploy
```

## 📊 Comparison Matrix

| Feature | Current (html2canvas) | Phase 1 (Print) | Phase 2 (Worker) |
|---------|----------------------|-----------------|------------------|
| **File Size** | 10-20 MB | 100-200 KB | 100-300 KB |
| **Text Selection** | ❌ No | ✅ Yes | ✅ Yes |
| **Generation Time** | 3-5 sec | < 1 sec | 1-2 sec |
| **Cost** | $0 | $0 | ~$10/mo |
| **Quality** | Poor | Excellent | Perfect |
| **Fonts** | Pixelated | Native | Embedded |
| **Mobile Support** | Poor | Good | Excellent |
| **Offline** | ✅ Yes | ✅ Yes | ❌ No |

## 🔧 Configuration Files

### Print CSS (`app/public/print.css`)

```css
@page { 
  size: A4; 
  margin: 12mm;
}

@media print {
  * { 
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  .no-print { 
    display: none !important; 
  }
  
  h1, h2, h3, .section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

### Wrangler Configuration (`pdf-worker/wrangler.toml`)

```toml
name = "shortpoet-pdf"
main = "src/index.ts"
compatibility_date = "2025-09-07"

[browser]
binding = "BROWSER"

[[r2_buckets]]
binding = "PDF_STORAGE"
bucket_name = "shortpoet-pdfs"

[vars]
ALLOWED_ORIGINS = "https://shortpoet.com,http://localhost:8888"
```

## 🎯 Implementation Checklist

### Day 1 - Quick Win

- [ ] Backup current toPDF.js as toPDF.legacy.js
- [ ] Create new pdf.ts with browser print method
- [ ] Add print-optimized route/styles
- [ ] Update PDF button component
- [ ] Test print functionality
- [ ] Commit and push

### Week 1 - Phase 1 Complete

- [ ] Full browser print implementation
- [ ] Print route with auto-trigger
- [ ] Fallback to jsPDF.html()
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Deploy to staging

### Week 2 - Phase 2 Core

- [ ] Set up Cloudflare Worker
- [ ] Implement basic PDF generation
- [ ] Add R2 storage
- [ ] Frontend integration
- [ ] Error handling
- [ ] Deploy Worker

### Week 3 - Testing

- [ ] Unit tests for PDF utilities
- [ ] E2E tests for generation flow
- [ ] Performance benchmarks
- [ ] Visual regression tests
- [ ] Load testing Worker
- [ ] Fix identified issues

### Week 4 - Advanced Features

- [ ] AI summarization
- [ ] Translation support
- [ ] Watermarking
- [ ] Batch processing
- [ ] Analytics
- [ ] Documentation

## 🐛 Common Issues & Solutions

### Issue: Fonts not loading in print

**Solution**: Wait for fonts before printing

```javascript
await document.fonts.ready
```

### Issue: Worker timeout

**Solution**: Increase timeout and optimize

```typescript
// In wrangler.toml
[limits]
cpu_ms = 50  // Increase if needed
```

### Issue: CORS errors with Worker

**Solution**: Check allowed origins

```typescript
const allowedOrigins = env.ALLOWED_ORIGINS.split(',')
```

### Issue: Large HTML payload

**Solution**: Extract and send only necessary HTML

```javascript
const content = document.querySelector('#resume-content')
const cleaned = content.cloneNode(true)
// Remove unnecessary elements
cleaned.querySelectorAll('.no-print').forEach(el => el.remove())
```

## 📈 Monitoring & Metrics

### Key Metrics to Track

```typescript
// Add to Worker
const metrics = {
  generationTime: Date.now() - startTime,
  fileSize: pdf.byteLength,
  method: 'worker',
  errors: 0
}

// Log to Analytics
await env.ANALYTICS.writeDataPoint({
  blobs: ['pdf_generation'],
  doubles: [metrics.generationTime, metrics.fileSize]
})
```

### Success Metrics

- File size reduction: Target 95% (20MB → 200KB)
- Generation time: Target < 2 seconds
- Error rate: Target < 1%
- User satisfaction: Measure via feedback

## 🔗 Resources

### Documentation

- [Browser Print API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media)
- [Cloudflare Browser Rendering](https://developers.cloudflare.com/browser-rendering/)
- [Playwright PDF](https://playwright.dev/docs/api/class-page#page-pdf)
- [R2 Storage](https://developers.cloudflare.com/r2/)

### Example Implementations

- [Lazy Invoice](https://github.com/adamschwartz/lazy.invoice.workers.dev)
- [Text-to-PDF Worker](https://github.com/willswire/text-to-pdf)
- [PDF Summarizer](https://github.com/harshil1712/pdf-summarizer-r2-event-notification)

### Support

- Cloudflare Discord: #browser-rendering
- Stack Overflow: [cloudflare-workers] + [pdf]
- GitHub Issues: Track progress in your repo

## 💡 Pro Tips

1. **Start with Phase 1** - Get immediate 95% improvement
2. **Use feature flags** - Gradual rollout with fallback
3. **Monitor metrics** - Track file sizes and generation times
4. **Cache aggressively** - Use CDN for static PDFs
5. **Test on real devices** - Mobile PDF generation varies
6. **Keep it simple** - Don't over-engineer initially

## 🎉 Expected Outcomes

After implementation:

- ✅ 95% smaller file sizes
- ✅ Perfect text selection
- ✅ Searchable content
- ✅ Better accessibility
- ✅ Faster generation
- ✅ Professional quality
- ✅ Happy users!

---

*Remember: The journey from 20MB image-based PDFs to 200KB text-based PDFs starts with a single `window.print()` call!*
