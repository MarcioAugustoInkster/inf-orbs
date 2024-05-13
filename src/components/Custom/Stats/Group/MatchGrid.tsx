import { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ResultProps } from '../ClubProps';
import { twMerge } from 'tailwind-merge';
import { calcTeamStats } from '../../../../utils/functions/matchResults';
import { useParams } from 'react-router-dom';
import { IResultData } from './IMatchGrid';

export const MatchGridData: FC<{ result: ResultProps }> = (({ result }) => {
    const styling = useMemo(() => {
        const bgWinColor = 'text-white';
        const bgDrawLossColor = 'text-stone-300';

        switch(result.result) {
            case 'w':
                return {
                    panel: 'border-l-green-600',
                    textHome: (result.home.score > result.away.score ? bgWinColor : bgDrawLossColor),
                    textAway: (result.away.score > result.home.score ? bgWinColor : bgDrawLossColor),
                    background: 'bg-green-600',
                    smoothBackground: 'bg-slate-700',
                };
            case 'l':
                return {
                    panel: 'border-l-red-600',
                    textHome: (result.home.score > result.away.score ? bgWinColor : bgDrawLossColor),
                    textAway: (result.away.score > result.home.score ? bgWinColor : bgDrawLossColor),
                    background: 'bg-red-600',
                    smoothBackground: 'bg-red-100',
                };
            default:
                return {
                    panel: 'border-l-sky-600',
                    textHome: bgDrawLossColor,
                    textAway: bgDrawLossColor,
                    background: 'bg-sky-600',
                    smoothBackground: 'bg-blue-100',
                };
        }
    }, [result.result, result.home, result.away]);

    return(
        <div
            className={twMerge(
                "flex flex-col border-l-4 w-full xs:w-80 sm:w-full mx-auto border-y border-y-stone-600 border-r border-r-stone-600 bg-slate-800 overflow-hidden rounded-lg",
                styling.panel
            )}
            data-matchcode={result.code}
        >
            <div className={twMerge("flex justify-between py-1 px-2 bg-slate-400 text-white border-b-2 border-stone-400", styling.background)}>
                <span className="text-sm font-semibold">
                    {result.league} - {typeof(result.round) === 'string' ? result.round : `round ${result.round}`}
                </span>
                <span className="block xs:hidden md:block text-sm font-semibold">
                    {result.matchday.normal}
                </span>
                <span className="hidden xs:block md:hidden text-sm font-semibold">
                    {result.matchday.abbrev}
                </span>
            </div>
            <div className={twMerge("flex flex-col justify-center gap-1 py-2 px-2 h-full bg-slate-700 rounded-b-sm")}>
                <div className="flex justify-start w-full">
                    <div className="flex items-center gap-1 w-full">
                        <div className="w-8 h-auto border-none">
                            <img src={result.home.logo} alt={result.home.club.normal} width="100%" height="100%" />
                        </div>
                        <span className={twMerge("block px-2 text-base leading-4 font-semibold", styling.textHome)}>
                            {result.home.club.normal}
                        </span>
                    </div>
                    <div className={twMerge("flex items-center justify-center px-1 text-lg", styling.textHome)}>
                        {result.hasPenalty
                        ? <div className="flex gap-1">
                            <span className="block">{result.home.score}</span>
                            <strong className="block font-semibold">({result.penalties?.home})</strong>
                        </div>
                        : <span className="block">{result.home.score}</span>}
                    </div>
                </div>
                <div className="flex justify-start w-full">
                    <div className="flex items-center gap-1 w-full">
                        <div className="w-8 h-auto border-none">
                            <img src={result.away.logo} alt={result.away.club.normal} width="100%" height="100%" />
                        </div>
                        <span className={twMerge("block px-2 text-base leading-4 font-semibold", styling.textAway)}>{result.away.club.normal}</span>
                    </div>
                    <div className={twMerge("flex items-center justify-center px-1 text-lg", styling.textAway)}>
                        {result.hasPenalty
                        ? <div className="flex gap-1">
                            <span className="block">{result.away.score}</span>
                            <strong className="block font-semibold">({result.penalties?.away})</strong>
                        </div>
                        : <span className="block">{result.away.score}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
});

const MatchGrid: FC<{results: ResultProps[]}> = (({ results }) => {
    const [resultData, setResultData] = useState<ResultProps[]>([]);
    const [filter, setFilter] = useState<object>({});
    const [evaluation, setEvaluation] = useState<IResultData>();
    const resultsRef = useRef<ResultProps[]>(results);

    const isLoadedRef = useRef<boolean>(false);

    const scores = [
        {
            type: 'Winning',
            options: [
                { home: 1, away: 0, result: 'w' },
                { home: 2, away: 0, result: 'w' },
                { home: 2, away: 1, result: 'w' },
                { home: 3, away: 0, result: 'w' },
                { home: 3, away: 1, result: 'w' },
                { home: 3, away: 2, result: 'w' },
                { home: 4, away: 0, result: 'w' },
                { home: 4, away: 1, result: 'w' },
                { home: 5, away: 0, result: 'w' },
                { home: 5, away: 1, result: 'w' },
                { home: 5, away: 2, result: 'w' },
                { home: 8, away: 0, result: 'w' },
            ]
        },
        {
            type: 'Drawing',
            options: [
                { home: 0, away: 0, result: 'd' },
                { home: 1, away: 1, result: 'd' },
                { home: 2, away: 2, result: 'd' },
            ]
        },
        {
            type: 'Losing',
            options: [
                { home: 1, away: 0, result: 'l' },
                { home: 2, away: 0, result: 'l' },
                { home: 2, away: 1, result: 'l' },
                { home: 3, away: 0, result: 'l' },
                { home: 3, away: 2, result: 'l' },
                { home: 5, away: 1, result: 'l' }
            ]
        },
    ];

    const { club } = useParams();

    const onCheckedRadio = useCallback((event: ChangeEvent<HTMLInputElement>, value?: string) => {
        if (!event.target.checked) {
            return;
        }
        const filteredResult = value === undefined
            ? resultsRef.current
            : resultsRef.current.filter(el => el.league === value);
        
        const calcResults = calcTeamStats(filteredResult, club);
        setEvaluation(calcResults);
        setResultData(filteredResult);
    }, [club]);

    const scoreFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.target.value;
        if (selectValue.toLowerCase() === 'all') {
            setResultData(resultsRef.current);
        } else {
            const res = selectValue.slice(0, 1);
            const home = Number(selectValue.slice(2, 3));
            const away = Number(selectValue.slice(4, 5));
            const results = resultsRef.current.filter(el => 
                (el.home.score === home || el.away.score === home) &&
                (el.away.score === away || el.home.score === away) &&
                el.result === res);
            setResultData(results);
        }
    }

    useEffect(() => {
        if (!isLoadedRef.current) {
            const filteredData = resultsRef.current.reduce((acc, match) => {
                return {...acc, [match.league]: match.league}
            }, {});
            setFilter(filteredData);
            setResultData(resultsRef.current);
        }
        return () => {
            isLoadedRef.current = true;
        }
    }, []);

    return(
        <>
            <div className="flex flex-col">
                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-start gap-0.5 w-40 my-2">
                        <div className="flex items-center gap-1 py-0.5 px-2 bg-slate-800 border border-slate-400 rounded-md">
                            <input type="radio" id="checkleagueall" name="checkLeagues" onChange={onCheckedRadio} />
                            <label htmlFor="checkleagueall" className="block text-slate-100">All</label>
                        </div>
                        {Object.values(filter).map((item, index) => (
                            <div key={index} className="flex items-center gap-1 py-0.5 px-2 bg-slate-800 border border-slate-400 rounded-md">
                                <input type="radio" id={`check_${item}`} name="checkLeagues" onChange={(e) => onCheckedRadio(e, item)} />
                                <label htmlFor={`check_${item}`} className="block text-slate-100">{item}</label>
                            </div>
                        ))}
                    </div>
                    <select className="" onChange={scoreFilter}>
                        <option value="all">All</option>
                        {scores.map((score, sindex) => (
                            <optgroup label={score.type} key={sindex}>
                                {score.options.map((opt, oindex) => (
                                    <option value={`${opt.result}-${opt.home}:${opt.away}`} key={oindex}>
                                        {opt.home}:{opt.away}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className="w-full">
                    {evaluation !== undefined
                        ? (
                            <div className="grid grid-cols-2 gap-2 bg-slate-900">
                                <div className="pt-1 px-1">
                                    <h2 className="text-center text-2xl text-blue-500">Matches Home</h2>
                                    <ul className="py-2 pl-1">
                                        {Object.entries(evaluation.homeData).map((item, index) => (
                                            <li key={index} className="flex items-center gap-4">
                                                <span className="block text-slate-400 w-full text-right text-sm sm:text-md md:text-lg">
                                                    {item[0].replace('home', '')}:
                                                </span>
                                                <strong className="block text-white w-full font-semibold text-left text-base sm:text-lg md:text-2xl">
                                                    {item[1]}
                                                </strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-1 pr-1">
                                    <h2 className="text-center text-2xl text-blue-500">Matches Away</h2>
                                    <ul className="py-2 px-1">
                                        {Object.entries(evaluation.awayData).map((item, index) => (
                                            <li key={index} className="flex items-center gap-4">
                                                <span className="block text-slate-400 w-full text-right text-sm sm:text-md md:text-lg">
                                                    {item[0].replace('away', '')}:
                                                </span>
                                                <strong className="block text-white w-full font-semibold text-left text-base sm:text-lg md:text-2xl">
                                                    {item[1]}
                                                </strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <h4 className="text-center text-slate-100">No evaluation data</h4>
                        )
                    }
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-3 lg:gap-4 w-full py-4 px-2 bg-slate-900 border-none">
                        {resultData.sort((x, y) => y.code - x.code).map((result, index) => (
                            <MatchGridData result={result} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
})

export default MatchGrid;
