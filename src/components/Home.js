import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HistoricalGraph from "./HistoricalGraph";
import HistoricalPiechart from "./HistoricalPiechart";

import AOS from "aos";
import "aos/dist/aos.css";

import Landing from "./Landing";
import NewsDisplay from "./NewsDisplay";

const Home = () => {
  useEffect(() => {
    AOS.init({});
  });

  return (
    <div>
      <div data-aos="fade-down" data-aos-duration="2000">
        <Landing />
      </div>

      <div data-aos="fade-left" data-aos-duration="3000">
        <HistoricalGraph />
      </div>
      <div data-aos="fade-right" data-aos-duration="3000">
        <HistoricalPiechart />
      </div>
      <div data-aos="fade" data-aos-duration="3000">
        <NewsDisplay />
      </div>
    </div>
  );
};

export default Home;
