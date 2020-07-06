import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as api from "utils/api";
import icons from "utils/importIcons";
import { getMarker, setMarkerInfo } from "components/views/Places/placeUtils";

// action type definition
const SET_ADDRESS = "position/SET_ADDRESS";
const SET_MAP = "position/SET_MAP";
const SET_MAP_LEVEL = "position/SET_MAP_LEVEL";
const SET_MARKER = "position/SET_MARKER";
const SET_CURR_MARKER = "position/SET_CURR_MARKER";
const SET_CENTER_LIST_CLICK = "position/SET_CENTER_LIST_CLICK";
const SET_CENTER_PIN_CLICK = "position/SET_CENTER_PIN_CLICK";

const UPDATE_MODE = "position/UPDATE_MODE";

const GET_LATLNG = "position/GET_LATLNG";
const GET_LATLNG_SUCCESS = "position/GET_LATLNG_SUCCESS";
const GET_LATLNG_FAILURE = "position/GET_LATLNG_FAILURE";

const GET_PLACE = "position/GET_PLACE";
const GET_PLACE_SUCCESS = "position/GET_PLACE_SUCCESS";
const GET_PLACE_FAILURE = "position/GET_PLACE_FAILURE";

// action generator definition
export const setAddress = createAction(SET_ADDRESS, (data) => data);
export const setMap = createAction(SET_MAP, (data) => data);
export const setMapLevel = createAction(SET_MAP_LEVEL, (data) => data);
export const setMarker = createAction(SET_MARKER, (data) => data);
export const setCurrMarker = createAction(SET_CURR_MARKER, (data) => data);
export const setCenterListClick = createAction(
  SET_CENTER_LIST_CLICK,
  (data) => data
);
export const setCenterPinClick = createAction(SET_CENTER_PIN_CLICK);

export const updateMode = createAction(UPDATE_MODE, (data) => data);

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

export const getPlaces = (mode, lat, lng, option) => async (dispatch) => {
  dispatch({ type: GET_PLACE });
  try {
    let response, items;

    if (mode === "MASK") {
      response = await api.getMask(lat, lng, option);
      items = response.data.stores;
    } else {
      response = await api.getPlace(lat, lng, option);
      items = response.data.documents;
    }
    dispatch({
      type: GET_PLACE_SUCCESS,
      payload: {
        items: items,
      },
    });
  } catch (e) {
    dispatch({ type: GET_PLACE_FAILURE, payload: e, error: true });
    throw e;
  }
};

// initial state
const initState = {
  mode: "",
  loading: { GET_LATLNG: false, GET_PLACE: false },

  map: null,
  mapContainer: {
    mapCover: null,
    map: null,
  },
  location: { lat: 35.1798200522868, lng: 129.075087492149 },
  address: { si: "부산광역시", gu: "연제구", dong: "", detail: "" },

  items: null,
  marker: {
    currMarker: {
      id: null,
      y: null,
      x: null,
      item: null,
    },
    markerList: [],
  },
};

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

    [SET_MARKER]: (state, action) =>
      produce(state, (draft) => {
        const item = action.payload.item;
        const marker = action.payload.marker;

        marker.setMap(draft.map);
        draft.marker.markerList.push({
          id: action.payload.id,
          marker: marker,
        });
        setMarkerInfo(draft.mode, item, marker, draft.map);
      }),

    [SET_CURR_MARKER]: (state, action) =>
      produce(state, (draft) => {
        const curr = draft.marker.currMarker;
        const newCurr = {
          id: action.payload.id,
          y: action.payload.y,
          x: action.payload.x,
          item: action.payload.item,
        };

        draft.marker.markerList.forEach((i) => {
          if (curr.id && i.id === curr.id) {
            i.marker.setMap(null);
            i.marker = getMarker(
              draft.map,
              curr.y,
              curr.x,
              icons[draft.mode.toLowerCase()]
            );
            i.marker.setMap(draft.map);
            setMarkerInfo(draft.mode, curr.item, i.marker, draft.map);
          }
          if (i.id === newCurr.id) {
            i.marker.setMap(null);
            i.marker = getMarker(
              draft.map,
              newCurr.y,
              newCurr.x,
              icons["curr_" + draft.mode.toLowerCase()]
            );
            i.marker.setMap(draft.map);
            setMarkerInfo(draft.mode, newCurr.item, i.marker, draft.map);
          }
        });

        draft.marker.currMarker.id = newCurr.id;
        draft.marker.currMarker.y = newCurr.y;
        draft.marker.currMarker.x = newCurr.x;
        draft.marker.currMarker.item = newCurr.item;
      }),

    [SET_CENTER_LIST_CLICK]: (state, action) =>
      produce(state, (draft) => {
        const coords = new window.kakao.maps.LatLng(
          action.payload.y,
          action.payload.x
        );
        draft.map.panTo(coords);
      }),

    [SET_CENTER_PIN_CLICK]: (state) =>
      produce(state, (draft) => {
        const center = draft.map.getCenter();
        draft.location.lat = center.getLat();
        draft.location.lng = center.getLng();
      }),

    [UPDATE_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.mode = action.payload.mode;
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

    [GET_PLACE]: (state) =>
      produce(state, (draft) => {
        draft.loading.GET_PLACE = true;
      }),
    [GET_PLACE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.loading.GET_PLACE = false;
        draft.items = action.payload.items;
      }),
    [GET_PLACE_FAILURE]: (state) =>
      produce(state, (draft) => {
        draft.loading.GET_PLACE = false;
      }),
  },
  initState
);

export default position;
