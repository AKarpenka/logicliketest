import { Request, Response, NextFunction } from 'express';
import { getClientIP, encryptIP } from '../utils/ipUtils';
import { UserService } from '../services/userService';
import { IUser } from '../types';

const userService = new UserService();

/**
 * Middleware для автоматической регистрации пользователей по IP
 */
export function userRegistrationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const clientIP = getClientIP(req);
    const encryptedIP = encryptIP(clientIP);
    
    // Создаем или получаем пользователя
    userService.createOrGetUser(encryptedIP)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        console.error('Ошибка регистрации пользователя:', error);
        next();
      });
      
  } catch (error) {
    console.error(error);
    next();
  }
}

/**
 * Расширяем типы Express Request для добавления user
 * Это позволяет TypeScript знать о req.user в роутах
 */
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
