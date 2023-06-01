import '../css/main.css';

import { useState } from 'react';
// import { useEffect } from "react";
// import { useMemo } from "react";
// import { useCallback } from "react";
// import { Component } from 'react';
// import { Component, useState, useEffect, useMemo, useCallback } from "react";

import Clock from 'react-live-clock';

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
          if (title !== '' && body !== '' && date !== '') {
            // console.log(`${title}, ${body}, ${date}`);
            props.onCreate(title, body, date);
          } else {
            alert('모든 항목을 입력하세요!');
            console.log(`미입력 항목 존재!`);
            return;
          }
        }}>
        {/* <input id="inputTitle" type="text" placeholder="제목" value="test" />
        <input
          id="inputBody"
          type="text"
          placeholder="추가 내용"
          value="12345678"
        />
        <input id="inputDate" type="date" value="2023-05-06" />
        <input id="inputSubmit" type="submit" value="추가!" /> */}

        <input id="inputTitle" type="text" placeholder="제목" />
        <input id="inputBody" type="text" placeholder="추가 내용" />
        <input id="inputDate" type="date" />
        <input id="inputSubmit" type="submit" value="추가!" />
        {/* <button type="button" id="date" onClick={event => {
            console.log('Clicked!');
          }}>ADD Item</button> */}
      </form>
    </div>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <hr />
        <span>
          <a
            id={t.id}
            href={'/read/' + t.id}
            onClick={event => {
              event.preventDefault();
              props.onChangeMode(Number(event.target.id));
            }}>
            D-{t.date_finish}
          </a>
        </span>
        &nbsp;
        <span>{t.date_current}</span>
        &nbsp;
        <span>{t.title}</span> &nbsp;
        <span>{t.body}</span>
        <hr />
      </li>,
    );
  }
  return (
    <nav>
      <ul>{lis}</ul>
    </nav>
  );
}

function Dday(props) {
  const [mode, setMode] = useState('none');
  const [id, setId] = useState(null);
  let [nextId, setNextId] = useState(0);
  const [topics, setTopics] = useState([
    {
      id: 0,
      date_current: '2021-05-06',
      date_finish: 'Day"',
      title: 'title1',
      body: 'body1',
    },
  ]);

  /////////////////////////////
  /////////////////////////////
  /////////////////////////////

  let content = null;
  let contextControl = null;

  if (mode === 'none') {
    // console.log(`mode: ${mode}`);
  } else if (mode === 'read') {
    contextControl = (
      <>
        <button
          href={'/update/' + id}
          onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
          }}>
          Update
        </button>
        <button
          onClick={() => {
            const newTopics = [];
            for (let i = 0; i < topics.length; i++) {
              if (topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode('none');
          }}>
          Delete
        </button>
      </>
    );
  }

  return (
    <div>
      <h2>Dday Area</h2>
      <p>
        Today is "<Clock format="YYYY-MM-DD " ticking="true"></Clock>"
      </p>
      {/* {contextControl} */}
      <Inputs
        onCreate={(inputTitle, inputBody, inputDate) => {
          // 날짜 변환
          const date1 = new Date();
          const date2 = new Date(inputDate);
          // 날짜 계산
          const DateDiff = date1.getTime() - date2.getTime();

          // 계산
          let temp = Math.floor(DateDiff / (1000 * 60 * 60 * 24));
          console.log(temp);
          if (temp < 0) temp = `${Math.abs(temp)}`;
          else if (temp > 0) temp = `-${temp}`;
          else if (temp === 0) temp = `Day`;

          // 날짜 문자열로 변환
          // temp = JSON.stringify(temp);
          const conDDay = JSON.stringify(temp);
          // Math.floor(Math.abs(DateDiff / (1000 * 60 * 60 * 24))),
          // Math.floor(DateDiff / (1000 * 60 * 60 * 24)),
          console.log(conDDay);
          // 객체 생성
          const newTopic = {
            id: nextId,
            title: inputTitle,
            body: inputBody,
            date_current: inputDate,
            date_finish: conDDay.replace('"', ''),
          };
          /** 추가하기 */
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          // setMode('read');
          setId(nextId);
          setNextId(nextId + 1);
        }}></Inputs>
      {contextControl}
      <Nav
        topics={topics}
        onClickInfo={() => {
          console.log('asdfasdfa');
        }}
        onChangeMode={_id => {
          setMode('read');
          setId(_id);
        }}></Nav>
      {/* <div className="body_list">
        <ul>{content}</ul>
      </div> */}
    </div>
  );
}

export default Dday;
