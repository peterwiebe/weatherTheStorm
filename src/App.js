import React, { useEffect, useState } from "react";
import WeatherClient from "./clients/weather";
// import logo from './logo.svg';
import { Grid } from "semantic-ui-react";
import Day from "./components/day";
import "./App.css";

const App = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    WeatherClient.get5DayForecast()
      .then(response => {
        console.log({ response });
        setForecast(response);
      })
      .catch(error => {
        console.log({ error });
      });
  }, []);

  return (
    <Grid container columns={5}>
      {forecast &&
        forecast.map((data, index) => (
          <Grid.Column key={index}>
            <Day data={data} />
          </Grid.Column>
        ))}
    </Grid>
  );
};

export default App;
