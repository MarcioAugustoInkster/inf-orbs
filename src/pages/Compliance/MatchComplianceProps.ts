export type ScoreProps = {
    type: string;
    time: number;
    addedTime: number;
    penalty: boolean;
}

export type MatchesProps = {
    matchday: {
        dateShort: string;
        dateLong: string;
    };
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
    club: {
        name: string;
        short: string;
        imageURL: string;
    };
    matches: MatchesProps[];
}
