import { logger } from "../../../infrastructure/logging"
import { formaterUtils } from "../formater.utils"

export const notificationLogger = {
    // OPTIONAL
    emailVerified: (userId: string, ip: string) => {
        logger.info({
            type: 'security:email_verified',
            userId,
            ip,
            timestamp: new Date().toISOString()
        })
    },

    // OPTIONAL
    emailVerificationSentFailed: (email: string, ip: string, reason: string, requestId?: string) => {
        logger.warn({
            type: 'security:email_verification_sent_failed',
            emailHash: formaterUtils.hashPII(email),
            emailMask: formaterUtils.maskEmail(email),
            ip,
            reason,
            ...(requestId && { requestId }),
            timestamp: new Date().toISOString()
        })
    }
}