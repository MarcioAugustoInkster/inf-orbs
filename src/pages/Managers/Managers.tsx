import { useParams } from 'react-router-dom';
import { Tab, TabPanel, TabsList } from '../../components/Tabs/Tabs';
import { Tabs } from '@mui/base';
import Section from '../../components/Custom/Section/Section';
import ClubMatch from '../../components/Custom/Stats/Group/ClubMatch';
import matchData from '../../assets/json/clubs/match-data.json';
import PlayerMatch from '../../components/Custom/Stats/Group/PlayerMatch';
import TeamSquad from '../../components/Custom/Stats/TeamSquad';

const Managers = () => {
    const { country, club } = useParams();
    
    const resultData = matchData.data.find(el => el.countryAbbrev === country && el.clubAbbrev === club);
    
    const tabIndexes = [
        'Progress', 'Analisys', 'Squad'
    ];

    return (
        <Section header="Trainer Evaluation">
            <Tabs defaultValue={0}>
                <TabsList>
                    {tabIndexes.map((item, index) => <Tab value={index} key={index}>{item}</Tab>)}
                </TabsList>
                <TabPanel value={0}>
                    <ClubMatch data={resultData?.evaluation.managers} />
                </TabPanel>
                <TabPanel value={1}>
                    <PlayerMatch data={resultData?.evaluation.players} />
                </TabPanel>
                <TabPanel value={2}>
                    <TeamSquad data={resultData?.evaluation.nationalities} />
                </TabPanel>
            </Tabs>
        </Section>
    )
}

export default Managers;
