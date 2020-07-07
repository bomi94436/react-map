const initState = {
  map: null,
  mapContainer: {
    mapCover: null,
    map: null,
  },
  location: { lat: 35.1798200522868, lng: 129.075087492149 },
  address: { si: "부산광역시", gu: "연제구", dong: "", detail: "" },
  mode: "",
  loading: { GET_LATLNG: false, GET_PLACE: false },

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

export default initState;
