import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { green } from "../styles/color";
import { TiPlus, TiMinus } from "react-icons/ti";
import { FaMapPin } from "react-icons/fa";
import { setMapLevel, setCenterPinClick } from "modules/position";

const OptionButtonBlock = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row wrap;

  bottom: 10px;
  right: 10px;
  z-index: 1;
`;

const Button = styled.div`
  margin: 0 auto;
  padding: 0.6rem;
  background: ${green};
  color: white;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 1rem;
  border: 2px solid white;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 2;
  }
  &.left {
    border-right: none;
    border-radius: 1.5rem 0 0 1.5rem;
    padding-left: 0.8rem;
  }
  &.right {
    border-left: none;
    border-radius: 0 1.5rem 1.5rem 0;
    padding-right: 0.8rem;
  }
  &.pin {
    border-radius: 2rem;
    margin-left: 1rem;
  }
`;

const MapOptionButton = ({ setMapLevel, setCenterPinClick }) => {
  return (
    <div>
      <OptionButtonBlock>
        <Button
          type="button"
          className="left"
          onClick={() => setMapLevel({ level: "plus" })}
        >
          <TiPlus />
        </Button>
        <Button
          type="button"
          className="right"
          onClick={() => setMapLevel({ level: "minus" })}
        >
          <TiMinus />
        </Button>
        <Button
          type="button"
          className="pin"
          onClick={() => setCenterPinClick()}
        >
          <FaMapPin />
        </Button>
      </OptionButtonBlock>
    </div>
  );
};

export default connect(null, (dispatch) => ({
  setMapLevel: (data) => dispatch(setMapLevel(data)),
  setCenterPinClick: () => dispatch(setCenterPinClick()),
}))(MapOptionButton);
