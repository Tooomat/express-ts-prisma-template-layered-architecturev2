import { logger } from "../../../infrastructure/logging"

export const accessLogger = {
    // MANDATORY
    accessDenied: (userId: string | null, ip: string, url: string, reason: string, origin?: string, requestId?: string) => {
        logger.warn({
            type: 'security:access_denied',
            userId: userId ?? 'anonymous',
            ip,
            url,
            reason,
            ...(origin    && { origin }),
            ...(requestId && { requestId }),
            timestamp: new Date().toISOString()
        })
    },

    // MANDATORY
    rateLimitExceeded: (ip: string, userId: string | null, url: string, statusCode: number, origin?: string, requestId?: string) => {
        logger.warn({
            type: 'security:rate_limit_exceeded',
            ip,
            userId: userId ?? 'anonymous',
            url,
            statusCode,
            ...(origin    && { origin }),
            ...(requestId && { requestId }),
            timestamp: new Date().toISOString()
        })
    },

    // MANDATORY
    invalidToken: (ip: string, url: string, reason: string, requestId?: string) => {
        logger.warn({
            type: 'security:invalid_token',
            ip,
            url,
            reason,
            ...(requestId && { requestId }),
            timestamp: new Date().toISOString()
        })
    }
}