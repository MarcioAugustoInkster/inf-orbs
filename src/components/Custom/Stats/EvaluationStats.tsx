import { FC, useEffect, useRef, useState } from 'react'
import { ResultProps } from './ClubProps';

const EvaluationStats: FC<{data: ResultProps[]}> = (({data}) => {
    const isLoadedRef = useRef<boolean>(false);
    const [evaluation, setEvaluation] = useState<object>({});
    
    useEffect(() => {
        if (!isLoadedRef.current) {
            const gridData = {
                matches: data.length,
                wins: 0,
                draws: 0,
                losses: 0,
                goalsScored: 0,
                goalsAgainst: 0,
                difference: 0,
                accuracy: '0'
            };
            if (data === undefined) {
                return;
            }
            data.forEach((item) => {
                if (item.home.club.abbrev === "B04") {
                    if (item.home.score > item.away.score) {
                        Object.assign(gridData, { wins: gridData.wins + 1 });
                    } else if (item.away.score > item.home.score) {
                        Object.assign(gridData, { losses: gridData.losses + 1 });
                    }
                    Object.assign(gridData, {
                        goalsScored: item.home.score + gridData.goalsScored,
                        goalsAgainst: item.away.score + gridData.goalsAgainst
                    });
                } else {
                    if (item.away.score > item.home.score) {
                        Object.assign(gridData, { wins: gridData.wins + 1 });
                    } else if (item.home.score > item.away.score) {
                        Object.assign(gridData, { losses: gridData.losses + 1 });
                    }
                    Object.assign(gridData, {
                        goalsScored: item.away.score + gridData.goalsScored,
                        goalsAgainst: item.home.score + gridData.goalsAgainst
                    });
                }
                if (item.home.score === item.away.score) {
                    Object.assign(gridData, { draws: gridData.draws + 1 });
                }
            })
            Object.assign(gridData, {
                difference: gridData.goalsScored - gridData.goalsAgainst,
                accuracy: `${((((gridData.wins * 3) + gridData.draws) / (gridData.matches * 3)) * 100).toFixed(1)}%`
            })
            setEvaluation(gridData);
        }
        return () => {
            isLoadedRef.current = true;
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center w-full md:w-auto">
            <div className="flex flex-col gap-0 md:gap-1 py-3 px-1 w-full md:w-72 border-x border-b md:border-l-0 md:border-y md:border-r border-sky-600 bg-gradient-to-br from-indigo-900 to-slate-800 rounded-b-md md:rounded-bl-none md:rounded-tr-md md:rounded-br-md">
                {Object.entries(evaluation).map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 relative bg-gradient-to-bl from-slate-700 to-indigo-800 border-b-2 border-sky-600 py-1 px-4 rounded-none">
                        <span className="block text-lg text-slate-200 capitalize">{item[0]}:</span>
                        <strong className="block absolute right-3 top-0 md:top-1 text-4xl z-10 font-sans font-semibold text-white">{item[1]}</strong>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default EvaluationStats;
