export const getS3Url = (rawUrl: string | undefined): string => {
  if (!rawUrl) return "";
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) return rawUrl;
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL || "";
  const cleanedBucket = bucketUrl.endsWith("/") ? bucketUrl.slice(0, -1) : bucketUrl;
  const cleanedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return `${cleanedBucket}${cleanedPath}`;
};