import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchData, setSelectedCountry } from "../actions";

import "../css/Landing.css";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { countries } from "../helpers/countries";

const Landing = (props) => {
  const dispatch = useDispatch();
  const [chosenCountry, setChosenCountry] = useState("Sweden");

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
    dispatch(setSelectedCountry(e.target[0].value));
    dispatch(fetchData(props.country)); //Fetches data if user preses enter instead of using the search button
  }

  fetch = () => {
    dispatch(fetchData(props.country));
    dispatch(setSelectedCountry(chosenCountry));

    try {
      var el = document.querySelector(".graph-scroll");

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } catch (error) {}
  };

  return (
    <div className="landing-container">
      <h1>Welcome to trakkr</h1>
      <h2>
        Please chose a country by typing in the name or chosing in the
        drop-down.
      </h2>
      <form
        onSubmit={(e) => onFormSubmit(e)}
        noValidate /* autoComplete="off" */
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
      <Button variant="contained" onClick={fetch}>
        Search
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedCountry } = state;

  return { data: state.data.data, country: selectedCountry };
};

export default connect(mapStateToProps)(Landing);
