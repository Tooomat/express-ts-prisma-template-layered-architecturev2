import * as env from "../../config/env"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../../generated/prisma/client";
import { logger } from "../logging";

const isDev = env.config.NODE_ENV === "development";
const connectionString = `${env.config.DATABASE_URL}`

// use this if database using POSTGRES
const adapterPg = new PrismaPg({ 
  connectionString: connectionString 
})

export const prismaClientPg = new PrismaClient({ 
    adapter: adapterPg,
    log: [ //apa saja yang dilog
        { 
            emit: 'event', 
            level: 'error' 
        },
        { 
            emit: 'event', 
            level: 'info' 
        },
        { 
            emit: 'event', 
            level: 'warn' 
        },
        ...(isDev ? [
            { 
                emit: 'event', 
                level: 'query' 
            } as const
        ] : [])
    ]
 })

prismaClientPg.$on("error", (e) => {
    logger.error({
        type: "error:prisma",
        message: e.message,
        target: e.target
    })
})

prismaClientPg.$on("warn", (e) => {
  logger.warn({
    type: "prisma:warn",
    message: e.message
  })
})

prismaClientPg.$on("info", (e) => {
  logger.info({
    type: "prisma:info",
    message: e.message
  })
})

prismaClientPg.$on("query", (e) => {
  logger.debug({
    type: "prisma:query",
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`
  })
})