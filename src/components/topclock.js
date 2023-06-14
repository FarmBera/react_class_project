import '../css/topclock.css';

// import { useState } from "react";
// import { Component, useEffect, useMemo, useCallback } from "react"; // 사용하지 않음

/** react-live-clock
 * 시계 관련 node-modules 중 하나
 * npm install react-live-clock
 */

import Clock from 'react-live-clock';
// import Date from "react-live-clock"; // ERROR

export default function Topclock(props) {
  // const [date, setDate] = useState(new Date()); // Deprecated
  const loginState = JSON.parse(localStorage.getItem('isLogin'));
  // console.log(props.userid);
  return (
    <div>
      {/* <span>{date.toLocaleTimeString()}</span> */}
      {/* <h2>Topclock Area</h2> */}
      {/* <h2>Hello [Username]</h2> */}
      {/* <h2>Hello {props.userid}</h2> */}
      <h2 className="helloMsg">Hello, {loginState ? props.userid : 'Guest'}</h2>
      <div className="clock">
        <Clock format="HH:mm:ss" ticking={true} timezone={'Asia/Seoul'} />
      </div>
      <div className="date">
        <p>
          <span className="month">
            <Clock id="month" format={'MMM'} ticking={false} timezone={'Asia/Seoul'} />
          </span>
          /
          <span className="second">
            <Clock id="second" format={'DD'} ticking={false} timezone={'Asia/Seoul'} />
          </span>
          /
          <span className="year">
            <Clock id="year" format={'YYYY'} ticking={false} timezone={'Asia/Seoul'} />
          </span>
        </p>
      </div>
    </div>
  );
}
