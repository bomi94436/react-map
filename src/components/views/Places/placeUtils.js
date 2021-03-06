/* global kakao */
import Scroll from "react-scroll";

export const setMarkerInfo = (mode, item, marker, map) => {
  const content = document.createElement("div");
  const id = mode === "MASK" ? item.code : item.id;

  mode === "MASK"
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

  const lat = mode === "MASK" ? item.lat : item.y;
  const lng = mode === "MASK" ? item.lng : item.x;

  const position = new kakao.maps.LatLng(lat, lng);
  const customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: position,
    content: content,
    yAnchor: 2.0,
  });

  customOverlay.setMap();

  const mouseOverHandler = () => {
    if (timeoutId !== null && id === activeId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
      return;
    }
    customOverlay.setMap(map);
    activeId = id;
  };

  const mouseOutHandler = () => {
    timeoutId = window.setTimeout(function () {
      customOverlay.setMap();
      activeId = null;
      timeoutId = null;
    }, 25);
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

export const getMarker = (map, y, x, iconImg, id) => {
  const position = new window.kakao.maps.LatLng(y, x);
  const icon = new window.kakao.maps.MarkerImage(
    iconImg,
    new window.kakao.maps.Size(40, 48)
  );
  let scroller = Scroll.scroller;

  const mouseClickHandler = () => {
    scroller.scrollTo(id, {
      duration: 1200,
      delay: 100,
      smooth: true,
      containerId: "list",
      offset: -5,
    });
  };

  const marker = new window.kakao.maps.Marker({
    map: map,
    position: position,
    clickable: true,
    image: icon,
  });

  kakao.maps.event.addListener(marker, "click", mouseClickHandler);

  return marker;
};
