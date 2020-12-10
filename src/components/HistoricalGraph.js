import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { fetchData, setSelectedCountry } from "../actions";

import { Bar, Line, Pie } from "react-chartjs-2";

import { countries } from "../helpers/countries";
import { connect, useDispatch } from "react-redux";

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

  function handleChange(e) {
    e.preventDefault();
    setChosenCountry(e.target.value);
  }

  function handleAutocomplete(e) {
    try {
      setChosenCountry(e.label);
    } catch (e) {
      console.log(e);
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
    setChosenCountry(e.target[0].value);
    fetchDataAndSetChosenCountry();
  }

  function fetchDataAndSetChosenCountry() {
    dispatch(setSelectedCountry(chosenCountry));
    dispatch(fetchData(props.country));
  }

  return (
    <Container>
      <form
        onSubmit={(e) => onFormSubmit(e)}
        noValidate /* autoComplete="off" */
        className="graph-scroll"
      >
        <Autocomplete
          id="combo-box-demo"
          options={countries}
          getOptionLabel={(option) => option.label}
          style={{ width: 200 }}
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
      <Button
        variant="contained"
        onClick={() => fetchDataAndSetChosenCountry()}
      >
        Search
      </Button>
      {renderGraph()}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { selectedCountry } = state;

  return { data: state.data.data, country: selectedCountry };
};

export default connect(mapStateToProps)(HistoricalGraph);
