export const cmsMediaUrl = (url: string) => {
  const filename = url.split('/api/media/file/').pop()
  return filename ? `/cms-media/${filename}` : url
}
