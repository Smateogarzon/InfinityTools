import { Storage } from '@google-cloud/storage';

export default async function deleteImageFromGCS(imageUrl: string): Promise<boolean> {
  try {
    const storage = new Storage({
      keyFilename: process.env.CREDENTIALS,
    });

    const urlParts = imageUrl.split('/');

    if (urlParts.length < 3) {
      throw new Error('Invalid image URL format. Expected format: gs://bucket-name/path/to/file');
    }

    const bucketName = urlParts[3];
    console.log('🚀 ~ deleteImageFromGCS ~ bucketName:', bucketName);
    const filePath = decodeURIComponent(urlParts[4]);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);

    await file.delete();
    console.log(`Image deleted successfully: ${imageUrl}`);
    return true;
  } catch (error) {
    return false;
  }
}
