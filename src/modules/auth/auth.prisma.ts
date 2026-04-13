import { prismaClientPg } from "../../infrastructure/database/postgres"
import { IAuthRepository } from "./auth.repository.interface" 
import { RegisterUserDTO } from "./auth.dto"
import { User } from "../../generated/prisma/client"

export class PrismaAuthRepository implements IAuthRepository {
  private prisma: typeof prismaClientPg
  constructor(prisma: typeof prismaClientPg) {
    this.prisma = prisma
  }

  async findById(id: string): Promise<Pick<User, 'id' | 'email'> | null> {
    return this.prisma.user.findUnique({
      where: { 
        id: id
      },
      select: {
        id: true,
        email: true
      }
    })
  }
  
  async findByEmail(email: string): Promise<Pick<User, 'id' | 'email'> | null> {
    return this.prisma.user.findUnique({
        where: { 
            email: email 
        },
        select: {
            id: true,
            email: true
        }
    })
  }

  async create(data: RegisterUserDTO): Promise<Pick<User, 'id' | 'email'>> {
    return this.prisma.user.create({
        data: data,
        select: {
          id: true,
          email: true
        }
    })
  }
}