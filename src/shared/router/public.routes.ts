// src/shared/router/public.routes.ts
import { Router } from 'express';
import { authRouter } from '../../modules/auth/auth.routes';

export const publicRouter = Router()

// tidak butuh token
publicRouter.use('/auth', authRouter)
