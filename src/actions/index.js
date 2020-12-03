import axios from "axios";

export const fetchData = (country) => async (dispatch) => {
  const res = await axios(
    "https://corona.lmao.ninja/v2/historical/" + country + "?lastdays=30"
  );
  dispatch({ type: "FETCH_DATA", payload: res });
};
