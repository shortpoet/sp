# Screen Recording to GIF Conversion Guide

Quick reference for converting macOS screen recordings to web-compatible GIFs for social media.

## Best Method: Palette-Optimized

For high-quality, web-compatible GIFs from screen recordings:

```bash
# Step 1: Generate custom color palette
ffmpeg -i "Screen Recording.mov" \
  -vf "fps=15,scale=232:226:flags=lanczos,palettegen" palette.png

# Step 2: Create GIF using custom palette
ffmpeg -i "Screen Recording.mov" -i palette.png \
  -lavfi "fps=15,scale=232:226:flags=lanczos [x]; [x][1:v] paletteuse" output.gif
```

## Why This Works Best

- **Custom palette**: Generated from actual video content vs generic 256 colors
- **Better quality**: Smooth color transitions and dithering
- **Web compatible**: Works on LinkedIn, Twitter, web platforms
- **Reasonable size**: Usually 400-600KB for 10-second recordings

## Size Expectations

- **.mov source**: ~370KB (not web-compatible)
- **Palette GIF**: ~500KB (best quality-to-compatibility ratio)
- **Generic optimization**: Often larger and worse quality

## Platform Limits

- LinkedIn: 5MB
- Twitter/X: 15MB
- Most platforms: 2-10MB

Your 500KB result is well under all limits.

## Alternative Quick Method

For simpler approach with decent results:

```bash
ffmpeg -i "Screen Recording.mov" -vf "fps=30" output.gif
```

## Notes

- Screen recordings optimize well due to limited colors and static content
- 15-30 fps is sufficient for UI demonstrations
- Don't over-optimize - palette method usually gives best web results
- File size increase for web compatibility is worthwhile trade-off