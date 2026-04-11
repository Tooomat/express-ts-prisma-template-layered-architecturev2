import { ResponseError } from "../../shared/errors/service-response.error"
import { AuthValidation } from "../../shared/validation/auth.validation"
import { Validation } from "../../shared/validation/validation"
import { RegisterUserDTO } from "./auth.dto"
import { AuthRepository } from "./auth.repository"
import { 
    AuthResponse, 
    toAuthResponse 
} from "./auth.response"

export class AuthService {
    constructor(private authRepo: AuthRepository) {
        this.authRepo = authRepo
    }
    
    async register(req: RegisterUserDTO): Promise<AuthResponse> {
        const validate = Validation.validate(AuthValidation.REGISTER_SCHEMA, req)
        const existingUser = await this.authRepo.findByEmail(validate.email)

        if (existingUser) {
            throw new ResponseError(
                403,
                "Email already exists"
            )
        }

        const user = await this.authRepo.create(validate)

        return toAuthResponse(user)
    }
}