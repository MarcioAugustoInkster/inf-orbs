import trophyJsonData from '../../assets/json/achievements/trophy-data-mock.json';
import { AchievementProps } from '../../interfaces/Achievement.interface';

export const loadAchievementsByParam = (country?: string): AchievementProps | undefined => {
    const items = trophyJsonData.data.find(el => el.country === country);
    if (items !== undefined) {
        items?.item.clubs.sort((x, y) => (
            (y.trophies.primaryLeague.length - x.trophies.primaryLeague.length) ||
            (y.trophies.continentalPrimaryLeague.length - x.trophies.continentalPrimaryLeague.length) ||
            (y.trophies.intercontinentalCup.length - x.trophies.intercontinentalCup.length) ||
            (y.trophies.primaryCup.length - x.trophies.primaryCup.length) ||
            (y.trophies.primarySuperCup.length - x.trophies.primarySuperCup.length) ||
            (y.trophies.contientalCup.length - x.trophies.contientalCup.length) ||
            (y.trophies.continentalSecondaryLeague.length - x.trophies.continentalSecondaryLeague.length) ||
            (y.trophies.secondaryLeague.length - x.trophies.secondaryLeague.length) ||
            (x.name.localeCompare(y.name))
        ));
    }
    return items;
}