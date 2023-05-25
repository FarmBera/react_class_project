import "../css/main.css";

import { Component, useState, useEffect, useMemo, useCallback } from "react";

import Clock from "react-live-clock";
import Date from "react-live-clock";

function Topclock(props) {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <span>{date.toLocaleTimeString()}</span>
      <h2>Topclock Area</h2>
      <div className="clock">
        <Clock format="HH:mm:ss" ticking={true} timezone={"KR/Pacific"} />
      </div>
      <div className="date">
        <p>
          <span className="year">
            <Date
              id="year"
              format={"YYYY"}
              ticking={false}
              timezone={"KR/Pacific"}
            />
          </span>
          &nbsp;&nbsp;
          <span className="month">
            <Date
              id="month"
              format={"MMM"}
              ticking={false}
              timezone={"KR/Pacific"}
            />
          </span>
          &nbsp;&nbsp;
          <span className="second">
            <Date
              id="second"
              format={"DD"}
              ticking={false}
              timezone={"KR/Pacific"}
            />
          </span>
        </p>
      </div>
      <ul>
        <li>asdf</li>
      </ul>
    </div>
  );
}

export default Topclock;
