import "../css/main.css";

import { Component, useState, useEffect, useMemo, useCallback } from "react";

import Month from "react-live-clock";

function Dday(props) {
  return (
    <div>
      <h2>Dday Area</h2>
      <div className="top_input">
        <input type="text" required />
        <input type="date" required />
        <button type="button" id="date">
          ADD Item
        </button>
      </div>
      <div className="body_list">
        <ul>
          <li>asdf</li>
        </ul>
      </div>
    </div>
  );
}

export default Dday;
