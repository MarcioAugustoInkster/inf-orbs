import { FC } from 'react'
import { PlayerStats } from './ClubProps';
import { calcAgeByBirthDate } from '../../../utils/functions/AgeCalculator';

const TeamSquad: FC<{data?: PlayerStats[]}> = (({ data }) => {
    return data !== undefined && (
        <div className="grid grid-cols-1 w-full xs:w-[360px] mx-auto sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2 md:p-3 bg-slate-800 border-2 border-yellow-500 rounded-md">
            {data?.sort((x, y) => x.nationality.country.localeCompare(y.nationality.country)).map((item, index) => (
                <div key={index} className="bg-gradient-to-bl from-slate-800 to-indigo-900 border border-sky-500 p-1 rounded-md">
                    <div className="flex w-full justify-end mb-3">
                        <div className="flex items-end border-b-2 border-slate-500">
                            <h6 className="text-slate-100 text-lg sm:text-base md:text-base text-right px-1 leading-5">{item.name}</h6>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-slate-500">
                            <img src={item.image} alt={item.name} width="100%" height="100%" className="h-full rounded-full" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="w-full md:w-2/4 text-right">
                            <span className="block text-slate-200">Posistion:</span>
                        </div>
                        <div className="w-full text-left">
                            <strong className="block text-white">{item.number} - {item.position}</strong>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 pt-0.5 pb-1">
                        <div className="w-full md:w-2/4 text-right">
                            <span className="block text-md text-slate-300 leading-3">Born in:</span>
                        </div>
                        <div className="flex items-center justify-start gap-2 w-full">
                            <strong className="inline-block leading-4 w-auto text-slate-100">
                                {item.nationality.country}
                            </strong>
                            <div className="block w-6 h-auto border border-slate-600">
                                <img src={item.nationality.flag} alt={item.nationality.country} width="100%" height="100%" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 py-0.5">
                        <div className="w-full md:w-2/4 text-right">
                            <span className="block text-slate-300">Birth:</span>
                        </div>
                        <div className="w-full text-left">
                            <strong className="block text-white">{item.birthDate.replaceAll('-', '/')}</strong>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="w-full md:w-2/4 text-right">
                            <span className="block text-slate-300">Age:</span>
                        </div>
                        <div className="w-full text-left">
                            <strong className="block text-white">{calcAgeByBirthDate(item.birthDate)} years</strong>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
})

export default TeamSquad;
