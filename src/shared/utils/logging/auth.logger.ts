import { logger } from "../../../infrastructure/logging"
import { formaterUtils } from "../formater.utils"

export const authLogger = {
    // MANDATORY
    loginSuccess: (userId: string, ip: string) => {
        logger.info({
            type: 'security:login_success',
            userId,
            ip,
            timestamp: new Date().toISOString()
        })
    },

    // MANDATORY
    loginFailed: (email: string, ip: string, reason: string, origin?: string, requestId?: string) => {
        logger.warn({
            type: 'security:login_failed',
            emailHash: formaterUtils.hashPII(email),
            emailMask: formaterUtils.maskEmail(email),
            ip,
            reason,
            ...(origin    && { origin }),
            ...(requestId && { requestId }),
            timestamp: new Date().toISOString()
        })
    },

    // OPTIONAL
    registered: (userId: string, ip: string) => {
        logger.info({
            type: 'security:registered',
            userId,
            ip,
            timestamp: new Date().toISOString()
        })
    },

    // MANDATORY
    accountLocked: (email: string, ip: string, attempts: number, origin?: string) => {
        logger.warn({
            type: 'security:account_locked',
            emailHash: formaterUtils.hashPII(email),
            emailMask: formaterUtils.maskEmail(email),
            ip,
            attempts,
            ...(origin && { origin }),
            timestamp: new Date().toISOString()
        })
    },

    // MANDATORY
    logout: (userId: string, ip: string) => {
        logger.info({
            type: 'security:logout',
            userId,
            ip,
            timestamp: new Date().toISOString()
        })
    },

    // OPTIONAL
    passwordReset: (userId: string, ip: string) => {
        logger.info({
            type: 'security:password_reset',
            userId,
            ip,
            timestamp: new Date().toISOString()
        })
    }
}