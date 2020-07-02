/* global kakao */
import React from "react";
import usePromise from "utils/usePromise";
import { getPlace } from "utils/api";
import { connect } from "react-redux";
import { ListCover, List, ListItem } from "components/views/styles/PlaceStyle";
import { setCenterListClick, updateMap, updateMode } from "modules/position";
import icons from "utils/importIcons";
import { setMarkerInfo } from "../placeUtils";

const Pharmacy = ({
  location,
  map,
  setCenterListClick,
  updateMap,
  updateMode,
}) => {
  const [loading, response, error] = usePromise(() => {
    (() => updateMode({ mode: "PHARMACY" }))();
    return getPlace("PM9", location.lat, location.lng, "약국");
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

  const items = response.data.documents;
  const icon = new window.kakao.maps.MarkerImage(
    icons.pharmacyIcon,
    new window.kakao.maps.Size(40, 48)
  );

  return (
    <ListCover>
      <span>약국 검색</span>
      <List>
        {items.map((item) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(item.y, item.x),
            clickable: true,
            image: icon,
          });
          marker.setMap(map);
          (() => updateMap({ map: marker.getMap() }))();

          setMarkerInfo("pharmacy", item, marker, map);

          return (
            <ListItem
              key={item.id}
              onClick={() => setCenterListClick({ y: item.y, x: item.x })}
            >
              <h3>{item.place_name}</h3>
              <p>{item.road_address_name}</p>
              <p>{item.category_name}</p>
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
)(Pharmacy);
