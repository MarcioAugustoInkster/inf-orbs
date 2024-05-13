import { FC } from 'react'
import { AchievementProps } from '../../../interfaces/Achievement.interface'

const TableGrid: FC<AchievementProps> = (({ item }) => {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="w-full sm:w-auto">
                        <div className="w-full"></div>
                    </th>
                    {item?.championships?.sort((a, b) => a.index - b.index).map((data, key) =>
                        <th key={key} className="px-[2px] sm:px-2 border-b border-slate-300 pb-1">
                            <div className="flex flex-col items-center">
                                <div className="flex items-baseline w-8 h-8 md:w-10 md:h-10 leading-none">
                                    <img src={data.image} alt={data.league} width="100%" height="100%" />
                                </div>
                            </div>
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {item !== undefined && item?.clubs?.map((data, index) =>
                    <tr key={index} className="even:bg-slate-50 odd:bg-white">
                        <td className="border border-slate-300">
                            <div className="flex items-center gap-2 py-1 pl-3 sm:px-4">
                                <div className="w-6 h-6 sm:w-8 sm:h-8">
                                    {data.icon.length > 0
                                    ? <img src={data.icon} alt={data.name} width="100%" height="100%" />
                                    : <span className="block w-6 h-6 sm:w-8 sm:h-8 border border-slate-400 rounded-full"></span>}
                                </div>
                                <span className="font-semibold text-md hidden invisible sm:visible sm:block">
                                    {data.name}
                                    {data.relegations.length > 0 &&
                                    <strong className="font-semibold text-xs ml-px text-blue-500 font-mono">
                                        [{data.relegations.length}]
                                    </strong>}
                                </span>
                                <span className="font-semibold text-md block visible sm:invisible sm:hidden">
                                    {data.abbrev}
                                    {data.relegations.length > 0 &&
                                    <strong className="font-semibold text-xs ml-px text-blue-500 font-mono">
                                        [{data.relegations.length}]
                                    </strong>}
                                </span>
                            </div>
                        </td>
                        {Object.entries(data.trophies).map(([key, values]) =>
                            (!item.hiddenColumns.includes(key) &&
                            <td key={key} className="w-full sm:w-auto border border-slate-300">
                                <span className="block text-center font-semibold text-md">{values.length}</span>
                            </td>
                            )
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
});

export default TableGrid