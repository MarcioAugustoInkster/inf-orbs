import { ResultProps } from "../../components/Custom/Stats/ClubProps";

export const resultProps = {
    matches: { total: 0, home: 0, away: 0 },
    wins: { total: 0, home: 0, away: 0 },
    draws: { total: 0, home: 0, away: 0 },
    losses: { total: 0, home: 0, away: 0 },
    goalsScored: { total: 0, home: 0, away: 0 },
    goalsAgainst: { total: 0, home: 0, away: 0 },
    difference: { total: 0, home: 0, away: 0 },
    accuracy: { total: 0, home: 0, away: 0 }
}

export const resultBoard = (data: ResultProps[], club: string) => {
    const isObjectEmpty = Object.values(resultProps).every(
        e => e.home === 0 && e.away === 0 && e.total == 0
    );
    if (isObjectEmpty) {
        resultProps.matches.total = data.length;
        data.forEach((result) => {
            if (result.home.club.abbrev === club) {
                if (result.home.score > result.away.score) {
                    resultProps.wins.total = resultProps.wins.total + 1;
                    resultProps.wins.home = resultProps.wins.home + 1;
                } else if (result.away.score > result.home.score) {
                    resultProps.losses.total = resultProps.losses.total + 1;
                    resultProps.losses.home = resultProps.losses.home + 1;
                }
                resultProps.matches.home = resultProps.matches.home + 1;
                resultProps.goalsScored.total = resultProps.goalsScored.total + result.home.score;
                resultProps.goalsScored.home = resultProps.goalsScored.home + result.home.score;
                resultProps.goalsAgainst.total = resultProps.goalsAgainst.total + result.away.score;
                resultProps.goalsAgainst.away = resultProps.goalsAgainst.away + result.away.score;
            } else {
                if (result.away.score > result.home.score) {
                    resultProps.wins.total = resultProps.wins.total + 1;
                    resultProps.wins.away = resultProps.wins.away + 1;
                } else if (result.home.score > result.away.score) {
                    resultProps.losses.total = resultProps.losses.total + 1;
                    resultProps.losses.away = resultProps.losses.away + 1;
                }
                resultProps.matches.away = resultProps.matches.away + 1;
                resultProps.goalsScored.total = resultProps.goalsScored.total + result.away.score;
                resultProps.goalsScored.away = resultProps.goalsScored.away + result.away.score;
                resultProps.goalsAgainst.total = resultProps.goalsAgainst.total + result.home.score;
                resultProps.goalsAgainst.home = resultProps.goalsAgainst.home + result.home.score;
            }
            if (result.home.score === result.away.score) {
                resultProps.draws.total = resultProps.draws.total + 1;
                if (result.home.club.abbrev === club) {
                    resultProps.draws.home = resultProps.draws.home + 1;
                } else {
                    resultProps.draws.away = resultProps.draws.away + 1;
                }
            }
        })
        resultProps.difference.total = resultProps.goalsScored.total - resultProps.goalsAgainst.total;
        resultProps.difference.home = resultProps.goalsScored.home - resultProps.goalsAgainst.home;
        resultProps.difference.away = resultProps.goalsScored.away - resultProps.goalsAgainst.away;
        resultProps.accuracy.total = Number(((((resultProps.wins.total * 3) + resultProps.draws.total) / (resultProps.matches.total * 3)) * 100).toFixed(1));
        resultProps.accuracy.home = Number(((((resultProps.wins.home * 3) + resultProps.draws.home) / (resultProps.matches.home * 3)) * 100).toFixed(1));
        resultProps.accuracy.away = Number(((((resultProps.wins.away * 3) + resultProps.draws.away) / (resultProps.matches.away * 3)) * 100).toFixed(1));
    }
    return resultProps;
}
