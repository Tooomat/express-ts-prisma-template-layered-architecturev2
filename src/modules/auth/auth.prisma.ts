import { prismaClientPg } from "../../infrastructure/database/postgres"
import { prismaClientMysql } from "../../infrastructure/database/mysql"
import { AuthRepository } from "./auth.repository" 
import { RegisterUserDTO } from "./auth.dto"
import { User } from "../../generated/prisma/client"

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: typeof prismaClientPg | typeof prismaClientMysql) {
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

  async create(data: RegisterUserDTO): Promise<Pick<User, 'id'>> {
    return this.prisma.user.create({
        data: data,
        select: {
          id: true,
          email: true
        }
    })
  }
}