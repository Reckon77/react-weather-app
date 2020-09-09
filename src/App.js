import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherBox from "./components/weatherBox";
import LocationBox from "./components/locationBox";
const api = {
  key: "83a02998ed428c776c1bc1867e25e9c4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          setError("An unknown error occurred.");
          break;
      }
    }
    getLocation();
  }, []);

  const showPosition = (position) => {
    console.log(position.coords);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeather(lat, lon);
  };
  const getWeather = (latitude, longitude) => {
    fetch(
      `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
        setError(result.message);
        console.log(err);
      })
      .catch((error) => {
        console.error("Error:", error);
        let e = JSON.stringify(error);
        setError(e);
      });
  };
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [err, setError] = useState("");
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
          setError(result.message);
          console.log(err);
        })
        .catch((error) => {
          console.error("Error:", error);
          let e = JSON.stringify(error);
          setError(e);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search city name..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <LocationBox weather={weather} dateBuilder={dateBuilder} />
            <WeatherBox weather={weather} />
          </div>
        ) : err !== "" ? (
          <div className="error">Sorry,{err}</div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
