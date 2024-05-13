import { FC, useMemo } from "react";
import Icon from "../Icon/Icon";

type MenuIconProps = {
    index: number;
}

const MenuIcon: FC<MenuIconProps> = (({ index }) => {
    const iconStyle = useMemo(() => {
        switch (index) {
            case 0: return 'house-fill';
            case 1: return 'trophy-fill';
            case 2: return 'globe2';
            case 3: return 'bar-chart-line-fill';
            case 4: return 'speedometer';
            case 5: return 'table';
            case 6: return 'diagram-3-fill';
            case 7: return 'calendar-week';
            default: return '';
        }
    }, [index]);

    return (
        <Icon icon={iconStyle} color="white" size="md" />
    )
});

export default MenuIcon;
