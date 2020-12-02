import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

import { Bar, Line, Pie } from "react-chartjs-2";

import { countries } from "../helpers/countries";

const HistoricalGraph = () => {
  const [historicalData, setHistoricalData] = useState();
  const [chosenCountry, setChosenCountry] = useState("");
  const [textFieldInput, setTextFieldInput] = useState("");

  useEffect(() => {
    if (typeof historicalData === "undefined") {
      fetchData("Sweden");
    }
    console.log(historicalData);
  }, []);

  const fetchData = async (country) => {
    const result = await axios(
      "https://corona.lmao.ninja/v2/historical/" + country + "?lastdays=30"
    );
    setHistoricalData(result.data.timeline.cases); //this needs to be changed
    setChosenCountry(result.data.country);

    console.log(result);
  };

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

  function handleChange(e) {
    e.preventDefault();
    setTextFieldInput(e.target.value);
  }

  function handleAutocomplete(e) {
    console.log(e.label);
    setTextFieldInput(e.label);
  }

  return (
    <Container>
      <form noValidate /* autoComplete="off" */>
        <Autocomplete
          id="combo-box-demo"
          options={countries}
          getOptionLabel={(option) => option.label}
          style={{ width: 300 }}
          onChange={(e, v) =>
            handleAutocomplete(v)
          } /* v is the item clicked in the drop-down menu */
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleChange}
              id="filled-basic"
              label="Country"
              variant="filled"
            />
          )}
        />
      </form>

      {renderGraph()}

      <Button variant="contained" onClick={() => fetchData(textFieldInput)}>
        Search
      </Button>
    </Container>
  );
};

export default HistoricalGraph;
