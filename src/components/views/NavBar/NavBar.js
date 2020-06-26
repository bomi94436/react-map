import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <NavLink exact to="/" activeClassName="active">
        마스크
      </NavLink>
      <NavLink to="/hospital" activeClassName="active">
        병원
      </NavLink>
      <NavLink to="/pharmacy" activeClassName="active">
        약국
      </NavLink>
    </div>
  );
};

export default NavBar;
