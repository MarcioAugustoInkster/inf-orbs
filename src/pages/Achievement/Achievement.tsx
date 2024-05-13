import { useParams } from 'react-router-dom'
import { loadAchievementsByParam } from '../../utils/functions/AchievementFunction';
import Section from '../../components/Custom/Section/Section';
import TableGrid from '../../components/Custom/TableGrid/TableGrid';

const Achievement = () => {
    const { country } = useParams();

    const jsonLocalData = loadAchievementsByParam(country);
    
    return (
        <Section title={`Throphy gallery of ${country?.toUpperCase()}`}>
            <div className="py-2 px-1 bg-slate-50 border border-slate-300 rounded-lg">
                <TableGrid item={jsonLocalData?.item} />
            </div>
            <div className="mt-8 mb-4">
                <h4 className="text-md mb-2 border-b border-slate-500">Legend:</h4>
                <ul className="inline-block even:bg-slate-100 px-6">
                    <li className="list-none py-1">
                        <span className="inline-block font-semibold text-blue-500 w-20">[n]</span>
                        <strong className="inline-block font-semibold text-slate-600 text-sm">Number of relegations</strong>
                    </li>
                </ul>
            </div>
        </Section>
    )
}

export default Achievement;
