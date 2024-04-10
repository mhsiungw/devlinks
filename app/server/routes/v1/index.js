import { Router } from 'express';
import protect from '../../middlewares/protect.js';

import auth from './auth.js';
import profile from './profile.js';
import openProfile from './open_profile.js';

const router = Router();

router.use('/auth/', auth);
// router.use('/profile', protect, profile);
router.use('/profile', profile);
router.use('/open_profile', openProfile);
export default router;
