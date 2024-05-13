import { Link } from 'react-router-dom';
import SocialMedias from '../../utils/LazyData/SocialMedia';

const MediaLinks = () => {
    return(
        <div className="flex justify-center w-full p-2">
            {SocialMedias?.map((item, index) =>
                <Link key={index} to={`${item.link}`} className="block mx-4">
                    <i className={`bi bi-${item.name} text-2xl text-slate-100`}></i>
                </Link>
            )}
        </div>
    )
}

export default MediaLinks;
