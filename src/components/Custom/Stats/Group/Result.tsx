import { FC, useMemo, useState } from 'react'
import { ResultProps, ResultStatsProps } from '../ClubProps';
import { twMerge } from 'tailwind-merge';
import resultData from '../../../../assets/json/clubs/bayer-leverkusen/matches-mock.json';

const ResultGrid: FC<{ data: ResultProps }> = (({ data }) => {
    console.log(data)
    const colorProperty = useMemo(() => {
        switch(data.result) {
            case 'w':
                return {
                    borderLeft: 'border-green-600',
                    textHome: (data.home.score > data.away.score) ? 'text-white' : 'text-stone-300',
                    textAway: (data.away.score > data.home.score) ? 'text-white' : 'text-stone-300',
                }
            case 'd':
                return {
                    borderLeft: 'border-sky-600',
                    textHome: 'text-stone-300',
                    textAway: 'text-stone-300'
                }
            case 'l':
                return {
                    borderLeft: 'border-red-600',
                    textAway: (data.away.score > data.home.score) ? 'text-white' : 'text-stone-300',
                    textHome: (data.home.score > data.away.score) ? 'text-white' : 'text-stone-300',
                }
            default:
                return {}
        }
    }, [data.away.score, data.home.score, data.result]);

    return(
        <div className={twMerge("flex flex-col bg-slate-600 border-l-8 border-y border-r rounded-lg", colorProperty.borderLeft)}>
            <div className="flex justify-between leading-3 text-slate-100 pt-1 border-b-2 border-slate-600">
                <span className="block text-sm leading-3 p-1">
                    {data.league} - {typeof data.round === 'string' ? data.round : `round ${data.round}`}
                </span>
                <span className="block text-sm leading-3 p-1">{data.matchday.normal}</span>
            </div>
            <div className="flex justify-between h-12">
                <div className="flex justify-center w-full">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div className="w-8 h-8">
                            <img src={data.home.logo} alt={data.home.club.normal} width="100%" height="100%" />
                        </div>
                        <span className="block text-2xl text-slate-200">{data.home.club.abbrev}</span>
                    </div>
                </div>
                <div className="flex items-center font-sans font-medium">
                    {data.hasPenalty
                    ? <div className="flex flex-col items-center">
                        <span className={twMerge("block text-xl leading-5", colorProperty.textHome)}>
                            {data.home.score}
                        </span>
                        <strong className={twMerge("block text-xl leading-5", colorProperty.textHome)}>
                            ({data.penalties.home})
                        </strong>
                    </div>
                    : <strong className={twMerge("block text-3xl pr-0.5", colorProperty.textHome)}>
                        {data.home.score}
                    </strong>}
                    
                    <span className="block text-slate-300 text-3xl">-</span>
                    {data.hasPenalty
                    ? <div className="flex flex-col items-center">
                        <span className={twMerge("block text-xl leading-5", colorProperty.textAway)}>
                            {data.away.score}
                        </span>
                        <strong className={twMerge("block text-xl leading-5", colorProperty.textAway)}>
                            ({data.penalties.away})
                        </strong>
                    </div>
                    : <strong className={twMerge("block text-3xl pr-0.5", colorProperty.textAway)}>
                        {data.away.score}
                    </strong>}
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex flex-row-reverse items-center justify-center gap-2">
                        <div className="w-8 h-8">
                            <img src={data.away.logo} alt={data.away.club.normal} width="100%" height="100%" />
                        </div>
                        <span className="block text-2xl text-slate-200">{data.away.club.abbrev}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})

const Result: FC<{ data?: ResultStatsProps[] }> = (({ data }) => {
    const [resultList, setResultList] = useState<ResultProps[]>([]);

    const handleShowResult = (item: ResultStatsProps) => {
        if (item.active) {
            const results = resultData.data.find(el =>
                el.club.abbrev.match(item.club.abbrev) &&
                el.club.abbrev === item.club.abbrev &&
                item.active
            );
            if (results === undefined) {
                return;
            }
            setResultList(results.results);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h4 className="block text-yellow-300 text-3xl text-center">Select a team</h4>
            <div className="flex flex-col">
                <ul className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {data?.map((item, index) => (
                        <li key={index} className="flex flex-col items-center">
                            <div
                                className={`flex flex-col items-center justify-between w-full h-20 p-2 rounded-lg border ${item.active
                                    ? 'border-yellow-500 bg-stone-800 text-slate-100 cursor-pointer hover:border-2 hover:border-red-800 hover:bg-stone-300 hover:text-slate-800 hover:font-bold'
                                    : 'opacity-30 cursor-not-allowed bg-stone-500 text-slate-800 border-yellow-500'
                                }`}
                                onClick={() => handleShowResult(item)}
                            >
                                <div className="flex items-end w-10 h-10">
                                    <img src={item.logo} alt={item.club.abbrev} width="100%" height="auto" className="h-auto" />
                                </div>
                                <span className="block text-base">{item.club.abbrev}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="">
                <h4 className="block text-yellow-300 text-3xl text-center mb-4">All matchday results</h4>
                <div className="flex flex-col gap-0 border-2 border-yellow-500 rounded-md">
                    <div className="flex flex-col md:flex-row items-stretch justify-center bg-slate-900 py-4 px-2 rounded-md border-none">
                        <div className="flex flex-col gap-4">
                            {resultList.length > 0
                            ? resultList.sort((x, y) => y.code - x.code).map((result, key) => (
                                <ResultGrid data={result} key={key} />
                            ))
                            : <span className="block text-slate-100 text-xl text-center">Nothing to show for now...</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Result;
