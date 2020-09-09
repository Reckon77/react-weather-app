import React from "react";

const locationBox = (props) => {
  return (
    <div>
      <div className="location-box">
        <div className="location">
          {props.weather.name}, {props.weather.sys.country}
        </div>
        <div className="date">{props.dateBuilder(new Date())}</div>
      </div>
    </div>
  );
};

export default locationBox;
