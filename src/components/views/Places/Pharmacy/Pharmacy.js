import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ListCover, List, ListItem } from "components/views/styles/PlaceStyle";
import {} from "modules/position";
import {
  setMarker,
  setCurrMarker,
  setCenterListClick,
  updateMode,
  getPlaces,
} from "modules/places";
import icons from "utils/importIcons";
import { getMarker } from "../placeUtils";
import Scroll from "react-scroll";

const Pharmacy = ({
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
    updateMode({ mode: "PHARMACY" });
    getPlaces("PHARMACY", location.lat, location.lng, "PM9");
  }, [location.lat, location.lng, updateMode, getPlaces]);

  let Element = Scroll.Element;

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
      const marker = getMarker(map, item.y, item.x, icons.pharmacy, item.id);
      setMarker({ id: item.id, marker: marker, item: item });
    });
  }

  return (
    <ListCover>
      <span>약국 검색</span>
      <List id="list">
        {items.map((item, index) => {
          return (
            <Element name={item.id}>
              <ListItem
                key={index}
                onClick={() => {
                  setCenterListClick({ y: item.y, x: item.x });
                  setCurrMarker({
                    id: item.id,
                    y: item.y,
                    x: item.x,
                    item: item,
                  });
                }}
              >
                <h3>{item.place_name}</h3>
                <p>{item.road_address_name}</p>
                <p>{item.category_name}</p>
              </ListItem>
            </Element>
          );
        })}
      </List>
    </ListCover>
  );
};

export default connect(
  (state) => ({
    items: state.items,
    loading: state.loading.GET_PLACE,
    location: state.location,
    map: state.map,
  }),
  (dispatch) => ({
    getPlaces: (mode, lat, lng, meter) =>
      dispatch(getPlaces(mode, lat, lng, meter)),
    updateMode: (data) => dispatch(updateMode(data)),
    setCenterListClick: (data) => dispatch(setCenterListClick(data)),
    setCurrMarker: (data) => dispatch(setCurrMarker(data)),
    setMarker: (data) => dispatch(setMarker(data)),
  })
)(Pharmacy);
