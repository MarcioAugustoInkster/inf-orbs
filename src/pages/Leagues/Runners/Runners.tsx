import { FC, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { GroupBoxProps, MatchProps, NoteBoxProps } from './RunnersType';
import runnerList from './runners-bundesliga.json';

const NoteBox: FC<NoteBoxProps> = ((props) => {
    const { label, content } = props;
    
    return(
        <>
            <div className="flex items-center gap-1 py-0.5 px-2 border border-l-4 border-red-600 rounded-sm">
                <span className="block text-sm leading-5">{label}:</span>
                <strong className="block font-bold text-sm text-slate-800">{content}</strong>
            </div>
        </>
    )
});

const GroupBox: FC<GroupBoxProps> = (({ items, points, setPointsSum, round }) => {
    const [itemsData, setItemsData] = useState<MatchProps[]>([]);
    const isLoadedRef = useRef<boolean>(false);
    
    useEffect(() => {
        if (!isLoadedRef.current) {
            const prevState = [...items];
            let ptsSum = points;
    
            prevState.map((el) => {
                const updEl = {...el};
                if (el.result.type === 'w') {
                    ptsSum = ptsSum + 3;
                } else if (el.result.type === 'd') {
                    ptsSum = ptsSum + 1;
                }
                updEl['result'].currentPoints = ptsSum;
            });
            setItemsData(prevState);
            setPointsSum(prev => [...prev, ptsSum]);
        }
        return () => {
            isLoadedRef.current = true;
        }
    }, [items, points, setPointsSum]);

    return(
        <>
            {itemsData.map((el, index) => (
                <div className="flex flex-col items-center w-12 bg-white border border-blue-500 p-0.5 rounded-sm" key={index}>
                    <span className={`block text-center leading-4 font-bold font-mono w-full mb-1 border ${el.home
                        ? 'bg-blue-600 text-white border-blue-800'
                        : 'bg-gray-300 text-slate-800 border-slate-400'}`}
                    >
                        {round + (index + 1)}
                    </span>
                    <div className="w-6 h-6">
                        <img
                            src={el.logo}
                            alt={el.normal}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <span className="block text-sm font-bold">{el.abbrev}</span>
                    <div className={twMerge(`w-4 h-4 ${el.result.type === 'w'
                        ? 'bg-green-500' : el.result.type === 'd'
                        ? 'bg-slate-800' : el.result.type === 'l'
                        ? 'bg-red-500' : 'bg-white'} border border-slate-400 rounded-full`)}></div>
                    <span className="block text-md leading-5 font-bold">{el.result.currentPoints}</span>
                </div>
            ))}
        </>
    )
});

const Runners = () => {
    const [pointsSum, setPointsSum] = useState<number[]>([]);
    
    const jsonData = runnerList.data;
    
    const calcDistance = (index: number) => {
        return index === 0
            ? pointsSum[index] - pointsSum[(index + 1)]
            : pointsSum[index] - pointsSum[(index - 1)]
    };

    const calcAmount = (items: MatchProps[]) => {
        const rest = items.filter(el => el.result.type === '');
        return rest.length * 3;
    };

    const calcRecord = (items: MatchProps[], index: number) => {
        const amount = calcAmount(items);
        const distance = calcDistance(index);
        return index === 0
            ? (amount - distance) + 1
            : amount
    }
    
    return (
        <div className="my-4 mx-1 md:mx-2">
            {runnerList === undefined ?
            (
                <div className="">
                    <span>No records</span>
                </div>
            ) : (
                <div className="w-[520px] mx-auto py-2">
                    <div className="flex gap-2">
                        <div className="w-10 h-10">
                            <img
                                src={jsonData.league.image}
                                alt={jsonData.league.name}
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <span className="block text-3xl font-bold">{jsonData.league.name}</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="block">Starting Round:</span>
                        <strong className="block font-bold text-xl">{jsonData.currentRound}</strong>
                    </div>
                    <div className="border-2 border-red-600 bg-red-500 py-2 px-1 rounded-md">
                        <span className="block text-3xl mb-1 text-white ml-3">Club Runners</span>
                        <div className="flex flex-col gap-2 py-1">
                            {jsonData.clubs.map((item, index) => (
                                <div key={index} className="flex flex-col gap-1 py-2 md:px-4 bg-white border border-blue-300 rounded-md">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8">
                                            <img
                                                src={item.club.logo}
                                                alt={item.club.normal}
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                        <span className="block text-xl font-bold">{item.club.normal}</span>
                                    </div>
                                    <div className="flex items-start gap-1 my-0.5">
                                        <NoteBox label="Start" content={`${item.startingPoints} pts`} />
                                        <NoteBox
                                            label="Distance"
                                            content={`${calcDistance(index)} pts`}
                                        />
                                        <NoteBox label="Available" content={`${calcAmount(item.matches)} pts`} />
                                        <NoteBox
                                            label="Finish"
                                            content={`${calcRecord(item.matches, index)} pts`}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GroupBox
                                            items={item.matches}
                                            points={item.startingPoints}
                                            round={jsonData.currentRound}
                                            setPointsSum={setPointsSum}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Runners;
