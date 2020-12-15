import React, { useEffect } from "react";
import HistoricalGraph from "./HistoricalGraph";
import { Container } from "@material-ui/core";
import HistoricalPiechart from "./HistoricalPiechart";

import AOS from "aos";
import "aos/dist/aos.css";

import NewsDisplay from "./NewsDisplay";
import StickyHeader from "./StickyHeader";
import TrakkrInformationText from "./TrakkrInformationText";

import "../css/Header.css";

const Home = () => {
  useEffect(() => {
    AOS.init({});
  });

  return (
    <div>
      <StickyHeader />
      <Container>
        <div data-aos="fade" data-aos-duration="3000">
          <HistoricalGraph />
        </div>
        <TrakkrInformationText />
        <div data-aos="fade" data-aos-duration="3000">
          <HistoricalPiechart />
        </div>
        <div data-aos="fade" data-aos-duration="2000">
          <NewsDisplay />
        </div>
      </Container>
    </div>
  );
};

export default Home;
