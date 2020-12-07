import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import Home from "./Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Container>
          <Route exact path="/" component={Home} />
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
