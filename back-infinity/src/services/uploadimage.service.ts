import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';

export default async function main(
  fileBuffer,
  destFileName,
  generationMatchPrecondition = 0
): Promise<string> {
  try {
    const storage = new Storage({
      keyFilename: process.env.CREDENTIALS,
    });
    const temporaryFilePath = `./src/utils/${fileBuffer.filename}`;

    const readStream = fileBuffer.createReadStream();

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(temporaryFilePath);
      readStream.pipe(writeStream);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });
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
