export type CreateFactorDto = {
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
}