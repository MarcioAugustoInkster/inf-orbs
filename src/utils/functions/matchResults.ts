import { ResultProps } from "../../components/Custom/Stats/ClubProps";

export function calcTeamStats(result: ResultProps[], club?: string) {
    const resultData = {
        homeData: {
            homeMatches: 0,
            homeWins: 0,
            homeDraws: 0,
            homeLosses: 0,
            homeGoalsScored: 0,
            homeGoalsAgainst: 0,
            homeDifference: 0,
        },
        awayData: {
            awayMatches: 0,
            awayWins: 0,
            awayDraws: 0,
            awayLosses: 0,
            awayGoalsScored: 0,
            awayGoalsAgainst: 0,
            awayDifference: 0,
        }
    };

    result.forEach(element => {
        if (element.home.club.abbrev === club) {
            if (element.home.score > element.away.score) {
                Object.assign(resultData.homeData, { homeWins: resultData.homeData.homeWins + 1 });
            } else if (element.away.score > element.home.score) {
                Object.assign(resultData.homeData, { homeLosses: resultData.homeData.homeLosses + 1 });
            } else {
                Object.assign(resultData.homeData, { homeDraws: resultData.homeData.homeDraws + 1 });
            }
            Object.assign(resultData.homeData, {
                homeMatches: resultData.homeData.homeMatches + 1,
                homeGoalsScored: element.home.score + resultData.homeData.homeGoalsScored,
                homeGoalsAgainst: element.away.score + resultData.homeData.homeGoalsAgainst,
                homeDifference: (resultData.homeData.homeGoalsScored - resultData.homeData.homeGoalsAgainst),
            });
        } else if (element.away.club.abbrev === club) {
            if (element.away.score > element.home.score) {
                Object.assign(resultData.awayData, { awayWins: resultData.awayData.awayWins + 1 });
            }
            else if (element.away.score < element.home.score) {
                Object.assign(resultData.awayData, { awayLosses: resultData.awayData.awayLosses + 1 });
            }
            else {
                Object.assign(resultData.awayData, { awayDraws: resultData.awayData.awayDraws + 1 });
            }
            Object.assign(resultData.awayData, {
                awayMatches: resultData.awayData.awayMatches + 1,
                awayGoalsScored: element.away.score + resultData.awayData.awayGoalsScored,
                awayGoalsAgainst: element.home.score + resultData.awayData.awayGoalsAgainst,
                awayDifference: (resultData.awayData.awayGoalsScored - resultData.awayData.awayGoalsAgainst)
            });
        }
        Object.assign(resultData.homeData, {
            homeDifference: (resultData.homeData.homeGoalsScored - resultData.homeData.homeGoalsAgainst)
        });
        Object.assign(resultData.awayData, {
            awayDifference: (resultData.awayData.awayGoalsScored - resultData.awayData.awayGoalsAgainst)
        });
    });
    return resultData;
}