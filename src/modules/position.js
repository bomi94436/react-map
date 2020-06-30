import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as api from "utils/api";

// action type definition
const SET_ADDRESS = "position/SET_ADDRESS";
const SET_MAP = "position/SET_MAP";
const SET_MARKER = "position/SET_MARKER";
const SET_CENTER_LIST_CLICK = "position/SET_CENTER_LIST_CLICK";

const UPDATE_MAP = "position/UPDATE_MAP";
const UPDATE_MODE = "position/UPDATE_MODE";

const GET_LATLNG = "position/GET_LATLNG";
const GET_LATLNG_SUCCESS = "position/GET_LATLNG_SUCCESS";
const GET_LATLNG_FAILURE = "position/GET_LATLNG_FAILURE";

// action generator definition
export const setAddress = createAction(SET_ADDRESS, (data) => data);
export const setMap = createAction(SET_MAP, (data) => data);
export const setMarker = createAction(SET_MARKER, (data) => data);
export const setCenterListClick = createAction(
  SET_CENTER_LIST_CLICK,
  (data) => data
);

export const updateMap = createAction(UPDATE_MAP, (data) => data);
export const updateMode = createAction(UPDATE_MODE, (data) => data);

export const getLatLng = (si, gu, dong) => async (dispatch) => {
  dispatch({ type: GET_LATLNG });
  try {
    const response = await api.getLatLng(si, gu, dong);
    dispatch({
      type: GET_LATLNG_SUCCESS,
      payload: {
        lat: Number(response.data.documents[0].y),
        lng: Number(response.data.documents[0].x),
      },
    });
  } catch (e) {
    dispatch({ type: GET_LATLNG_FAILURE, payload: e, error: true });
    throw e;
  }
};

// initial state
const initState = {
  mode: "PHARMACY",
  loading: { GET_LATLNG: false },
  map: null,
  location: { lat: 35.1798200522868, lng: 129.075087492149 },
  address: { si: "부산광역시", gu: "", dong: "", detail: "" },
};

const position = handleActions(
  {
    // [INCREASE]: (state) => ({ ...state, number: state.number + 1 }),
    [SET_ADDRESS]: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      switch (name) {
        case "si":
          return produce(state, (draft) => {
            if (value === "") {
              draft.address.si = "";
            } else {
              draft.address[name] = value;
            }
            draft.address.gu = "";
            draft.address.dong = "";
            draft.address.detail = "";
          });
        case "gu":
          return produce(state, (draft) => {
            if (value === "") {
              draft.address.gu = "";
            } else {
              draft.address[name] = value;
            }
            draft.address.dong = "";
            draft.address.detail = "";
          });
        case "dong":
          return produce(state, (draft) => {
            if (value === "") {
              draft.address.dong = "";
            } else {
              draft.address[name] = value;
            }
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
        draft.map = new window.kakao.maps.Map(
          action.payload.container,
          action.payload.options
        );
      }),

    [SET_MARKER]: (state, action) =>
      produce(state, (draft) => {
        draft.marker.push({
          id: action.payload.id,
          y: action.payload.y,
          x: action.payload.x,
        });
      }),

    [SET_CENTER_LIST_CLICK]: (state, action) =>
      produce(state, (draft) => {
        const coords = new window.kakao.maps.LatLng(
          action.payload.y,
          action.payload.x
        );
        draft.map.panTo(coords);
      }),

    [UPDATE_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.map = action.payload.map;
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
  },
  initState
);

export default position;
