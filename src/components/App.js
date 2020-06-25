import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div className="App">
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
}

export default App;
