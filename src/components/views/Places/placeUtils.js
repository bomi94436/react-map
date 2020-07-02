/* global kakao */
export const setMarkerInfo = (place, item, marker, map) => {
  const content = document.createElement("div");

  place === "mask"
    ? (content.innerHTML =
        item.name +
        "<br/><span class=" +
        item.remain_stat +
        ">" +
        getMaskCount(item.remain_stat) +
        "</span>")
    : (content.innerHTML = item.place_name);

  content.setAttribute("class", "markerInfo");

  let activeId = null;
  let timeoutId = null;

  const lat = place === "mask" ? item.lat : item.y;
  const lng = place === "mask" ? item.lng : item.x;

  const position = new kakao.maps.LatLng(lat, lng);
  const customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: position,
    content: content,
    yAnchor: 2.0,
  });

  customOverlay.setMap();

  const mouseOverHandler = () => {
    if (
      timeoutId !== null &&
      (place === "mask" ? item.code : item.id) === activeId
    ) {
      //
      window.clearTimeout(timeoutId);
      timeoutId = null;
      return;
    }
    customOverlay.setMap(map);
    activeId = place === "mask" ? item.code : item.id;
  };

  const mouseOutHandler = () => {
    timeoutId = window.setTimeout(function () {
      customOverlay.setMap(null);
      activeId = null;
      timeoutId = null;
    }, 50);
  };

  kakao.maps.event.addListener(marker, "mouseover", mouseOverHandler);
  kakao.maps.event.addListener(marker, "mouseout", mouseOutHandler);
  content.addEventListener("mouseover", mouseOverHandler);
  content.addEventListener("mouseout", mouseOutHandler);
};

export const getMaskCount = (remain_stat) => {
  switch (remain_stat) {
    case "plenty":
      return "100 ~";
    case "some":
      return "30 ~ 100";
    case "few":
      return "2 ~ 30";
    case "empty":
      return "0 ~ 1";
    default:
      return "X";
  }
};
