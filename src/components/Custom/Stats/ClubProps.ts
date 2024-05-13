export type ManagerProps = {
    fullname: string,
    image: string,
    birthDate: string,
    age: number,
    sinceFrom: string,
    status: number,
}

export type MatchTimeProps = {
    league: string,
    matchdayCode: number,
    time: number,
    extratime: number,
    penalty?: boolean
}

export type MatchProps = {
    logo?: string,
    club: {
        normal: string,
        abbrev: string
    },
    score: number,
}

export type ResultProps = {
    code: number,
    league: string,
    round: string | number,
    matchday: {
        normal: string,
        abbrev: string
    },
    home: MatchProps,
    away: MatchProps,
    result: string,
    penalties: {
        home: number,
        away: number
    },
    hasPenalty: boolean
}

export type PlayerProps = {
    image: string,
    fullname: string,
    birthDate: string,
    status: number,
    goals: MatchTimeProps[],
    yellowCards: MatchTimeProps[],
    redCards: MatchTimeProps[]
}

export type ManagerStatsProps = {
    profile: ManagerProps,
    results: ResultProps[]
}

export type PlayerStats = {
    name: string,
    image?: string,
    birthDate: string,
    nationality: {
        country: string,
        flag?: string
    },
    position: string,
    number: number,
    active: number,
}

export type ResultStatsProps = {
    club: {
        normal: string,
        abbrev: string
    },
    logo: string,
    active: boolean
}

export type ClubProps = {
    managers?: ManagerStatsProps[],
    players?: PlayerProps[],
    nationalities?: PlayerStats[],
    results?: ResultStatsProps[]
}
