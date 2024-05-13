import { Dispatch, SetStateAction } from "react"

export type GroupBoxProps = {
    items: MatchProps[],
    points: number,
    round: number,
    setPointsSum: Dispatch<SetStateAction<number[]>>
}

export type NoteBoxProps = {
    label: string,
    content: string | number,
}

export type MatchProps = {
    logo: string,
    normal: string,
    abbrev: string,
    result: {
        type: string,
        currentPoints: number,
    },
    home: boolean,
}

export type ClubsProps = {
    club: {
        logo: string,
        normal: string,
        abbrev: string,
    },
    startingPoints: number,
    matches: MatchProps[],
}

export type ClubsDataProps = {
    league: {
        name: string,
        image: string,
    },
    currentRound: number,
    clubs: ClubsProps[],
}
