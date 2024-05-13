import Section from '../../../components/Custom/Section/Section';
import leagueSequenceData from '../../../assets/json/league/season-sequence-mock.json';
import PopperStats from './PopperStats';

const Statistics = () => {
    const results = [
        { result: 'w', label: 'Win', color: 'bg-green-600' },
        { result: 'd', label: 'Draw', color: 'bg-slate-800' },
        { result: 'l', label: 'Loss', color: 'bg-red-500' },
    ];

    return (
        <Section header="League Statistics" subheader="Evaluation of the League Season 2023/24">
            <div className="">
                <ul className="mx-auto mb-2 w-60 bg-slate-100 p-2 rounded-lg border-l-4 border-l-slate-400 border border-slate-300">
                    {results.map((item, index) => (
                        <li className="flex items-center gap-2" key={index}>
                            <span className={`block w-4 h-4 border border-slate-400 rounded-full ${item.color}`}></span>
                            <strong className="block font-semibold font-sans">{item.label}</strong>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-start justify-center w-full py-2 px-px md:px-2 bg-slate-400 border border-slate-300 rounded-lg">
                <div className="flex flex-row md:flex-col w-full sm:gap-1 md:gap-2">
                    {leagueSequenceData?.data.sort((x, y) => x.name.localeCompare(y.name)).map((item, index) => (
                        <div className="space-y-1 py-1 px-px w-full md:px-1 bg-white border border-slate-300 rounded-lg shadow-sm shadow-slate-400" key={index}>
                            <div className="flex items-center justify-center md:justify-start md:gap-2">
                                <div className="flex items-center w-[18px] h-[18px] md:w-8 md:h-8">
                                    <img src={item.logo} alt={item.name} width="100%" height="100%" />
                                </div>
                                <span className="hidden md:block invisible md:visible font-sans font-bold text-slate-600 text-sm md:text-2xl leading-5">
                                    {item.name}
                                </span>
                            </div>
                            <ul className="flex flex-col md:flex-row items-center md:justify-between border-t-2 border-slate-300 pt-0.5">
                                {item.results.map((el, key) => (
                                    <li key={key}>
                                        <PopperStats count={key} element={el} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default Statistics;
