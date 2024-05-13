export interface IResultData {
    homeData: {
        homeMatches: number,
        homeWins: number,
        homeDraws: number,
        homeLosses: number,
        homeGoalsScored: number,
        homeGoalsAgainst: number,
        homeDifference: number,
    },
    awayData: {
        awayMatches: number,
        awayWins: number,
        awayDraws: number,
        awayLosses: number,
        awayGoalsScored: number,
        awayGoalsAgainst: number,
        awayDifference: number,
    }
}