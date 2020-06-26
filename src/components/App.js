import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import Mask from "./views/Mask/Mask";
import Map from "./views/Map/Map";
import styled from "styled-components";

const Block = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`;

function App() {
  return (
    <div className="App">
      <Router>
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          <Block>
            <NavBar />
            <Map />
          </Block>
          <Block>
            <Switch>
              <Route exact path="/" component={Mask} />
            </Switch>
          </Block>
        </div>
      </Router>
    </div>
  );
}

export default App;
