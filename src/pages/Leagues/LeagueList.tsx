import Section from '../../components/Custom/Section/Section';
import { Link } from 'react-router-dom';
import leaguesData from '../../assets/json/clubs/location-data.json';

const LeagueList = () => {
    const resultData = leaguesData === undefined ? [] : leaguesData.data;

    return (
        <Section header="Leagues" subheader="Choose a club in the list below">
            <div className="flex flex-col w-full md:w-auto p-4">
                <h4 className="text-center uppercase border-b-2 border-slate-500 py-1 text-xl">Football League</h4>
                <ul className="my-4 mx-0">
                    {
                        resultData.map((item, index) => (
                            <li key={index} className="p-1 border border-slate-400 bg-slate-800">
                                <div className="flex items-center gap-1 px-3 bg-white">
                                    <div className="flex items-center w-10 h-10">
                                        <img src={item.icon} alt={item.country} width="100%" height="100%" />
                                    </div>
                                    <h4 className="flex items-center gap-2 py-1 px-2 text-xl">
                                        {item.country}
                                    </h4>
                                </div>
                                <ul className="flex flex-col gap-2 bg-slate-200 border border-slate-400">
                                    {item.clubs.map((obj, key) => (
                                        <li key={key} className="m-2 py-1 px-4 border border-slate-400 bg-slate-600 rounded-full">
                                            <Link to={`/league/${item.abbrev}/${obj.abbrev}`} className="flex items-center gap-2 text-slate-100 rounded-full">
                                                <div className="w-8 h-8">
                                                    <img src={obj.icon} alt={obj.clubName} width="100%" height="auto" className="h-auto" />
                                                </div>
                                                {obj.clubName}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Section>
    )
}

export default LeagueList;
