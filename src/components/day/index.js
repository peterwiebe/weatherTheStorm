import React from "react";
import { Header } from "semantic-ui-react";
import styled from "@emotion/styled/macro";

const Name = styled(Header)`
  display: inline-block;
`;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Day = ({ data: { name, precipitation, tempHigh, tempLow } }) => {
  const getDayName = name => {
    if (name === "Today") {
      return name;
    }

    return days[name];
  };

  const getKelvinCelsius = temp => (temp - 273.15).toFixed(1);

  return (
    <div>
      <Name as="h2">{getDayName(name)}</Name>
      <p>Rain: {precipitation.toFixed(1)} mm</p>
      <p>Temp High: {getKelvinCelsius(tempHigh)} °C</p>
      <p>Temp Low: {getKelvinCelsius(tempLow)} °C</p>
    </div>
  );
};

export default Day;
