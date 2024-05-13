import { FC } from 'react'
import { ManagerProps } from './ClubProps';

const ManagerStats: FC<{data: ManagerProps}> = (({ data }) => {
    const getStatus = (status: number) => {
        switch (status) {
            case 0:
                return 'in activity';
            case 1:
                return 'absent';
            case 2:
                return 'unavailable';
            default:
                return 'out of activity';
        }
    }
    return (
        <div className="w-full md:w-[360px] bg-gradient-to-bl from-slate-800 to-indigo-900 border-x border-t md:border-y md:border-r-0 md:border-l border-sky-600 pt-16 pb-4 px-1 rounded-t-md md:rounded-tr-none md:rounded-tl-md md:rounded-bl-md">
            {data === undefined
                ? <div className="border border-red-500 p-1">There's no data</div>
                : <ul className="flex flex-col gap-1">
                    {Object.entries(data).map((item, index) => (
                        <li key={index} className="flex items-center justify-between relative border-b-2 border-sky-600 bg-gradient-to-bl from-slate-700 to-indigo-800 py-0 px-4 rounded-none">
                            <span className="block text-slate-200 text-lg capitalize">{item[0]}:</span>
                            {item[0].match('image') ?
                                <div className="absolute right-3 bottom-0 w-20 h-20 border border-slate-400 rounded-md">
                                    <img src={item[1].toString()} alt={''} width="100%" height="100%" className="rounded-md" />
                                </div>
                                :
                                <strong className="block absolute right-3 top-1 text-white font-[calibri] text-2xl">
                                    {item[0].match('age') ? `${item[1]} years` : (!item[0].match('status') ? item[1] : '')}
                                    {item[0].match('status') ? getStatus(Number(item[1])) : ''}
                                </strong>
                            }
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
})

export default ManagerStats;
