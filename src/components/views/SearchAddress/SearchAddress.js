import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAddress, getLatLng } from "modules/position";
import { GoSearch } from "react-icons/go";
import { green } from "../styles/color";

const DropDown = styled.div`
  select {
    color: gray;
    margin: 2rem 0rem;
    border: none;
    cursor: pointer;
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
  }
  button {
    font-size: 1rem;
    padding: 0.5rem 0.7rem;
    border: none;
    background: ${green};
    cursor: pointer;
  }
`;

const SearchAddress = ({ address, setAddress, getLatLng }) => {
  const sigu = require("utils/sigu.json");
  const sigudong = require("utils/sigudong.json");

  return (
    <DropDown>
      <select
        name="si"
        onChange={(event) =>
          setAddress({ name: "si", value: event.target.value })
        }
        value={address.si}
      >
        <option value="">시도명</option>
        {sigu.map((i) => (
          <option key={i.si} value={i.si}>
            {i.si}
          </option>
        ))}
      </select>

      <select
        name="gu"
        onChange={(event) =>
          setAddress({ name: "gu", value: event.target.value })
        }
        value={address.gu}
      >
        <option value="">시군구명</option>
        {address.si !== null &&
          sigu.map((i) => {
            if (i.si === address.si) {
              return i["gu"].map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ));
            }
          })}
      </select>

      <select
        name="dong"
        onChange={(event) =>
          setAddress({ name: "dong", value: event.target.value })
        }
        value={address.dong}
      >
        <option value="">읍면동명</option>
        {address.gu !== null &&
          sigudong
            .filter((i) => i.si === address.si && i.gu === address.gu && i.dong)
            .map((i) => (
              <option key={i.dong} value={i.dong}>
                {i.dong}
              </option>
            ))}
      </select>

      <button onClick={() => getLatLng(address.si, address.gu, address.dong)}>
        <GoSearch color="#ffffff" />
      </button>
    </DropDown>
  );
};

export default connect(
  ({ position }) => ({
    address: position.address,
  }),
  (dispatch) => ({
    setAddress: (data) => dispatch(setAddress(data)),
    getLatLng: (si, gu, dong) => dispatch(getLatLng(si, gu, dong)),
  })
)(SearchAddress);
