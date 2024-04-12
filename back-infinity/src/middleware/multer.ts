import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private upload = multer({ storage: multer.memoryStorage() }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'camaraDeComercio', maxCount: 1 },
    { name: 'certificadoBancario', maxCount: 1 },
    // Puedes agregar más objetos para manejar diferentes campos
  ]);
  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error al procesar archivos' });
      }
      if (err) {
        return res.status(500).json({ message: 'Error inesperado al procesar archivos' });
      }
      next();
    });
  }
}
