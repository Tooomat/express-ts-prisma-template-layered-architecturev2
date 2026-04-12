import { NextFunction, Request, Response } from "express"
import {
  success_handler,
  success_handler_without_data
} from "../../shared/response/web.response"
import { AuthService } from "./auth.service"

export class AuthController {
    private readonly authService: AuthService
    constructor(authService: AuthService) {
        this.authService = authService
        this.register = this.register.bind(this)
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await this.authService.register(req.body) 
            return success_handler_without_data(res, "register success", 201)
        } catch (e) {
            next(e)
        }
    }
}