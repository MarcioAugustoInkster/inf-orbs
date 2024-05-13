import { FC, Fragment } from 'react'
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  sidebarClasses
} from 'react-pro-sidebar';
import Routes from '../../pages/routes';
import { Link } from 'react-router-dom';
import MenuIcon from '../Custom/MenuIcon/MenuIcon';
import { SidebarProps } from './SidebarProps';

const MuiSidebar: FC<SidebarProps> = (({ toggled, setToggled }) => {
  const routes = Routes[0].children === undefined ? [] : Routes[0].children;

  return (
    <Sidebar
      collapsed={false} // false
      toggled={toggled} // false
      width="270px" // 270px
      collapsedWidth="80px" // 80px
      transitionDuration={300} // 300
      breakPoint="all"
      onBackdropClick={() => setToggled(false)}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: 'rgb(30, 27, 75)',
        },
      }}
    >
      <span className="block text-white text-center font-serif py-2 uppercase border-b border-slate-400">
        Menu
      </span>
      <Menu
        menuItemStyles={{
          button: {
            ['&:hover']: { backgroundColor: 'rgb(67, 56, 202)' },
          },
        }}
      >
        {routes.map((route, routeIndex) => (
          <Fragment key={routeIndex}>
            {route.children === undefined
            ? (
              <MenuItem
                icon={<MenuIcon index={routeIndex} />} // ReactNode
                component={(<Link to={`${route.path === undefined ? '/' : route.path}`} />)}
                rootStyles={{
                  color: 'rgb(255, 255, 255)',
                  backgroundColor: 'rgb(30, 27, 75)',
                }} // CSSObject
                onClick={() => setToggled(false)}
              >
                {route.id?.toUpperCase()}
              </MenuItem>
            ) : (
              <SubMenu
                label={route.id?.toUpperCase()}
                icon={<MenuIcon index={routeIndex} />} // ReactNode
                rootStyles={{
                  color: 'rgb(255, 255, 255)',
                  backgroundColor: 'rgb(30, 27, 75)',
                  ['&:hover']: {
                    backgroundColor: 'rgb(67, 56, 202)'
                  },
                }} // CSSObject
              >
                {route.children.map((submenu, submenuIndex) => (
                  !submenu.path?.includes('/:') && (
                    <MenuItem
                      key={submenuIndex}
                      component={(
                        <Link to={`${submenu.path === undefined
                        ? route.path
                        : submenu.path}`} />
                      )}
                      onClick={() => setToggled(false)}
                      rootStyles={{
                        color: 'rgb(255, 255, 255)',
                        backgroundColor: 'rgb(71 85 105)',
                      }} // CSSObject
                    >{submenu.id?.toUpperCase()}</MenuItem>
                  )
                ))}
              </SubMenu>
            )}
          </Fragment>
        ))}
      </Menu>
    </Sidebar>
  )
});

export default MuiSidebar;
