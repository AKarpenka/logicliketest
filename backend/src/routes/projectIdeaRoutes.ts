import { Router } from 'express';
import { ProjectIdeaService } from '../services/projectIdeaService';

const router = Router();
const projectIdeaService = new ProjectIdeaService();

router.get('/', async (req, res) => {
  try {
    const ideas = await projectIdeaService.getAllIdeas();

    return res.json(ideas);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch project ideas' });
  }
});

export default router;
