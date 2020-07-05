import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setMap } from "modules/position";

const MapBlock = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 0.5rem;
`;

const Map = ({ mode, location, setMap }) => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(location.lat, location.lng),
      level: 4,
    };
    (() => setMap({ container, options }))();
  }, [mode, location.lat, location.lng, setMap]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <MapBlock id="map"></MapBlock>
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
