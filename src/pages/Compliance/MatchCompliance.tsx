import { FC, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MatchComplianceProps, MatchesProps, ScoreProps } from './MatchComplianceProps';
import matchComplianceJSON from './../../assets/json/league/match-compliance-mock.json';

const ScoreBlock: FC<ScoreProps> = ((props) => {
    const { type, time, addedTime, penalty } = props;

    const backgroundColor = useMemo(() => {
        switch(type.toLowerCase()) {
            case 'gs': return penalty ? 'bg-green-600 border-amber-500' : 'bg-green-600 border-green-800';
            case 'ga': return 'bg-red-500 border-red-800';
            case 'og': return 'bg-green-600 border-red-600';
            default: return '';
        }
    }, [type, penalty]);

    return(
        <>
            <div className="flex items-start justify-center">
                <span className={twMerge("flex items-center justify-center w-6 h-6 text-xs text-white rounded-full border-2", backgroundColor)}>
                    {time}
                </span>
                {addedTime > 0 && (
                    <strong className="flex items-center justify-center text-xs text-slate-800 leading-3 font-bold">
                        +{addedTime}
                    </strong>
                )}
            </div>
        </>
    )
});

const MatchResults: FC<{ results: MatchesProps[] }> = (({ results }) => {
    return(
        <>
            {results.length > 0 ? (
            results.map((item, index) => (
                <div key={index} className="bg-white even:bg-blue-100 border border-stone-500 rounded-md">
                    <div className="flex items-center justify-between py-0.5 px-1 border-b border-slate-400">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6">
                                <img src={item.club.imageURL} alt={item.club.short} width="100%" height="100%" />
                            </div>
                            <span className="block text-sm leading-5">
                                {item.club.name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5">
                                <img src={item.league.logoURL} alt={item.league.title} width="100%" height="100%" />
                            </div>
                            <span className="inline-block text-xs text-slate-800 font-sans">
                                {`${item.league.stage}, ${item.matchday.dateShort}`}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-0.5 py-0.5 px-1">
                        <div className="flex items-center justify-center space-x-1">
                            <div className="flex items-center justify-center">
                                <span className={`block w-5 h-5 rounded-md ${item.result === -1
                                    ? 'bg-red-500' : item.result === 1 ? 'bg-green-500' : 'bg-slate-800'
                                }`}></span>
                            </div>
                            <span className={`flex items-center justify-center text-sm font-bold border border-stone-400 leading-4 px-0.5 rounded-sm ${item.location === 0
                                ? 'bg-yellow-400 text-slate-800'
                                : 'bg-blue-600 text-white'}`}
                            >
                                {item.location === 0 ? 'A' : 'H'}
                            </span>
                        </div>
                        <div className="w-full flex flex-row-reverse items-center justify-start gap-1 h-6">
                            {item.scores.map((score, scoreIndex) => (
                                <ScoreBlock key={scoreIndex} {...score} />
                            ))}
                        </div>
                        <div className="flex items-center">
                            <strong className="block w-7 text-right text-2xl font-semibold leading-5">
                                {item.score.home}
                            </strong>
                            <span className="block w-3 text-center text-xl font-semibold leading-5">:</span>
                            <strong className="block w-7 text-left text-2xl font-semibold leading-5">
                                {item.score.away}
                            </strong>
                        </div>
                    </div>
                </div>
            ))) : (
                <div className="border border-red-500 p-1">
                    <span className="border border-red-500 p-1">
                        No results available
                    </span>
                </div>
            )}
        </>
    )
});

const GridResult: FC<MatchComplianceProps> = ((props) => {
    // const { club, matches } = props;
    
    const [matchesData, setMatchesData] = useState<MatchesProps[]>(props.matches);

    const filterMatches = (option: string) => {
        if (option === 'bal') {
            const filteredData = props.matches.filter((el) => 
            el.scores.find((obj, index) => (obj.type.includes('GA') && index === 0)));
            setMatchesData(filteredData);
        } else {
            setMatchesData(props.matches);
        }
    }

    return(
        <div className="w-full sm:w-[400px] mx-auto space-y-4 border border-stone-500 rounded-md py-2">
            <div className="flex items-center space-x-3 px-2">
                <div className="w-12 h-12">
                    <img src={props.club.imageURL} alt={props.club.name} width="100%" height="100%" />
                </div>
                <span className="block text-2xl text-slate-600">
                    {props.club.name}
                </span>
            </div>
            <div className="flex justify-between mx-2">
                <div className="flex items-center space-x-1 py-0.5 px-1 bg-stone-500 border border-stone-800 rounded-md">
                    <input
                        type="radio"
                        id="matchAll"
                        name="reverse-radio"
                        className="w-4 h-4"
                        onClick={() => filterMatches('all')}
                    />
                    <label htmlFor="matchAll" className="block text-white leading-5">
                        Default
                    </label>
                </div>
                <div className="flex items-end space-x-1">
                    <span className="block text-slate-800 font-semibold text-base">
                        Matches:
                    </span>
                    <strong className="block text-slate-800 font-bold text-lg">
                        {matchesData.length}
                    </strong>
                </div>
                <div className="flex items-center space-x-1 py-0.5 px-1 bg-stone-500 border border-stone-800 rounded-md">
                    <input
                        type="radio"
                        id="matchBalances"
                        name="reverse-radio"
                        className="w-4 h-4"
                        onClick={() => filterMatches('bal')}
                    />
                    <label htmlFor="matchBalances" className="block text-white leading-5">
                        Balance
                    </label>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-1 mx-1">
                <MatchResults results={matchesData} />
            </div>
        </div>
    )
});

const MatchCompliance = () => {
    const matchData = matchComplianceJSON.data.map(el => 
        el.clubs.find(obj => obj.club.short === "B04"))[0];
    
    return (
        <div className="my-4 mx-1">
            <h4 className="text-2xl text-center font-sans mb-3 uppercase">Scored Matches</h4>
            {matchData !== undefined
            ? (<GridResult {...matchData} />)
            : (
                <div className="border border-red-500">
                    no data available
                </div>
            )}
        </div>
    )
}

export default MatchCompliance;
