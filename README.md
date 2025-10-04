# LogicLike Test
Демо деплой - https://logicliketest-front.vercel.app/

## Архитектура проекта

Приложение использует **монорепозиторий** архитектуру с разделением на frontend и backend:

```
logicLikeTest/
├── backend/          # Node.js + Express + Prisma (API Server)
│   ├── src/
│   │   ├── routes/     # HTTP маршруты
│   │   ├── services/   # Бизнес-логика
│   │   ├── middleware/ # доп мидлвары
│   │   ├── utils/      # Утилиты и конфигурация
│   │   └── types/      # типы
│   ├── prisma/         # Схема БД и миграции
│   └── package.json
├── frontend/         # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/ # Переиспользуемые компоненты
│   │   ├── features/   # Фичи
│   │   ├── hooks/      # Кастомные хуки
│   │   ├── services/   # API
│   │   └── types/      # типы
│   └── package.json
└── README.md
```

## База данных

Приложение поддерживает два варианта PostgreSQL:

1. **Neon** - Облачная PostgreSQL база данных
2. **Локальная PostgreSQL** - Локальная

### Конфигурация базы данных

Создайте файл `.env` в папке `backend/` по примеру `.env.example`:

```bash
# Выбор базы datos (true = Neon, false = локальная PostgreSQL)
DATABASE_USE_NEON=true

# Neon Database (облачная PostgreSQL)
NEON_DATABASE_URL="postgresql://username:password@hostname:5432/database?schema=public"

# Local PostgreSQL Database
LOCAL_DATABASE_URL="postgresql://postgres:password@localhost:5432/logiclike_local?schema=public"

# Server Configuration
PORT=3000
```

### Схема базы данных

```
users
├── id (String, PK)
├── user_ip (String, Unique) - зашифрованный IP
└── countVotes (Int) - количество голосов пользователя

project_ideas
├── id (String, PK)
├── title (String) - название идеи
├── description (String) - описание идеи
└── votes (Int) - количество голосов за эту идею

votes
├── id (String, PK)
├── userId (String, FK) → users.id
├── projectIdeaId (String, FK) → project_ideas.id
└── unique(userId, projectIdeaId) - уникальность голоса
```

## Установка и настройка

### Предварительные требования

- **Node.js** (версия 18+)
- **npm** или **yarn**
- **PostgreSQL** (локальная или Neon аккаунт)

### 1. Клонирование и установка

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd logicLikeTest

# Установите зависимости для backend
cd backend
npm install

# Установите зависимости для frontend
cd ../frontend
npm install
```

### 2. Настройка окружения

**Вариант A: Использование Neon (облачная база)**

1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. Создайте новую базу данных
3. Скопируйте connection string из панели
4. Настройте `.env`:

```bash
DATABASE_USE_NEON=true
NEON_DATABASE_URL="ваш_connection_string_neon"
```

**Вариант B: Локальная PostgreSQL**

1. Установите PostgreSQL локально
2. Создайте базу данных:

```bash
sudo -u postgres psql
CREATE DATABASE logiclike_local;
\q
```

3. Настройте `.env`:

```bash
DATABASE_USE_NEON=false
LOCAL_DATABASE_URL="postgresql://postgres:password@localhost:5432/logiclike_local"
```

**переменные окружения для frontend**

Создайте файл `.env` в папке `frontend/` по примеру `.env.example`.

### 3. Настройка базы данных

```bash
cd backend

# Быстрая настройка (миграции + seed)
npm run db:setup:neon    # для Neon
# или
npm run db:setup:local   # для локальной БД

# Пошаговая настройка
npm run db:generate      # генерация Prisma клиента
npm run db:migrate       # применение миграций
npm run db:seed          # заполнение тестовыми данными
```

### 4. Запуск приложения

```bash
# Запуск backend сервера
cd backend
npm run dev             # обычный режим

# Запуск frontend (в отдельном терминале)
cd frontend
npm run start
```

**Приложение будет доступно:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Доступные команды

### Backend команды

| Команда | Описание |
|---------|-----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run dev:neon` | Запуск с Neon базой данных |
| `npm run dev:local` | Запуск с локальной PostgreSQL |
| `npm run build` | Сборка TypeScript |
| `npm run start` | Запуск собранного сервера |
| `npm run db:migrate` | Применение миграций |
| `npm run db:migrate:reset` | Сброс и применение миграций |
| `npm run db:generate` | Генерация Prisma клиента |
| `npm run db:studio` | Открытие Prisma Studio |
| `npm run db:seed` | Заполнение БД тестовыми данными |
| `npm run db:setup:neon` | Полная настройка для Neon |
| `npm run db:setup:local` | Полная настройка для локальной БД |

### Frontend команды

| Команда | Описание |
|---------|-----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка production версии |
| `npm run preview` | Предварительный просмотр сборки |

## Технологии

### Backend Stack
- **Node.js** 18+ - Runtime environment
- **Express.js** 5.x - Web framework
- **TypeScript** 5.x - Static typing
- **Prisma** 6.x - Database ORM
- **PostgreSQL** - Основная база данных
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **compression** - Response compression

### Frontend Stack
- **React** 19.x - UI library
- **TypeScript** 5.x - Static typing
- **Vite** 5.x - Build tool + dev server
- **Ant Design** 5.x - UI component library
- **SCSS** - CSS preprocessor
- **React.memo** - Performance optimization

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Auto-restart backend
- **ts-node** - TypeScript execution

## API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Описание |
|--------|----------|-----------|
| `GET` | `/` | Проверка работы сервера |
| `GET` | `/project-ideas/with-vote-status` | Получить идеи со статусом голосования |
| `POST` | `/project-ideas/:id/vote` | Голосовать за идею |
