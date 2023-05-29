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
      <br />
      {props.date_final}
      <br />
      {props.title}
      <br />
      {props.body}
    </div>
  );
}

function Dday(props) {
  const [mode, setMode] = useState('none');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState('0');
  const [topics, setTopics] = useState([
    { id: 1, title: 'title1', body: 'body1', date_current: '' },
    { id: 2, title: 'title2', body: 'body1', date_current: '' },
  ]);

  // const [listid, setListid] = useState('0');
  // const [list, setList] = useState([
  //   { id: 1, title: 'title1', body: 'body1', date_current: '' },
  //   { id: 2, title: 'title2', body: 'body1', date_current: '' },
  // ]);

  let content = null;
  let visibleContent = null;

  if (mode === 'none') {
  } else if (mode === 'read') {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      // console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Lists title={title} body={body}></Lists>;
    // let title,
    //   body = null,
    //   date_current = null,
    //   date_final = null; // 계산한 날짜 삽입할 것

    // for (let i = 0; i < list.length; i++) {
    //   if (list[i].id === listid) {
    //     title = list[i].title;
    //     body = list[i].body;
    //     date_current = list[i].date;
    //     date_final = null; // 계산한 날짜 삽입할 것
    //   }
    // }
    // visibleContent = (
    //   <Lists
    //     title={title}
    //     body={body}
    //     date_current={date_current}
    //     date_final={date_final}></Lists>
    // );
  } else if (mode === 'create') {
  }

  return (
    <div>
      <h2>Dday Area</h2>
      <p>
        Today is "<Clock format="MM/DD/YYYY"></Clock>"
      </p>
      <Inputs
        onCreate={(inputTitle, inputBody, inputDate) => {
          const newTopic = {
            id: nextId,
            title: inputTitle,
            body: inputBody,
            inputDate: inputDate,
          };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode('read');
          setId(nextId);
          setNextId(nextId + 1);
        }}></Inputs>
      {/* <Inputs
        onCreate={(inputTitle, inputBody, inputDate) => {
          console.log('onCreate!');
          const newItem = { id: listid, title: inputTitle, body: inputBody };
          const newItems = [...newItem];
          newItems.push(newItem);
          setList(newItems);
          setMode('read');
          setListid(listid);
          setListid(listid + 1);
        }}></Inputs> */}
      <div className="body_list">
        <ul>{content}</ul>
      </div>
    </div>
  );
}

export default Dday;
