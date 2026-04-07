const VERCEL_BLOB_HOST = ".public.blob.vercel-storage.com";

export function isVercelBlobUrl(url: string | null | undefined) {
  if (!url) {
    return false;
  }

  return url.includes(VERCEL_BLOB_HOST);
}
