interface LeagueProps {
    index: number;
    league: string;
    abbrev: string;
    image: string;
}

interface LeaguesProps {
    primaryLeague: string[],
    secondaryLeague: string[],
    primaryCup: string[],
    primarySuperCup: string[],
    continentalPrimaryLeague: string[],
    continentalSecondaryLeague: string[],
    contientalCup: string[],
    intercontinentalCup: string[],
}

interface ClubProps {
    name: string;
    abbrev: string;
    icon: string;
    trophies: LeaguesProps;
    relegations: string[]
}

export interface AchievDataProps {
    championships?: LeagueProps[];
    hiddenColumns: string[];
    clubs?: ClubProps[];
}

export interface AchievementProps {
    country?: string;
    item?: AchievDataProps;
}