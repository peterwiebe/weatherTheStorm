import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import WeatherClient from "./clients/weather";
// import logo from './logo.svg';
import { Header, Grid } from "semantic-ui-react";
import Day from "./components/day";
import "./App.css";

const Headline = styled(Header)`
  display: inline-block;
`;

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
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid
        centered
        columns={1}
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column>
          <Grid.Row>
            <Grid container columns={1}>
              <Grid.Column>
                <Headline as="h1">Vancouver</Headline>
                <br />
                <Headline as="h3" style={{ marginTop: 0 }}>
                  5 Day Forecast
                </Headline>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row>
            <Grid container columns={5} stackable>
              {forecast &&
                forecast.map((data, index) => (
                  <Grid.Column key={index}>
                    <Day data={data} />
                  </Grid.Column>
                ))}
            </Grid>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default App;
