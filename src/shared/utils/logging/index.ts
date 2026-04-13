import { authLogger }        from './auth.logger'
import { accessLogger }      from './access.logger'
import { notificationLogger } from './notification.logger'

export const securityLogger = {
    ...authLogger,
    ...accessLogger,
    ...notificationLogger
}