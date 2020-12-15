import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";
import Landing from "./Landing";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
      </BrowserRouter>
    </div>
  );
};

export default App;
