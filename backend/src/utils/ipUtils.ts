import { Request } from 'express';

/**
 * Получает IP клиента
 */
export function getClientIP(req: Request): string {
  const forwardedFor = req.headers['x-forwarded-for'] as string;
  const realIP = req.headers['x-real-ip'] as string;
  const cfConnectingIP = req.headers['cf-connecting-ip'] as string;

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return req.socket.remoteAddress || 'unknown';
}

export function encryptIP(ip: string): string {
  return Buffer.from(ip).toString('base64');
}
