import React from "react";
import { Link } from "react-router-dom";
import HistoricalGraph from "./HistoricalGraph";
import HistoricalPiechart from "./HistoricalPiechart";

const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
      <HistoricalGraph />
      <HistoricalPiechart />
    </div>
  );
};

export default Home;
