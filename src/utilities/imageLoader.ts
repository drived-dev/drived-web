'use client'

export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // If we're not in production, Cloudflare resizing won't be available
  if (process.env.NODE_ENV !== 'production') {
    return src
  }

  // Cloudflare Image Resizing: /cdn-cgi/image/<options>/<source-url>
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto']
  
  // For relative paths, we need to ensure they start with a single slash
  // but for the cdn-cgi path, it's /cdn-cgi/image/<options>/<source-url>
  // If src is /api/media/file/image.png, then it should be /cdn-cgi/image/.../api/media/file/image.png
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`

  return `/cdn-cgi/image/${params.join(',')}${normalizedSrc}`
}
