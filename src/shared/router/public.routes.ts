// src/shared/router/public.routes.ts
import { Router } from 'express';

export const publicRouter = Router()

// tidak butuh token
// publicRouter.post('/auth/login',    authController.login)
// publicRouter.post('/auth/register', authController.register)
