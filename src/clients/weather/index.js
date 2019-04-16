import "whatwg-fetch";
import { getQueryString } from "../../utils/api";
import { parseString } from "xml2js";

const appId = process.env.REACT_APP_OPEN_WEATHER_APPID;

export default class WeatherClient {
  static _isInitialized = false;

  static _service = null;

  static baseUrl = "https://api.openweathermap.org/data/2.5";

  static get5DayForecast(params = { q: "Vancouver,ca" }) {
    const queryString = getQueryString({
      ...params,
      APPID: appId,
      mode: "xml",
    });

    return fetch(`${WeatherClient.baseUrl}/forecast${queryString}`, {
      mode: "cors",
    })
      .then(response => response.text())
      .then(xml => {
        let aggragateData = null;

        parseString(xml, (err, result) => {
          if (err) {
            return Promise.reject(err);
          }

          aggragateData = WeatherClient._aggragateDataByDay(result);
        });

        return WeatherClient._formatForecastData(aggragateData);
      });
  }

  static _aggragateDataByDay({ weatherdata }) {
    if (!weatherdata) {
      return [];
    }

    return weatherdata.forecast[0].time.reduce(
      (forecast, datum) => {
        const futureDate = new Date(`${datum.$.from}Z`);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        const days = Math.floor(
          (futureDate - endOfToday) / (24 * 3600 * 1000) + 1,
        );

        if (days < 0 || days > 4) {
          return forecast;
        }

        forecast[days].push(datum);

        return forecast;
      },
      [[], [], [], [], []],
    );
  }

  static _formatForecastData(data) {
    return data.reduce((formattedData, day, dayIndex) => {
      formattedData[dayIndex] = day.reduce(
        (dayData, hourlyData, hourIndex) => {
          if (!hourIndex) {
            dayData.name = dayIndex
              ? new Date(`${hourlyData.$.from}Z`).getDay()
              : "Today";
          }

          if (hourlyData.precipitation[0]) {
            dayData.precipitation =
              dayData.precipitation +
              Number(hourlyData.precipitation[0].$.value);
          }

          if (hourlyData.temperature[0]) {
            dayData.tempHigh =
              !dayData.tempHigh ||
              Number(hourlyData.temperature[0].$.max) > dayData.tempHigh
                ? Number(hourlyData.temperature[0].$.max)
                : dayData.tempHigh;

            dayData.tempLow =
              !dayData.tempLow ||
              Number(hourlyData.temperature[0].$.min) < dayData.tempLow
                ? Number(hourlyData.temperature[0].$.min)
                : dayData.tempLow;
          }

          console.log({ hourlyData });
          return dayData;
        },
        {
          name: "",
          precipitation: 0,
          tempHigh: null,
          tempLow: null,
        },
      );
      return formattedData;
    }, []);
  }
}
