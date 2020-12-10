import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const NewsDisplay = (props) => {
  const [newsData, setNewsData] = useState([]);

  const { selectedCountry, data } = props;
  const lookup = require("country-code-lookup");
  var countryIso2 = lookup.byCountry(selectedCountry).iso2;

  console.log(countryIso2, "<- ISO2");

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://coronavirus-smartable.p.rapidapi.com/news/v1/${countryIso2}/`,
      headers: {
        "x-rapidapi-key": "8fdc882e2cmsh4011f345115f21dp10891fjsna0e5f110cb26",
        "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setNewsData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [selectedCountry]);

  function renderNews() {
    if (typeof newsData.news !== "undefined" && !(newsData.news.length < 1)) {
      var news = newsData.news;
      var newsArray = [];

      for (var i = 0; i < 3; i++) {
        newsArray.push(news[i]);
      }
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {newsArray.map((news, index) => {
            return (
              <Card key={index} style={{ width: "29%" }}>
                <CardActionArea
                  onClick={() => {
                    window.open(news.originalUrl, "_blank");
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={
                      news.images !== null
                        ? news.images[0].url
                        : "https://www.washingtonpost.com/wp-apps/imrs.php?sr%E2%80%A6.com/public/R3HN3EB2SQI6XKWZRFMSE4UAYQ.jpg&w=1440"
                    }
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {news.excerpt}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      );
    } else {
      return (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Unfortunately we could not find any news for the selected country.
        </h1>
      );
    }
  }

  return <div>{renderNews()}</div>;
};

const mapStateToProps = (state) => {
  const { selectedCountry, data } = state;

  return { selectedCountry, data };
};

export default connect(mapStateToProps)(NewsDisplay);
