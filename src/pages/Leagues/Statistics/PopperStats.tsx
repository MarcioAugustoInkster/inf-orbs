import { FC, MouseEvent, useState } from 'react';
import { PopperStatsPropis } from '../../../components/Popper/PopperPropis';
import { MatchProps, ResultProps } from '../../../components/Custom/Stats/ClubProps';
import Popper from '../../../components/Popper/Popper';
import resultData from '../../../assets/json/clubs/bayer-leverkusen/managers-mock.json';

const RowBlock: FC<{ data?: MatchProps }> = (({ data }) => {
    return(
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 w-full">
                <div className="w-[18px] h-[18px]">
                    <img
                        src={data?.logo}
                        alt={data?.club?.normal}
                        width="100%"
                        height="100%"
                    />
                </div>
                <span className="block">{data?.club?.normal}</span>
            </div>
            <span className="block">{data?.score}</span>
        </div>
    )
});

const PopperStats: FC<PopperStatsPropis> = (({ count, element }) => {
    const [matchday, setMatchday] = useState<ResultProps>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (anchorEl === null) {
            const matchResult = resultData.data[0].results.find(res => res.code === element.code);
            if (matchResult !== undefined) {
                setMatchday(matchResult);
            }
        }
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div className="leading-3">
            <button
                type="button"
                aria-describedby={id}
                onClick={handleClick}
                className={`flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px] lg:w-6 lg:h-6 rounded-full border border-slate-400 ${element.result.length === 0
                    ? 'text-black' : 'text-white'} ${element.result === 'w'
                        ? 'bg-green-600' : element.result === 'l'
                            ? 'bg-red-600' : element.result === 'd'
                                ? 'bg-slate-800' : 'bg-white'}`}
            >
                <span className="block text-center text-[9px] md:text-[10px] lg:text-sm leading-5">
                    {(count + 1)}
                </span>
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div className="flex flex-col text-xs mb-1 border-b border-slate-400">
                    <span className="block">{matchday?.league}</span>
                    <div className="flex items-center gap-3 w-full">
                        <span className="inline-block capitalize">
                            {typeof matchday?.round === 'number'
                                ? `round ${matchday?.round}`
                                : matchday?.round}
                        </span>
                        <span className="inline-block">{matchday?.matchday.normal}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <RowBlock data={matchday?.home} />
                    <RowBlock data={matchday?.away} />
                </div>
            </Popper>
        </div>
    );
});

export default PopperStats;
