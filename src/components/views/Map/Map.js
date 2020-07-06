import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setMap } from "modules/position";
import "./Map.css";

const OptionButtonBlock = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
`;

const Map = ({ mode, location, setMap }) => {
  useEffect(() => {
    let mapCover = document.getElementById("map-cover");
    let container = document.createElement("div");
    container.setAttribute("class", "map");
    mapCover.appendChild(container);
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.lng),
      level: 4,
    };
    setMap({ container, options, mapCover });
  }, [mode, location.lat, location.lng, setMap]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "column wrap",
        position: "relative",
      }}
    >
      <div id="map-cover" />
      <OptionButtonBlock>
        <button type="button">plus</button>
      </OptionButtonBlock>
    </div>
  );
};

export default connect(
  ({ position }) => ({
    mode: position.mode,
    location: position.location,
  }),
  (dispatch) => ({
    setMap: (data) => dispatch(setMap(data)),
  })
)(Map);
