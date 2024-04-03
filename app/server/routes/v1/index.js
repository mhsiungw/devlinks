import { Router } from 'express';
import protect from '../../middlewares/protect.js';

import auth from './auth.js';
import profile from './profile.js';

const router = Router();

router.use('/auth/', auth);
router.use('/profile', protect, profile);

export default router;
