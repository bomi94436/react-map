import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as api from "utils/api";
import initState from "./initState";

// action type definition
const SET_ADDRESS = "position/SET_ADDRESS";
const SET_MAP = "position/SET_MAP";
const SET_MAP_LEVEL = "position/SET_MAP_LEVEL";
const SET_CENTER_PIN_CLICK = "position/SET_CENTER_PIN_CLICK";

const GET_LATLNG = "position/GET_LATLNG";
const GET_LATLNG_SUCCESS = "position/GET_LATLNG_SUCCESS";
const GET_LATLNG_FAILURE = "position/GET_LATLNG_FAILURE";

// action generator definition
export const setAddress = createAction(SET_ADDRESS, (data) => data);
export const setMap = createAction(SET_MAP, (data) => data);
export const setMapLevel = createAction(SET_MAP_LEVEL, (data) => data);
export const setCenterPinClick = createAction(SET_CENTER_PIN_CLICK);

export const getLatLng = (si, gu, dong, detail) => async (dispatch) => {
  dispatch({ type: GET_LATLNG });
  try {
    const response = await api.getLatLng(si, gu, dong, detail);
    dispatch({
      type: GET_LATLNG_SUCCESS,
      payload: {
        lat: Number(response.data.documents[0].y),
        lng: Number(response.data.documents[0].x),
      },
    });
  } catch (e) {
    alert("찾으시는 주소가 없습니다.\n다시 입력해주세요!");
    dispatch({ type: GET_LATLNG_FAILURE, payload: e, error: true });
  }
};

// reducer
const position = handleActions(
  {
    [SET_ADDRESS]: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      switch (name) {
        case "si":
          return produce(state, (draft) => {
            if (value === "") draft.address.si = "";
            else draft.address[name] = value;

            draft.address.gu = "";
            draft.address.dong = "";
            draft.address.detail = "";
          });
        case "gu":
          return produce(state, (draft) => {
            if (value === "") draft.address.gu = "";
            else draft.address[name] = value;

            draft.address.dong = "";
            draft.address.detail = "";
          });
        case "dong":
          return produce(state, (draft) => {
            if (value === "") draft.address.dong = "";
            else draft.address[name] = value;

            draft.address.detail = "";
          });
        default:
          return produce(state, (draft) => {
            draft.address[name] = value;
          });
      }
    },

    [SET_MAP]: (state, action) =>
      produce(state, (draft) => {
        // initial about map, etc ...
        draft.marker.currMarker = {
          id: null,
          y: null,
          x: null,
          item: null,
        };
        draft.marker.markerList = [];
        draft.items = null;
        if (draft.mapContainer.mapCover)
          draft.mapContainer.mapCover.removeChild(draft.mapContainer.map);

        draft.map = new window.kakao.maps.Map(
          action.payload.container,
          action.payload.options
        );
        draft.mapContainer.mapCover = action.payload.mapCover;
        draft.mapContainer.map = action.payload.container;
      }),

    [SET_MAP_LEVEL]: (state, action) =>
      produce(state, (draft) => {
        const level = draft.map.getLevel();
        switch (action.payload.level) {
          case "plus":
            draft.map.setLevel(level + 1);
            break;
          case "minus":
            draft.map.setLevel(level - 1);
            break;
          default:
            break;
        }
      }),

    [SET_CENTER_PIN_CLICK]: (state) =>
      produce(state, (draft) => {
        const center = draft.map.getCenter();
        draft.location.lat = center.getLat();
        draft.location.lng = center.getLng();
      }),

    [GET_LATLNG]: (state) =>
      produce(state, (draft) => {
        draft.loading.GET_LATLNG = true;
      }),
    [GET_LATLNG_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.loading.GET_LATLNG = false;
        draft.location.lat = action.payload.lat;
        draft.location.lng = action.payload.lng;
        const coords = new window.kakao.maps.LatLng(
          action.payload.lat,
          action.payload.lng
        );
        draft.map.setCenter(coords);
      }),
    [GET_LATLNG_FAILURE]: (state) =>
      produce(state, (draft) => {
        draft.loading.GET_LATLNG = false;
      }),
  },
  initState
);

export default position;
