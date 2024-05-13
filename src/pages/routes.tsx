import { RouteObject } from 'react-router-dom';
import App from '../App';
import NotFound from './NotFound/NotFound';
import Region from './Region/Region';
import Achievement from './Achievement/Achievement';
import Managers from './Managers/Managers';
import LeagueList from './Leagues/LeagueList';
import Statistics from './Leagues/Statistics/Statistics';
import Runners from './Leagues/Runners/Runners';
import TableSeason from './Table/TableSeason';
// import Graphics from './graphics/Graphics';
import MatchCompliance from './Compliance/MatchCompliance';
import Home from './Home/Home';

const Routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                id: 'home',
                element: <Home />
            },
            {
                id: 'Achievements',
                path: 'achievements',
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        id: 'region',
                        element: <Region />,
                    },
                    {
                        id: 'location',
                        path: ':local/:country',
                        element: <Achievement />,
                    }
                ]
            },
            {
                id: 'league',
                path: 'league',
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        id: 'league-list',
                        element: <LeagueList />,
                    },
                    {
                        id: 'manager',
                        path: ':country/:club',
                        element: <Managers />,
                    }
                ]
            },
            {
                id: 'statistics',
                path: 'statistics',
                element: <Statistics />,
            },
            {
                id: 'runners',
                path: 'runners',
                element: <Runners />,
                errorElement: <NotFound />,
            },
            {
                id: 'table',
                path: 'table',
                element: <TableSeason />,
                errorElement: <NotFound />,
            },
            // {
            //     id: 'graphics',
            //     path: 'graphics/ge/b04/2023-2024',
            //     element: <Graphics />,
            //     errorElement: <NotFound />,
            // },
            {
                id: 'matches',
                path: 'matches',
                element: <MatchCompliance />,
                errorElement: <NotFound />,
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
];

export default Routes;
