import { FC } from 'react'
import { ManagerStatsProps } from '../ClubProps';
import MatchGrid from './MatchGrid';
import EvaluationStats from '../EvaluationStats';
import ManagerStats from '../ManagerStats';

const ClubMatch: FC<{ data?: ManagerStatsProps[] }> = (({ data }) => {
    return data?.map((item, index) => (
        <div key={index} className="flex flex-col">
            <div className="flex flex-col md:flex-row items-stretch justify-center bg-slate-900 py-4 px-2 rounded-md border-none">
                <ManagerStats data={item.profile} />
                <EvaluationStats data={item.results} />
            </div>
            <MatchGrid results={item.results} />
        </div>
    ))
})

export default ClubMatch;
