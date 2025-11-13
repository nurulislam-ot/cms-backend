export default function generateYoutubeEmbedUrl(youtube_url?: string) {
  if (!youtube_url) return youtube_url
  const url = new URL(youtube_url)
  const videoId = url.searchParams.get("v")
  if (!videoId) return youtube_url
  return `https://www.youtube.com/embed/${videoId}`
}
