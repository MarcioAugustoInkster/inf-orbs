export type ManagerProps = {
    fullname: string;
    image: string;
    birthDate: string;
    age: number;
    sinceFrom: string;
    status: number;
}

export type MatchTimeProps = {
    league: string;
    matchdayCode: number;
    time: number;
    extratime: number;
    penalty?: boolean;
}

export type MatchProps = {
    logo?: string;
    club: {
        normal: string;
        abbrev: string
    };
    score: number;
}

export type ScoreProps = {
    type: string;
    profileURL: string;
    time: number;
    addedTime: number;
    penalty: boolean;
}

export type MatchesProps = {
    matchday: string;
    league: {
        title: string;
        logoURL: string;
        stage: string;
    };
    club: {
        name: string;
        short: string;
        imageURL: string;
    };
    score: {
        home: number;
        away: number;
    };
    result: number;
    location: number;
    scores: ScoreProps[];
};

export type MatchComplianceProps = {
    matches: MatchesProps[];
}

export type PlayerProps = {
    image: string;
    fullname: string;
    birthDate: string;
    status: number;
    goals: MatchTimeProps[];
    yellowCards: MatchTimeProps[];
    redCards: MatchTimeProps[];
}

export type ManagerStatsProps = {
    profile: ManagerProps;
    results: MatchesProps[];
}

export type PlayerStats = {
    name: string;
    image?: string;
    birthDate: string;
    nationality: {
        country: string;
        flag?: string
    };
    position: string;
    number: number;
    active: number;
}

export type ClubProps = {
    managers?: ManagerStatsProps[];
    players?: PlayerProps[];
    nationalities?: PlayerStats[];
}
