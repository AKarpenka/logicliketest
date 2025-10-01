import { Router } from 'express';
import projectIdeaRoutes from './projectIdeaRoutes';

const router = Router();

router.use('/project-ideas', projectIdeaRoutes);

export default router;
