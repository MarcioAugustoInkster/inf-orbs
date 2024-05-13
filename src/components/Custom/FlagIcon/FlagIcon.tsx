import { FC } from 'react';
import { IContext } from '../../../@types/Context.types';
import { Flag } from '../../../utils/Flag';

const FlagIcon: FC<IContext> = ({ country = 'us', language = 'English' }) => {
    return (
        <picture className="mx-1">
            <source
                type="image/webp"
                srcSet={Flag(country.toLowerCase(), false)}
            />
            <source
                type="image/png"
                srcSet={Flag(country.toLowerCase())}
            />
            <img
                loading="lazy"
                src={Flag(country.toLowerCase())}
                width="20"
                height="14"
                alt={`Flag of ${language}`}
            />
        </picture>
    )
}

export default FlagIcon;
