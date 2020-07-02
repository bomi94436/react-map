/* global kakao */
import React from "react";
import { connect } from "react-redux";
import usePromise from "utils/usePromise";
import { getMask } from "utils/api";
import { ListCover, List, ListItem } from "components/views/styles/PlaceStyle";
import { setCenterListClick, updateMap, updateMode } from "modules/position";
import icons from "utils/importIcons";
import "../Places.css";
import { setMarkerInfo, getMaskCount } from "../placeUtils";

const Mask = ({ location, map, setCenterListClick, updateMap, updateMode }) => {
  const [loading, response, error] = usePromise(() => {
    (() => updateMode({ mode: "MASK" }))();
    return getMask(location.lat, location.lng, 2000);
  }, [location]);

  if (loading) {
    return <div>로딩중 . . .</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  if (!response) {
    return null;
  }

  const items = response.data.stores;
  const icon = new window.kakao.maps.MarkerImage(
    icons.maskIcon,
    new window.kakao.maps.Size(40, 48)
  );

  return (
    <ListCover>
      <span>마스크 판매처 검색</span>
      <List>
        {items.map((item) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(item.lat, item.lng),
            clickable: true,
            image: icon,
          });
          marker.setMap(map);
          (() => updateMap({ map: marker.getMap() }))();

          setMarkerInfo("mask", item, marker, map);

          return (
            <ListItem
              key={item.code}
              onClick={() => setCenterListClick({ y: item.lat, x: item.lng })}
              textColor={item.remain_stat}
            >
              <h3>{item.name}</h3>
              <h5 style={{ margin: "0.2rem" }}>
                {getMaskCount(item.remain_stat)}
              </h5>
              <p>{item.addr}</p>
              <p>데이터 생성일: {item.created_at}</p>
              <p>입고시간: {item.stock_at}</p>
            </ListItem>
          );
        })}
      </List>
    </ListCover>
  );
};

export default connect(
  ({ position }) => ({
    location: position.location,
    map: position.map,
  }),
  (dispatch) => ({
    setCenterListClick: (data) => dispatch(setCenterListClick(data)),
    updateMap: (data) => dispatch(updateMap(data)),
    updateMode: (data) => dispatch(updateMode(data)),
  })
)(Mask);
