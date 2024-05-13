import { Link } from 'react-router-dom';
import MuiSidebar from '../../components/Sidebar/MuiSidebar';
import { useState } from 'react';
// import Routes from '../../pages/routes';
// import Languages from '../../utils/LazyData/Languages';
// import { Select, Option } from '../../components/Select/Select';
// import FlagIcon from '../../components/Custom/FlagIcon/FlagIcon';

const Navigation = (() => {
  const [toggled, setToggled] = useState<boolean>(false);

  return (
    <nav className="py-1 px-2 bg-indigo-950">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl">InfOrbs</Link>
        <div className="block">
          <button type="button" onClick={() => setToggled(!toggled)}>
            <i className="bi bi-list font-bold text-white text-4xl"></i>
          </button>
        </div>
      </div>
      {/* <ul className="flex items-center">
        {routes?.map((menu, index) => (
          <li key={index} className="my-2 p-2">
            <Link to={`${menu.path}`} className="p-1 capitalize text-white rounded-sm hover:border-b-2 focus:border-b-2 focus:border-lime-400 focus:text-lime-400 hover:border-lime-200 hover:text-lime-200">
              {menu.id}
            </Link>
          </li>
        ))}
      </ul> */}
      {/* <div className="flex items-center justify-between w-[154px]">
        <FlagIcon country={"us"} language={""} />
        <Select defaultValue={"us"} placeholder="Language">
          {Languages?.map((item, index) => (
            <Option key={index} value={item.country} label={item.language}>
              <FlagIcon country={item.country} language={item.language} />
              {item.language} ({item.country})
            </Option>
          ))}
        </Select>
      </div> */}
      <MuiSidebar toggled={toggled} setToggled={setToggled} />
    </nav>
  )
});

export default Navigation;
