import '../css/dday.css';

import { useState } from 'react';
import { useEffect } from 'react';
// import { useMemo } from "react";
// import { useCallback } from "react";
// import { Component } from 'react';
// import { Component, useState, useEffect, useMemo, useCallback } from "react";

import Clock from 'react-live-clock';

const ErrMsg = () => {
  alert('로그인 후에 이용하세요!asd');
  console.log('로그인 후에 이용하세요!');
};

function Inputs(props) {
  return (
    <div>
      <form
        className="top_input"
        onSubmit={event => {
          event.preventDefault();
          // console.log(props.isLogin);
          if (props.isLogin === 'false') {
            ErrMsg();
            return;
          } else {
            const title = event.target.inputTitle.value;
            const body = event.target.inputBody.value;
            const date = event.target.inputDate.value;
            if (title !== '' && body !== '' && date !== '') {
              // console.log(`${title}, ${body}, ${date}`);
              event.target.inputTitle.value = '';
              event.target.inputBody.value = '';
              event.target.inputDate.value = '';
              props.onCreate(title, body, date);
            } else {
              alert('모든 항목을 입력하세요!');
              console.log(`미입력 항목 존재!`);
              return;
            }
          }
        }}>
        <input id="inputTitle" type="text" placeholder="제목" />
        <input id="inputBody" type="text" placeholder="추가 내용" />
        <input id="inputDate" type="date" />
        <input id="inputSubmit" type="submit" value="추가!" />
      </form>
    </div>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id} className='container'>
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

export default function Dday(props) {
  const [mode, setMode] = useState('none');
  const [id, setId] = useState(null);
  let [nextId, setNextId] = useState(
    localStorage.getItem('len') ? localStorage.getItem('len') : 0,
  );
  const [topics, setTopics] = useState([
    {
      id: 0,
      date_current: 'Date sample',
      date_finish: 'Sample"',
      title: 'Sample Title',
      body: 'Sample Body',
    },
  ]);

  /////////////////////////////
  /////////////////////////////
  /////////////////////////////
  const ErrMsg = () => {
    alert('로그인 후에 이용하세요!');
    console.log('로그인 후에 이용하세요!');
    setMode('none');
  };

  let content = null;
  let contextControl = null;

  useEffect(() => {
    if (props.isLogin !== false && localStorage.getItem('localDday')) {
      const storedList = JSON.parse(localStorage.getItem('localDday'));
      // console.log(storedList);
      setTopics(storedList);
      setNextId(storedList.length);
      // setMode('none');
    }
  }, []);

  if (mode === 'none') {
    // console.log(`mode: ${mode}`);
  } else if (mode === 'read') {
    contextControl = (
      <>
        <button
          href={'/update/' + id}
          onClick={event => {
            event.preventDefault();
            if (props.isLogin === 'false') {
              ErrMsg();
              return;
            }
            setMode('UPDATE');
          }}>
          Update
        </button>
        <button
          onClick={() => {
            if (props.isLogin === 'false') {
              ErrMsg();
              return;
            } else {
              const newTopics = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              localStorage.setItem('localDday', JSON.stringify(newTopics));
              setMode('none');
            }
          }}>
          Delete
        </button>
      </>
    );
  }

  // return (
  //   {content}
  // )

  return (
    <div className="hover">
      <h2>Dday Area</h2>
      <p>
        Today is "<Clock format="YYYY-MM-DD " ticking="true"></Clock>"
      </p>
      <Inputs
        isLogin={props.isLogin}
        onCreate={(inputTitle, inputBody, inputDate) => {
          // if (props.isLogin === false) {
          //   alert('로그인 후에 이용하세요!');
          //   console.log('로그인 후에 이용하세요!');
          //   return;
          // } else {
          const date1 = new Date();
          const date2 = new Date(inputDate);
          const DateDiff = date1.getTime() - date2.getTime();

          let temp = Math.floor(DateDiff / (1000 * 60 * 60 * 24));
          if (temp < 0) temp = `${Math.abs(temp)}`;
          else if (temp > 0) temp = `-${temp}`;
          else if (temp === 0) temp = `Day`;

          const conDDay = JSON.stringify(temp);
          const newTopic = {
            id: nextId,
            title: inputTitle,
            body: inputBody,
            date_current: inputDate,
            date_finish: conDDay.replace('"', ''),
          };
          // 추가하기
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          // setMode('read');
          setId(nextId);
          setNextId(nextId + 1);
          localStorage.setItem('localDday', JSON.stringify(newTopics));
          localStorage.setItem('len', nextId);
          // }
        }}></Inputs>
      {contextControl}
      <Nav
        topics={topics}
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
