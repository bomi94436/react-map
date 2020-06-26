import { createAction, handleActions } from "redux-actions";

// action type definition
const SET_ADDRESS = "SET_ADDRESS";

// action generator definition
export const setAddress = createAction(SET_ADDRESS, (data) => data);

// initial state
const initState = {
  // 좌표
  location: { lat: 33.450701, lng: 126.570667 },
  // 주소
  address: { si: null, gu: null, dong: null, detail: null },
};

const position = handleActions(
  {
    // [INCREASE]: (state) => ({ ...state, number: state.number + 1 }),
    [SET_ADDRESS]: (state, action) => ({
      ...state,
      address: {
        ...state.address,
        [action.payload.name]: action.payload.value,
      },
    }),
  },
  initState
);

export default position;
