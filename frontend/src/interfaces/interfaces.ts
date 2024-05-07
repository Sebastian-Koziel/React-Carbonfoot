export interface User {
    _id: string
    email: string
    name: string
    surname: string
    company: string
    marketingConsent: boolean,
    termsAccepted: boolean,
    isEmailVerified: boolean
    emailVerificationToken: string
}

export interface NewUser {
    email: string
    password: string
    name: string
    surname: string
    company: string
    marketingConsent: boolean,
    termsAccepted: boolean,
    isEmailVerified: boolean
    emailVerificationToken: string
}