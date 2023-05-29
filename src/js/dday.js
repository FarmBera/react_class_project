import '../css/main.css';

import { useState } from 'react';
// import { useEffect } from "react";
// import { useMemo } from "react";
// import { useCallback } from "react";
import { Component } from 'react';
// import { Component, useState, useEffect, useMemo, useCallback } from "react";

import Clock from 'react-live-clock';
import Ddate from 'react-live-clock';

function Inputs(props) {
  return (
    <div>
      <form
        className="top_input"
        onSubmit={event => {
          event.preventDefault();
          const title = event.target.inputTitle.value;
          const body = event.target.inputBody.value;
          const date = event.target.inputDate.value;
          if (title !== '' || body !== '' || date !== '') {
            props.onCreate(title, body, date);
          } else {
            alert('모든 항목을 입력하세요!');
            return;
          }
        }}>
        <input
          id="inputTitle"
          type="text"
          placeholder="제목"
          value="title test"
        />
        <textarea
          id="inputBody"
          type="text"
          placeholder="추가 내용"
          value="body test"
        />
        <input id="inputDate" type="date" value="2023-05-05" />
        <input id="inputSubmit" type="submit" value="추가!" />
        {/* <button type="button" id="date" onClick={event => {
            console.log('Clicked!');
          }}>ADD Item</button> */}
      </form>
    </div>
  );
}

function Lists(props) {
  return (
    <div>
      {props.date_current}
      <li>{props.title}</li>
      {props.date_final}
    </div>
  );
}

function Dday(props) {
  const Date = null;
  const [mode, setMode] = useState('none');
  const [list, setList] = useState([
    { id: 1, title: 'title1', date: '' },
    { id: 2, title: 'title2', date: '' },
  ]);
  let content = null;
  let date_current; // 현재 날짜
  let date_final; // 설정 날짜
  let title; // 제목

  if (mode === 'none') {
  } else if (mode === 'read') {
    let title;
    let body = null;
    for (let i = 0; i < list.length; i++) {
      // if (list[i].id === id) {
      title = list[i].title;
      body = list[i].body;
      // }
    }
  } else if (mode === 'create') {
  }

  content = (
    <Lists
      date_current={date_current}
      date_final={date_final}
      title={title}></Lists>
  );
  return (
    <div>
      <h2>Dday Area</h2>
      <p>
        Today is "<Clock format="MM/DD/YYYY"></Clock>"
      </p>
      <Inputs
        onCreate={(inputTitle, inputBody, inputDate) => {
          console.log('onCreate!');
        }}></Inputs>
      <div className="body_list">
        <ul>{content}</ul>
      </div>
    </div>
  );
}

export default Dday;
