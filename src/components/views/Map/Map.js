import React, { useEffect } from "react";
import styled from "styled-components";

const MapBlock = styled.div`
  width: 35rem;
  height: 35rem;
`;

const Map = () => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  }, []);
  return (
    <div>
      <MapBlock id="map"></MapBlock>
    </div>
  );
};

export default Map;
