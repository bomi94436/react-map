import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setMap } from "modules/position";

const MapBlock = styled.div`
  width: 35rem;
  height: 35rem;
`;

const Map = ({ map, location, address, setMap }) => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(location.lat, location.lng),
      level: 4,
    };
    (() => setMap({ container, options }))();
  }, []);

  return (
    <div>
      <MapBlock id="map"></MapBlock>
    </div>
  );
};

export default connect(
  ({ position }) => ({
    map: position.map,
    location: position.location,
    address: position.address,
  }),
  (dispatch) => ({
    setMap: (data) => dispatch(setMap(data)),
  })
)(Map);
