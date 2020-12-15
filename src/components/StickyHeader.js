import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchData, setSelectedCountry } from "../actions";

import "../css/Header.css";
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
  };

  return (
    <div className="navbar">
      <h2>Trakkr</h2>
      <div className="navbar-right">
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
                id="standard-basic"
                label="Country"
                /* variant="filled" */
              />
            )}
          />
        </form>
        <div className="button-div">
          <Button variant="contained" color="primary" onClick={fetch}>
            <span className="button-color">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { selectedCountry } = state;

  return { data: state.data.data, country: selectedCountry };
};

export default connect(mapStateToProps)(Landing);
