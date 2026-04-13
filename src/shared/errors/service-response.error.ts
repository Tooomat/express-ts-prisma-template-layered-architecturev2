export class ResponseError extends Error {
    public status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export class BadRequestError extends ResponseError {
    constructor(message: string) {
        super(400, message)
    }
}

export class UnauthorizedError extends ResponseError {
    constructor(message: string) {
        super(401, message)
    }
}

export class ForbiddenError extends ResponseError {
    constructor(message: string) {
        super(403, message)
    }
}

export class NotFoundError extends ResponseError {
    constructor(message: string) {
        super(404, message)
    }
}

export class ConflictError extends ResponseError {
    constructor(message: string) {
        super(409, message)
    }
}

export class GoneError extends ResponseError {
    constructor(message: string) {
        super(410, message)
    }
}

export class UnprocessableEntityError extends ResponseError {
    constructor(message: string) {
        super(422, message)
    }
}

export class TooManyRequestsError extends ResponseError {
    constructor(message: string) {
        super(429, message)
    }
}

export class InternalServerError extends ResponseError {
    constructor(message: string) {
        super(500, message)
    }
}

export class BadGatewayError extends ResponseError {
    constructor(message: string) {
        super(502, message)
    }
}

export class ServiceUnavailableError extends ResponseError {
    constructor(message: string) {
        super(503, message)
    }
}