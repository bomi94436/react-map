import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setAddress, getLatLng } from "modules/position";
import { GoSearch } from "react-icons/go";
import { green } from "../styles/color";

const SearchAddressBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 2rem 0rem;

  button {
    width: 4.5rem;
    font-size: 1rem;
    padding: 0.5rem 0.7rem;
    border: none;
    background: ${green};
    cursor: pointer;
    outline: none;
    :hover {
      opacity: 0.7;
    }
    :active {
      opacity: 2;
    }
  }
`;

const DropDownInputCover = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const DropDown = styled.div`
  select {
    color: gray;
    border: none;
    cursor: pointer;
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
  }
`;

const Input = styled.div`
  input {
    width: 100%;
    color: gray;
    border: none;
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
  }
`;

const SearchAddress = ({ address, setAddress, getLatLng }) => {
  const sigu = require("utils/sigu.json");
  const sigudong = require("utils/sigudong.json");

  return (
    <SearchAddressBlock>
      <DropDownInputCover>
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
                .filter(
                  (i) => i.si === address.si && i.gu === address.gu && i.dong
                )
                .map((i) => (
                  <option key={i.dong} value={i.dong}>
                    {i.dong}
                  </option>
                ))}
          </select>
        </DropDown>
        <Input>
          <input
            type="text"
            placeholder="상세주소"
            onChange={(event) =>
              setAddress({ name: "detail", value: event.target.value })
            }
          />
        </Input>
      </DropDownInputCover>
      <button
        onClick={() =>
          getLatLng(address.si, address.gu, address.dong, address.detail)
        }
      >
        <GoSearch color="#ffffff" />
      </button>
    </SearchAddressBlock>
  );
};

export default connect(
  (state) => ({
    address: state.address,
  }),
  (dispatch) => ({
    setAddress: (data) => dispatch(setAddress(data)),
    getLatLng: (si, gu, dong, detail) =>
      dispatch(getLatLng(si, gu, dong, detail)),
  })
)(SearchAddress);
