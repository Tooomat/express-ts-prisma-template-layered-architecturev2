import { ResponseError } from "../../shared/errors/service-response.error"
import { AuthValidation } from "./auth.validation"
import { Validation } from "../../shared/validation/validation"
import { RegisterUserDTO } from "./auth.dto"
import { IAuthRepository } from "./auth.repository.interface"
import { 
    AuthResponse, 
    toAuthResponse 
} from "./auth.response"
import bcrypt from 'bcrypt'

export class AuthService {
    private authRepo: IAuthRepository
    constructor(authRepo: IAuthRepository) {
        this.authRepo = authRepo
    }
    
    async register(req: RegisterUserDTO): Promise<AuthResponse> {
        const validate = Validation.validate(AuthValidation.REGISTER_SCHEMA, req)
        
        const existingUser = await this.authRepo.findByEmail(validate.email)
        if (existingUser) {
            throw new ResponseError(403, "Email already exists")
        }

        const hashedPassword = await bcrypt.hash(validate.password, 10)
        const user = await this.authRepo.create({
            email: validate.email,
            password: hashedPassword // ← simpan yang sudah di-hash
        })

        return toAuthResponse(user)
    }
}