import { ResultProps, TableClubProps, TableProps } from './TableDynamicProps';
import seasonClubsJson from './S20232024-mock.json';
import TableDynamic from './TableDynamic';

function calcTableResults(result: ResultProps[], location: 'home' | 'away' | 'all'): TableClubProps[] {
    const resultData: TableClubProps[] = [];
    result.forEach((el) => {
        const tableData = {
            name: {
                normal: '',
                abbrev: '',
            },
            image: '',
            matches: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsScored: 0,
            goalsAgainst: 0,
            difference: 0,
            points: 0
        }
        if (tableData.name.abbrev.length === 0) {
            Object.assign(tableData, {
                name: {
                    normal: el.name.normal,
                    abbrev: el.name.abbrev
                },
                image: el.image,
                matches: el.matches.length
            })
        }
        
        let totalWin = 0, totalDraw = 0, totalLoss = 0;
        let countWin = 0, countDraw = 0, countLoss = 0;
        
        el.matches.map((obj) => {
            if (location === 'home') {
                if (obj.result === 'w' && obj.home) {
                    countWin = countWin + 1;
                    totalWin = countWin;
                } else if (obj.result === 'd' && obj.home) {
                    countDraw = countDraw + 1;
                    totalDraw = countDraw;
                } else if (obj.result === 'l' && obj.home) {
                    countLoss = countLoss + 1;
                    totalLoss = countLoss;
                }
            } else if (location === 'away') {
                if (obj.result === 'w' && !obj.home) {
                    countWin = countWin + 1;
                    totalWin = countWin;
                } else if (obj.result === 'd' && !obj.home) {
                    countDraw = countDraw + 1;
                    totalDraw = countDraw;
                } else if (obj.result === 'l' && !obj.home) {
                    countLoss = countLoss + 1;
                    totalLoss = countLoss;
                }
            } else {
                if (obj.result === 'w') {
                    countWin = countWin + 1;
                    totalWin = countWin;
                } else if (obj.result === 'd') {
                    countDraw = countDraw + 1;
                    totalDraw = countDraw;
                } else {
                    countLoss = countLoss + 1;
                    totalLoss = countLoss;
                }
            }
        })
        const totalHomeScore = el.matches.reduce((a, b) => (
            location === 'home'
                ? b.home
                    ? a + b.homeScore
                    : a + b.awayScore
                : location === 'away'
                    ? !b.home
                        ? a + b.awayScore
                        : a + b.homeScore
                : a + b.homeScore
        ), 0);
        const totalAwayScore = el.matches.reduce((a, b) => !b.home
            ? a + b.awayScore : a + b.homeScore, 0);
        Object.assign(tableData, {
            wins: totalWin,
            draws: totalDraw,
            losses: totalLoss,
            goalsScored: totalHomeScore,
            goalsAgainst: totalAwayScore,
            points: (totalWin * 3) + totalDraw
        });
        resultData.push(tableData)
    });
    return resultData;
}

const TableSeason = () => {
    const tableData = calcTableResults(seasonClubsJson.data, 'home');
    const tableClubs: TableProps = {
        season: '',
        clubs: tableData
    }

    return (
        <div className="">
            <div className="my-4 mx-2 bg-white">
                <TableDynamic season={tableClubs?.season} clubs={tableClubs?.clubs} />
            </div>
        </div>
    )
};

export default TableSeason;
