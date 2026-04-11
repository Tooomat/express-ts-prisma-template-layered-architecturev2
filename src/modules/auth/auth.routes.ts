import { Router } from 'express'
import { AuthController } from './auth.controller'
import { PrismaAuthRepository } from './auth.prisma'
import { prismaClientPg } from '../../infrastructure/database/postgres'
import { AuthService } from './auth.service'

const authRouter = Router()

const repo = new PrismaAuthRepository(prismaClientPg)
const service = new AuthService(repo)
const controller = new AuthController(service)

authRouter.post('/register', controller.register)

export { authRouter }