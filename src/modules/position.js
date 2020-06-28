import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as api from "utils/api";

// action type definition
const SET_ADDRESS = "position/SET_ADDRESS";
const SET_MAP = "position/SET_MAP";

const GET_LATLNG = "position/GET_LATLNG";
const GET_LATLNG_SUCCESS = "position/GET_LATLNG_SUCCESS";
const GET_LATLNG_FAILURE = "position/GET_LATLNG_FAILURE";

// action generator definition
export const setAddress = createAction(SET_ADDRESS, (data) => data);
export const setMap = createAction(SET_MAP, (data) => data);

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
  loading: { GET_LATLNG: false },
  map: null,
  // 좌표
  location: { lat: 33.450701, lng: 126.570667 },
  // 주소
  address: { si: "", gu: "", dong: "", detail: "" },
};

const position = handleActions(
  {
    // [INCREASE]: (state) => ({ ...state, number: state.number + 1 }),
    [SET_ADDRESS]: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      if (value === "") {
        switch (name) {
          case "si":
            return produce(state, (draft) => {
              draft.address.si = "";
              draft.address.gu = "";
              draft.address.dong = "";
              draft.address.detail = "";
            });
          case "gu":
            return produce(state, (draft) => {
              draft.address.gu = "";
              draft.address.dong = "";
              draft.address.detail = "";
            });
          case "dong":
            return produce(state, (draft) => {
              draft.address.dong = "";
              draft.address.detail = "";
            });
          default:
            return;
        }
      }

      return produce(state, (draft) => {
        draft.address[name] = value;
      });
    },

    [SET_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.map = new window.kakao.maps.Map(
          action.payload.container,
          action.payload.options
        );
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
        let coords = new window.kakao.maps.LatLng(
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
