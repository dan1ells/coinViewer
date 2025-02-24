/* eslint-disable @typescript-eslint/await-thenable */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization)
      return res.json({ message: 'Você deve efetuar login' });

    const [, token] = req.headers.authorization.split(' ');

    try {
      const jwtSecret = process.env.JWT_SECRET || '';
      await jwt.verify(token, jwtSecret.toString());

      next();
    } catch (error) {
      throw new HttpException('Sessão expirada', HttpStatus.UNAUTHORIZED);
      console.log(error);
    }
  }
}
