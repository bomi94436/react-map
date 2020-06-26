import React from "react";
import { connect } from "react-redux";
import { setAddress } from "modules/position";

const SearchAddress = ({ address, setAddress }) => {
  const sigu = require("utils/sigu.json");
  const sigudong = require("utils/sigudong.json");

  return (
    <section>
      <select
        name="si"
        onChange={(event) =>
          setAddress({ name: "si", value: event.target.value })
        }
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
      >
        <option value="">읍면동명</option>
        {address.gu !== null &&
          sigudong.map((element) => {
            if (
              element.si === address.si &&
              element.gu === address.gu &&
              element.dong
            ) {
              return (
                <option key={element.dong} value={element.dong}>
                  {element.dong}
                </option>
              );
            }
          })}
      </select>
    </section>
  );
};

export default connect(
  ({ position }) => ({
    address: position.address,
  }),
  (dispatch) => ({
    setAddress: (data) => dispatch(setAddress(data)),
  })
)(SearchAddress);
