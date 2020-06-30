import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { green, gray, darkgray } from "../styles/color";

const NavBarBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  /* padding: 1rem 0rem; */

  .btn {
    text-decoration: none;
    font-weight: 700;
    font-size: 1.2rem;
    padding: 0.7rem 2rem;
    border-radius: 30px;
    color: gray;
    :hover {
      opacity: 0.7;
    }
    :active {
      opacity: 2;
    }

    &.active {
      color: white;
      background: ${green};
    }
  }
`;

const NavBar = () => {
  return (
    <NavBarBlock>
      <NavLink exact to="/" className="btn" activeClassName="active">
        마스크
      </NavLink>
      <NavLink to="/hospital" className="btn" activeClassName="active">
        병원
      </NavLink>
      <NavLink to="/pharmacy" className="btn" activeClassName="active">
        약국
      </NavLink>
    </NavBarBlock>
  );
};

export default NavBar;
