import classes from "./TabMenu.module.css";
import classNames from "classnames";

import { NavLink } from "react-router-dom";


const TabMenu = ({tabList, className}) => {
  return (
    <div className={classNames(classes.tabList, className)}>
      {tabList.map(({ id, name, href }) => {
        return (
          <NavLink
            key={id}
            to={href}
            className={({isActive}) => classNames(classes.tabItem, {
                [classes.active]: isActive
              })}
          >
            {name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default TabMenu;
