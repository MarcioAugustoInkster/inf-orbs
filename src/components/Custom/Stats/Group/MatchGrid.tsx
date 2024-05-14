import { FC, useMemo, } from 'react'
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon/Icon';
import { MatchComplianceProps, MatchesProps, ScoreProps } from '../ClubProps';

const ScoreView: FC<ScoreProps> = ((props) => {
    const { time, profileURL, addedTime, type, penalty } = props;

    const backgroundColor = useMemo(() => {
        switch(type) {
            case 'GS':
                return penalty ? "bg-blue-600" : "bg-green-600";
            case 'GA':
                return "bg-red-600";
            case 'OG':
                return "bg-green-600";
            default:
                return "bg-white";
        }
    }, [type, penalty]);

    return(
        <div className="flex flex-col items-center w-[38px] space-y-0.5">
            <span className={twMerge("block leading-4 text-center text-xs text-white font-mono px-1 rounded-full", backgroundColor)}>
                {`${time}${addedTime > 0 ? `+${addedTime}` : ''}`}
            </span>
            <div className="flex items-center justify-center w-[36px] h-[36px]">
                {profileURL.length > 0 && (
                    <img src={profileURL} alt={`${type}-${time}`} width="100%" height="100%" />
                )}
                {type === 'GA'
                    ? <Icon icon="x-octagon-fill" color="danger" size="md" />
                        : type === 'OG'
                        ? <Icon icon="check-circle-fill" color="black" size="md" />
                    : ''}
            </div>
        </div>
    )
});

const MatchResult: FC<MatchComplianceProps> = (({ matches }) => {
    return(
        <div className="space-y-4">
            <div className="flex flex-col-reverse gap-1">
                {matches.map((item, index) => (
                    <div key={index} className="flex border border-stone-400 py-0.5 rounded-md">
                        <div className="flex flex-col items-center justify-center space-y-2 px-0.5">
                            <div className="w-8 h-8">
                                <img src={item.league.logoURL} alt={item.league.title} width="100%" height="100%" />
                            </div>
                            <span className="block text-center text-xs font-semibold font-mono">
                                {item.league.stage}
                            </span>
                        </div>
                        <div className="w-full pl-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 py-0.5">
                                    <div className="w-6 h-6">
                                        <img src={item.club.imageURL} alt={item.club.name} width="100%" height="100%" />
                                    </div>
                                    <strong className="block text-slate-800 text-md font-semibold font-mono">
                                        {item.club.name}
                                    </strong>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="block leading-4 text-base font-sans">
                                        {item.location === 0 ? 'A' : 'H'}
                                    </span>
                                    <div className="flex items-center">
                                        <strong className="block text-slate-800 font-mono text-xl text-right leading-5 w-5">{item.score.home}</strong>
                                        <span className="block px-0.5 leading-5">:</span>
                                        <strong className="block text-slate-800 font-mono text-xl text-left leading-5 w-5">{item.score.away}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse items-center justify-start px-1">
                                {item.scores.map((score, key) => (
                                    <ScoreView key={key} {...score} />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
});

const MatchGrid: FC<{results: MatchesProps[]}> = (({ results }) => {
    const legendItems = {
        location: [
            { text: 'H', label: 'Home' },
            { text: 'A', label: 'Away' },
        ],
        results: [
            { label: 'Scored', bgColor: 'bg-green-600' },
            { label: 'Against', bgColor: 'bg-red-600' },
            { label: 'Own Goal', bgColor: 'bg-slate-800' },
            { label: 'Penalty', bgColor: 'bg-blue-600' },
        ]
    }

    return(
        <>
            <div className="flex flex-col">
                <div className="flex items-center justify-center">
                </div>
                <div className="w-full">
                    <div className="w-[380px] md:w-2/3 mx-auto my-4 p-1 bg-white space-y-5 rounded-md">
                        <div className="flex items-center justify-center bg-stone-600 py-1 border border-stone-800 rounded-md">
                            <span className="block text-white font-mono text-xl leading-5">
                                Matches: {results.length}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-evenly">
                                {legendItems.location.map((legend, index) => (
                                    <div key={index} className="flex items-center justify-center space-x-3">
                                        <span className="block text-base font-sans uppercase">{legend.text}</span>
                                        <span className="block font-mono text-base capitalize">
                                            {legend.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between">
                                {legendItems.results.map((legend, index) => (
                                    <div key={index} className="flex items-center justify-center space-x-1">
                                        <div className={twMerge("w-4 h-4 border border-slate-500 rounded-md", legend.bgColor)}></div>
                                        <span className="block text-slate-800 font-mono text-base capitalize">
                                            {legend.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {results.length === 0
                        ? <div className="">
                            <span className="block">No records available</span>
                        </div>
                        : <MatchResult matches={results} />}
                    </div>
                </div>
            </div>
        </>
    )
})

export default MatchGrid;
