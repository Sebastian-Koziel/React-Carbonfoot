

export type RegisterUserDto = {
    email: string
    password: string
    name: string
    surname: string
    company: string
    isEmailVerified: boolean
    emailVerificationToken: string
}