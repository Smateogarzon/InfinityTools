import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';

export default async function uploadImage(
  fileBuffer,
  destFileName,
  generationMatchPrecondition = 0
): Promise<string> {
  try {
    const storage = new Storage({
      keyFilename: process.env.CREDENTIALS,
    });
    const temporaryFilePath = `./src/utils/${fileBuffer.filename}`;
    const dir = './src/utils';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const readStream = fileBuffer.createReadStream();

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(temporaryFilePath);
      readStream.pipe(writeStream);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });

    // Verificar si el archivo fue creado correctamente
    if (!fs.existsSync(temporaryFilePath)) {
      throw new Error(`El archivo temporal no fue creado: ${temporaryFilePath}`);
    }
    const PictureInfinity = storage.bucket('pictures_infinity');

    const options = {
      destination: destFileName,
      contentType: 'image/png',
      preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
      public: true,
    };

    const [file] = await PictureInfinity.upload(temporaryFilePath, options);
    await fs.promises.unlink(temporaryFilePath);
    return file.publicUrl();
  } catch (error) {
    return error;
  }
}

export async function verifyImage(imageUrl: string) {
  try {
    const storage = new Storage({
      keyFilename: process.env.CREDENTIALS,
    });
    const PictureInfinity = storage.bucket('pictures_infinity');
    const [exists] = await PictureInfinity.file(imageUrl).exists();
    if (exists) {
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
}
