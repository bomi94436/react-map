import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./views/NavBar/NavBar";
import Mask from "./views/Places/Mask/Mask";
import Map from "./views/Map/Map";
import styled from "styled-components";
import SearchAddress from "./views/SearchAddress/SearchAddress";
import Hospital from "./views/Places/Hospital/Hospital";
import Pharmacy from "./views/Places/Pharmacy/Pharmacy";

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
          <Block style={{ marginRight: "5rem" }}>
            <NavBar />
            <SearchAddress />
            <Map />
          </Block>
          <Block>
            <Switch>
              <Route exact path="/" component={Mask} />
              <Route path="/hospital" component={Hospital} />
              <Route path="/pharmacy" component={Pharmacy} />
            </Switch>
          </Block>
        </div>
      </Router>
    </div>
  );
}

export default App;
