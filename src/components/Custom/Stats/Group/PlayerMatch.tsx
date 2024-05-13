import { FC, useMemo } from 'react'
import { MatchTimeProps, PlayerProps } from '../ClubProps';
import { twMerge } from 'tailwind-merge';
import { EnumStatusPlayer } from '../../../../enum/EnumStatusPlayer';
import Icon from '../../Icon/Icon';
import PlayerStats from '../PlayerStats';

const StatusMark: FC<{ status: number }> = (({ status }) => {
    const statusStyling = useMemo(() => {
        switch (status) {
            case 0: return 'text-lime-400';
            case 1: return 'text-yellow-400';
            case 2: return 'text-blue-400';
            case 3: return 'text-red-400';
        }
    }, [status]);

    return(
        <span className={twMerge(
            "absolute block ml-1 text-sm leading-5 font-sans font-semibold capitalize", statusStyling
        )}>{EnumStatusPlayer[status]}</span>
    )
});

const ScoreBoard: FC<{ data: MatchTimeProps[], title: string }> = ((props) => {
    const { data, title } = props;

    const convertDatetime = useMemo(() => {
        if (data.length > 0) {
            const date = data[0].matchdayCode.toString();
            const year = Number(date.slice(0, 4));
            const month = Number(date.slice(4, 6));
            const day = Number(date.slice(6, 8));
            const datetime = new Date(year, (month - 1), day);
            const currentDate = new Date().getTime();
            const days = Math.round((currentDate - datetime.getTime()) / (1000 * 3600 * 24));
            return {
                date: datetime.toLocaleDateString(),
                days: days
            };
        }
    }, [data]);
    
    return(
        <>
            {props.data.length > 0 && (
                <div className="text-sm">
                    <div className="flex items-end justify-between">
                        <span className="block text-slate-300 leading-4 font-sans">
                            Last {title}
                        </span>
                        {/* <span className="block leading-3 text-white">
                            '{data[0].time}{data[0].extratime > 0 && `+${data[0].extratime}`}
                            {data[0].penalty ? '(P)' : ''}
                        </span> */}
                    </div>
                    <div className="flex flex-col pl-1.5">
                        {/* <span className="block text-white leading-4 font-sans">
                            {data[0].league}
                        </span> */}
                        <div className="flex items-end justify-between">
                            <span className="block text-white leading-4 font-sans">
                                {data[0].league}
                            </span>
                            <span className="block text-white leading-4 font-sans">
                                {data[0].time}'{data[0].extratime > 0 && `+${data[0].extratime}`}
                                {data[0].penalty ? '(P)' : ''}
                            </span>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="block text-white leading-4 font-sans">
                                {convertDatetime?.date}
                            </span>
                            <span className="block text-white leading-4 font-sans">
                                {convertDatetime?.days} days ago
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
});

const PlayerMatch: FC<{ data?: PlayerProps[] }> = (({ data }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.sort((a, b) => 
                (b.goals.length - a.goals.length) || 
                (a.yellowCards.length - b.yellowCards.length)).map((result, index) => (
                <div key={index} className="flex flex-col gap-2 py-2 px-2 relative bg-gradient-to-bl from-slate-800 to-indigo-900 border border-sky-500 rounded-md">
                    <StatusMark status={result.status} />
                    <div className="flex justify-end gap-1 items-end mb-1 pb-1 border-b border-slate-400">
                        <span className="inline-block text-white text-xl text-right leading-5 mb-1">
                            {result.fullname}
                        </span>
                        <img
                            src={result.image}
                            alt={result.fullname}
                            className="w-20 h-20 rounded-full"
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className="flex flex-col items-end gap-4 pr-1">
                        <div className="flex flex-row-reverse items-center justify-start gap-3">
                            <div className="flex items-end w-14">
                                <Icon icon="crosshair2" color="success" size="lg" />
                                <strong className="text-xl text-center text-white w-7 font-bold">{result.goals.length}</strong>
                            </div>
                            <PlayerStats data={result.goals} />
                        </div>
                        <div className="flex flex-row-reverse items-center justify-start gap-3">
                            <div className="flex items-center w-14">
                                <div className="w-4 h-6 mx-1 bg-yellow-500 border-2 border-yellow-600 rounded-sm"></div>
                                <strong className="text-xl text-center text-white w-7 font-bold">{result.yellowCards.length}</strong>
                            </div>
                            <PlayerStats data={result.yellowCards} />
                        </div>
                        <div className="flex flex-row-reverse items-center justify-start gap-3">
                            <div className="flex items-center w-14">
                                <div className="w-4 h-6 mx-1 bg-red-500 border-2 border-red-600 rounded-sm"></div>
                                <strong className="text-xl text-center text-white w-7 font-bold">{result.redCards.length}</strong>
                            </div>
                            <PlayerStats data={result.redCards} />
                        </div>
                    </div>
                    {result.status === 0 && (
                        <div className="mt-auto space-y-1 from-zinc-800 bg-gradient-to-tr border border-zinc-600 p-1 rounded-sm">
                            <ScoreBoard data={result.goals.slice(-1)} title="Goal" />
                            <ScoreBoard data={result.yellowCards.slice(-1)} title="Yellow Card" />
                            <ScoreBoard data={result.redCards.slice(-1)} title="Red Card" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
})

export default PlayerMatch;
