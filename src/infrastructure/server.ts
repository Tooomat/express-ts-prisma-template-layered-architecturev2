import express from "express"
import cookieParser from "cookie-parser";
import path from "path";
import { config } from "../config/env";
import { 
    corsGuard, 
    helmetGuard, 
    hppMiddleware,
    xssProtection
} from "../shared/middleware/security.middleware";
import { requestLogger } from "../shared/middleware/logging.middleware";
import { ErrorHandlerMiddleware } from "../shared/middleware/web-error-handler.middleware";
import router from "../shared/router";
const isProd = config.NODE_ENV === 'production'

export const webApp = express();

webApp.set('trust proxy', isProd ? 1 : false)

webApp.use(helmetGuard)

webApp.use(corsGuard)

webApp.use(requestLogger) // OWASP

webApp.use(express.json())
webApp.use(express.urlencoded({ extended: true }))
webApp.use(cookieParser())

webApp.use(hppMiddleware)

webApp.use(xssProtection)

webApp.use(
  "/public",
  express.static(path.join(process.cwd(), "public"))
)

webApp.use(router)

webApp.use(ErrorHandlerMiddleware)