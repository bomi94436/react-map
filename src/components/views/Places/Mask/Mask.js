import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListCover, List, ListItem } from "components/views/styles/PlaceStyle";
import {
  setCenterListClick,
  updateMode,
  setMarker,
  setCurrMarker,
  getPlaces,
} from "modules/position";
import icons from "utils/importIcons";
import "../Places.css";
import { getMaskCount, getMarker } from "../placeUtils";

const Mask = ({
  bounds,
  items,
  loading,
  location,
  map,

  getPlaces,
  updateMode,
  setCenterListClick,
  setCurrMarker,
  setMarker,
}) => {
  useEffect(() => {
    updateMode({ mode: "MASK" });
    getPlaces("MASK", location.lat, location.lng, 2000);
  }, [location.lat, location.lng, updateMode, getPlaces]);

  if (loading) {
    return (
      <ListCover>
        <List>로딩중 . . .</List>
      </ListCover>
    );
  }
  if (!items) {
    return <div>error</div>;
  }

  if (items) {
    items.forEach((item) => {
      const marker = getMarker(map, item.lat, item.lng, icons.mask, bounds);
      setMarker({ id: item.code, marker: marker, item: item });
    });
  }

  return (
    <ListCover>
      <span>마스크 판매처 검색</span>
      <List key={"MASK"}>
        {items.map((item, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => {
                setCenterListClick({ y: item.lat, x: item.lng });
                setCurrMarker({
                  id: item.code,
                  y: item.lat,
                  x: item.lng,
                  item: item,
                });
              }}
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
    bounds: position.bounds,
    items: position.items,
    loading: position.loading.GET_PLACE,
    location: position.location,
    map: position.map,
  }),
  (dispatch) => ({
    getPlaces: (mode, lat, lng, meter) =>
      dispatch(getPlaces(mode, lat, lng, meter)),
    updateMode: (data) => dispatch(updateMode(data)),
    setCenterListClick: (data) => dispatch(setCenterListClick(data)),
    setCurrMarker: (data) => dispatch(setCurrMarker(data)),
    setMarker: (data) => dispatch(setMarker(data)),
  })
)(Mask);
