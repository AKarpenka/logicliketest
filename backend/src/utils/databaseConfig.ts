import dotenv from 'dotenv';

dotenv.config();

/**
 * Утилита для автоматического выбора базы данных
 */
export class DatabaseConfig {
  private static instance: DatabaseConfig;
  private databaseUrl: string;

  private constructor() {
    const useNeon = process.env.DATABASE_USE_NEON === 'true';
    
    if (useNeon) {
      this.databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || '';
      
      if (!this.databaseUrl) {
        throw new Error('NEON_DATABASE_URL или DATABASE_URL должны быть установлены для Neon базы данных');
      }
      
      console.log('Используется Neon облачная база данных');
    } else {
      this.databaseUrl = process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL || '';
      
      if (!this.databaseUrl) {
        throw new Error('LOCAL_DATABASE_URL или DATABASE_URL должны быть установлены для локальной базы данных');
      }
      
      console.log('Используется локальная PostgreSQL база данных');
    }

    process.env.DATABASE_URL = this.databaseUrl;
  }

  /**
   * Singleton для получения конфигурации базы данных
   */
  public static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }
}

/**
 * Функция для инициализации конфигурации базы данных
 * Вызывается в начале приложения
 */
export function initializeDatabaseConfig(): void {
  try {
    DatabaseConfig.getInstance(); 
  } catch (error) {
    console.error('Ошибка инициализации конфигурации базы danych:', error);

    process.exit(1);
  }
}
