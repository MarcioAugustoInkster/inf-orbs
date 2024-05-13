export type HeadRowProps = {
    label: string;
    size: string;
}

export type BodyRowProps = {
    content: number | string | JSX.Element;
    size: string;
    polarity?: boolean
}

export type ClubViewProps = {
    name: string;
    image: string;
}

export type TableClubProps = {
    name: {
        normal: string;
        abbrev: string;
    };
    image: string;
    matches: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsAgainst: number;
    difference: number;
    points: number;
}

export type TableProps = {
    season?: string;
    clubs?: TableClubProps[];
}

export type ResultProps = {
    name: {
        normal: string;
        abbrev: string;
    };
    image: string;
    matches: {
        round: number;
        homeScore: number;
        awayScore: number;
        result: string;
        home: boolean;
    }[];
}
