import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </div>
  );
};

export default App;
