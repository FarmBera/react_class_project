import '../css/topclock.css';

// import { useState } from "react";
// import { Component, useEffect, useMemo, useCallback } from "react";

import Clock from 'react-live-clock';
// import Date from "react-live-clock"; // ERROR

export default function Topclock(props) {
  // const [date, setDate] = useState(new Date());
  return (
    <div>
      {/* <span>{date.toLocaleTimeString()}</span> */}
      {/* <h2>Topclock Area</h2> */}
      <h2>Hello [Username]</h2>
      <div className="clock">
        <Clock format="HH:mm:ss" ticking={true} timezone={'Asia/Seoul'} />
      </div>
      <div className="date">
        <p>
          <span className="month">
            <Clock
              id="month"
              format={'MMM'}
              ticking={false}
              timezone={'Asia/Seoul'}
            />
          </span>
          {/* &nbsp; */}/
          <span className="second">
            <Clock
              id="second"
              format={'DD'}
              ticking={false}
              timezone={'Asia/Seoul'}
            />
          </span>
          {/* &nbsp; */}/
          <span className="year">
            <Clock
              id="year"
              format={'YYYY'}
              ticking={false}
              timezone={'Asia/Seoul'}
            />
          </span>
        </p>
      </div>
    </div>
  );
}
