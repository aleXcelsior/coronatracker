import React, { useEffect, useState } from "react";
import { Container, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Bar } from "react-chartjs-2";
import { connect, useDispatch } from "react-redux";

import { fetchData, setSelectedCountry } from "../actions";
import { countries } from "../helpers/countries";

import "../css/Graphshadow.css";

const HistoricalGraph = (props) => {
  const [historicalData, setHistoricalData] = useState();
  const [chosenCountry, setChosenCountry] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof props.data === "undefined") {
      dispatch(fetchData("Sweden"));
    } else {
      setHistoricalData(props.data.timeline.cases); //this needs to be changed
      setChosenCountry(props.country);
    }
  }, [props.data]);

  function renderGraph() {
    if (typeof historicalData !== "undefined") {
      var dates = [];
      var cases = [];

      for (var date in historicalData) {
        dates.push(date);
      }
      for (var i = 0; i < Object.keys(historicalData).length; i++) {
        cases.push(historicalData[Object.keys(historicalData)[i]]);
      }

      var graphData = {
        labels: dates,
        datasets: [
          {
            label:
              "Cases in the last " +
              Object.keys(historicalData).length +
              " days in " +
              chosenCountry,
            data: cases,
          },
        ],
      };
      return (
        <div style={{ height: "500px" }}>
          <Bar data={graphData} options={{ maintainAspectRatio: false }} />
        </div>
      );
    }
  }

  return (
    <Container className="graph-shadow">
      <h2 className="country-name">{props.country}</h2>
      {renderGraph()}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { selectedCountry } = state;

  return { data: state.data.data, country: selectedCountry };
};

export default connect(mapStateToProps)(HistoricalGraph);
