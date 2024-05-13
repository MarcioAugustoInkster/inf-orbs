import { FC, useState } from 'react';
import { MatchTimeProps } from './ClubProps';

function groupElements(array: MatchTimeProps[]) {
    return array.reduce((group: {[ key: string ]: MatchTimeProps[]}, item) => {
        if (!group[item.league]) {
            group[item.league] = []
        }
        group[item.league].push(item);
        return group;
    }, {});
}

const PlayerStats: FC<{data: MatchTimeProps[]}> = (({ data }) => {
    const groupData = useState<{ [key: string]: MatchTimeProps[]; }>(groupElements(data));

    return data.length > 0 && (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-end gap-1.5 leading-3">
                {Object.entries(groupData[0]).sort((x, y) => x[0].localeCompare(y[0])).map((item, index) => (
                    <div key={index} className="flex items-end gap-2">
                        <div className="w-full">
                            <span className="block text-slate-300">{item[0]}:</span>
                        </div>
                        <div className="flex items-end w-auto">
                            <strong className="flex items-end leading-3 text-slate-100 text-md">
                                {item[1].length}
                            </strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
})

export default PlayerStats;
