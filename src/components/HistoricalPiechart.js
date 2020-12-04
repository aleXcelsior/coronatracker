import React, { useEffect, useState } from "react";

import { Pie, Chart } from "react-chartjs-2";
import { connect, useDispatch } from "react-redux";

const HistoricalPiechart = (props) => {
  const { country, data } = props;

  useEffect(() => {
    //console.log(data, "<- From historicalpiechart");
    //console.log(country, "<- From historicalpiechart");
  }, [data, country]);

  function pieChartData() {
    if (typeof data !== "undefined" && data.hasOwnProperty("timeline")) {
      const { cases, deaths, recovered } = data.timeline;

      var length = Object.keys(cases).length - 1;

      var lastCase = cases[Object.keys(cases)[length]];
      var firstCase = cases[Object.keys(cases)[0]];
      var casesLast30Days = lastCase - firstCase;

      var lastDeaths = deaths[Object.keys(deaths)[length]];
      var firstDeaths = deaths[Object.keys(deaths)[0]];

      var deathsLast30Days = lastDeaths - firstDeaths;

      var lastRecovered = recovered[Object.keys(recovered)[length]];
      var firstRecovered = recovered[Object.keys(recovered)[0]];

      var recoveredLast30Days = lastRecovered - firstRecovered;

      console.log(deathsLast30Days, "<- deaths");

      return [casesLast30Days, recoveredLast30Days, deathsLast30Days];
    }

    return [1, 1, 1];
  }

  var graphData = {
    labels: ["Cases", "Recovered", "Deaths"],
    datasets: [
      {
        label: "Pie chart",
        data: pieChartData(),
        backgroundColor: [
          "rgba(52, 68, 130, 1)",
          "rgba(52, 136, 50, 1)",
          "rgba(255, 0, 0, 1)",
        ],
      },
    ],
  };

  return (
    <div style={{ height: "500px" }}>
      <h1>HistoricalPiechart</h1>
      <Pie
        data={graphData}
        options={{
          title: "Cases, Recovered, Deaths piechart",
          text: "coolest data",
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedCountry } = state;
  const { data } = state.data;

  return { data: data, country: selectedCountry };
};

export default connect(mapStateToProps)(HistoricalPiechart);
