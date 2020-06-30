import styled from "styled-components";
import * as color from "./color";

export const ListCover = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  span {
    margin: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: ${color.green};
    margin: 2rem 0rem;
  }
`;

export const List = styled.div`
  height: 35rem;
  width: 20rem;
  overflow: hidden;
  overflow-y: scroll;
`;

export const ListItem = styled.div`
  background: white;
  border-radius: 5px;
  margin: 1.5rem 1rem;
  padding: 0.3rem;
  box-shadow: 5px 10px 15px 3px #f3f4f5;
  transition: 0.3s;
  :hover {
    cursor: pointer;
    z-index: 1;
    transform: scale(1.1);
    transition: 0.3s;
  }
  p {
    font-size: 0.9rem;
    color: gray;
    margin: 0.3rem 0rem;
  }

  color: ${(props) => {
    switch (props.textColor) {
      case "plenty":
        return "#038c5a";
      case "some":
        return "#eac351";
      case "few":
        return "#a81c1a";
      case "empty":
        return "black";
      default:
        return "gray";
    }
  }};
`;
