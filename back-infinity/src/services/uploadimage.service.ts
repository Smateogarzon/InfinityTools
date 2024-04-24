import { Storage } from '@google-cloud/storage';
import path from 'path';

export default async function main(
  fileBuffer,
  destFileName = 'filaesasas',
  generationMatchPrecondition = 0
) {
  const storage = new Storage({
    keyFilename: path.join(__dirname, '../../infinity-420816-ac9896629570.json'),
    projectId: process.env.project_id,
  });

  const PictureInfinity = storage.bucket('pictures_infinity');
  async function uploadFile() {
    const options = {
      destination: destFileName,
      contentType: 'image/svg+xml',
      preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
      public: true,
    };

    const [file] = await PictureInfinity.upload(fileBuffer, options);
    return file.publicUrl();
  }

  uploadFile().catch(console.error);
}
