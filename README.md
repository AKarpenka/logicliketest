# LogicLike Test

## Архитектура

```
backend/          # Node.js + Express + Prisma
frontend/         # React + TypeScript + Vite
```

## Быстрый старт

### 1. Установка зависимостей

```bash
# Backend
cd backend
npm install

# Frontend  
cd frontend
npm install
```

### 2. Настройка базы данных

```bash
cd backend

# Генерация Prisma клиента
npm run db:generate

# Применение миграций
npm run db:migrate

# Заполнение начальными данными
npm run db:seed
```

### 3. Запуск приложения

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

## Структура проекта

### Backend
- **Express** сервер с REST API
- **Prisma** ORM для работы с PostgreSQL
- **TypeScript** для типобезопасности
- **Модульная архитектура** (routes, services, middleware)

### Frontend
- **React 19** с TypeScript
- **Ant Design** для UI компонентов
- **SCSS модули** для стилей
- **Кастомные хуки** для логики

## API

- **Base URL**: `http://localhost:3000`
- **Endpoint**: `GET /project-ideas` - получить все идеи
