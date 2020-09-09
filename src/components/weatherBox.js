import React from "react";

const weatherBox = (props) => {
  return (
    <div className="weather-box">
      <div className="temp">{props.weather.main.temp}°C</div>
      <div className="weather">{props.weather.weather[0].main}</div>
    </div>
  );
};

export default weatherBox;
