/* global kakao */
import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { KakaoMap } from "react-kakao-maps";

const MapBlock = styled.div`
  width: 35rem;
  height: 35rem;
`;

const Map = ({ location, address }) => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(location.lat, location.lng),
      level: 4,
    };
    let map = new window.kakao.maps.Map(container, options);
  }, [location.lat, location.lng]);

  return (
    <div>
      <MapBlock id="map"></MapBlock>
      {/* <KakaoMap
        apiUrl={process.env.REACT_APP_KAKAO_MAP_KEY}
        width="35rem"
        height="35rem"
        level={3}
        lat={location.lat}
        lng={location.lng}
      ></KakaoMap> */}
    </div>
  );
};

export default connect(({ position }) => ({
  location: position.location,
  address: position.address,
}))(Map);
