import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as api from "utils/api";
import icons from "utils/importIcons";
import { getMarker, setMarkerInfo } from "components/views/Places/placeUtils";
import initState from "./initState";

// action type definition
const SET_MARKER = "position/SET_MARKER";
const SET_CURR_MARKER = "position/SET_CURR_MARKER";
const SET_CENTER_LIST_CLICK = "position/SET_CENTER_LIST_CLICK";

const UPDATE_MODE = "position/UPDATE_MODE";

const GET_PLACE = "position/GET_PLACE";
const GET_PLACE_SUCCESS = "position/GET_PLACE_SUCCESS";
const GET_PLACE_FAILURE = "position/GET_PLACE_FAILURE";

// action generator definition
export const setMarker = createAction(SET_MARKER, (data) => data);
export const setCurrMarker = createAction(SET_CURR_MARKER, (data) => data);
export const setCenterListClick = createAction(
  SET_CENTER_LIST_CLICK,
  (data) => data
);

export const updateMode = createAction(UPDATE_MODE, (data) => data);

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

// reducer
const places = handleActions(
  {
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

    [UPDATE_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.mode = action.payload.mode;
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

export default places;
