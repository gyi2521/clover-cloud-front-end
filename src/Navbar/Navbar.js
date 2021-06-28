import React from "react";
import { MenuList } from "./MenuList";
import "./Navbar.css";

const Navbar = () => {
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <a href={url}>{title}</a>
      </li>
    );
  });
  return (
    <nav>
      <div className="logo">
        TECH<font>TAB</font>
        <ul className="menu-list">{menuList}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
