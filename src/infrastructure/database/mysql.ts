import * as env from "../../config/env"
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { logger } from "../logging";

const isDev = env.config.NODE_ENV === "development";

// use this if database using MYSQL/Mariadb
const adapterMysql = new PrismaMariaDb({ 
  host: env.config.DB_HOST,
  port: env.config.DB_PORT,
  user: env.config.DB_USER,
  password: env.config.DB_PASSWORD,
  database: env.config.DB_NAME,
})

export const prismaClientMysql = new PrismaClient({ 
    adapter: adapterMysql,
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

prismaClientMysql.$on("error", (e) => {
    logger.error({
        type: "error:prisma",
        message: e.message,
        target: e.target
    })
})

prismaClientMysql.$on("warn", (e) => {
  logger.warn({
    type: "prisma:warn",
    message: e.message
  })
})

prismaClientMysql.$on("info", (e) => {
  logger.info({
    type: "prisma:info",
    message: e.message
  })
})

prismaClientMysql.$on("query", (e) => {
  logger.debug({
    type: "prisma:query",
    query: e.query,
    params: e.params,
    duration: `${e.duration}ms`
  })
})