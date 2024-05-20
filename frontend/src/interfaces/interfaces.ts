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
    language: string
    votedFor: [string]
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
    language: string
}


export interface Factor  {
    _id: string
    name : string
    region: string
    year: string
    value: number
    units: string
    comment: string

    ranks:{
        1: number,
        2: number,
        3: number,
        4: number,
        5: number,
        sum: number,
        average: number
    }
    usedTimes: number
    isPublic: boolean
    isUsed: boolean
    whereUsed: [string]
    isActive: boolean
    addedBy: string
    
};

export interface NewFactor {
    
    name : string
    region: string
    year: string
    value: number
    units: string
    comment: string
    isPublic: boolean
    addedBy: string
}


export interface NewRaport {
    
    addedBy: string
    name: string
}

export interface Raport {
    _id: string
    addedBy: string
    name: string
}