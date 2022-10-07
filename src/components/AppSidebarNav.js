import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { CBadge, CNavItem } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilStar } from "@coreui/icons";

import navigation from '../_nav'
import navigation2 from '../_nav2'
import { LoginContext } from "../views/DefaultLayout";

export const AppSidebarNav = ({items}) => {

  //const [items,setItems] = useState(localStorage.getItem("jwt") !== (undefined || null) ? navigation : navigation2)

  const { login, setLogin } = useContext(LoginContext);


  const location = useLocation();
  const navLink = (name, icon, badge) => {

    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    let { component, name, badge, icon, ...rest } = item;
    const Component = component;

    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {/*{items &&*/}
      {/*  items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}*/}

      {items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired
};
