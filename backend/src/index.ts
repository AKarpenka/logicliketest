import express from 'express';
import cors from 'cors';
import compression from 'compression';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { userRegistrationMiddleware } from './middleware/userRegistration';
import { initializeDatabaseConfig } from './utils/databaseConfig';

// Инициализируем конфигурацию базы данных
initializeDatabaseConfig();

const app = express();
const PORT = process.env.PORT || 3000;

// сжатие для уменьшения размера передаваемых данных
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return compression.filter(req, res);
  }
}));

app.use(cors());
app.use(express.json());

app.use(userRegistrationMiddleware);

app.get('/', (req, res) => {
  res.json({ 
    message: 'LogicLike Test Backend is running',
    routes: ['/api/project-ideas/with-vote-status', '/api/project-ideas/:id/vote']
  });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
