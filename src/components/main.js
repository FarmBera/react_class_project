import '../css/main.css';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import Topclock from './topclock';
import Todo from '../components/todo_new';
import Diary from '../components/diary';
import Dday from '../components/dday';

function MainDiary(props) {
  let output = [];
  if (props.diary === 'null') {
    output = null;
  } else {
    for (let i = 0; i < props.diary.length; i++) {
      let t = props.diary[i];
      // console.log(t);
      output.push(
        <div className="main-diary-container" key={t.id}>
          <hr />
          <div className="main-diary-title">{t.title}</div>
          <div className="main-diary-date">{t.date}</div>
          <div className="main-diary-body">{t.body}</div>
          <hr />
        </div>,
      );
    }
  }
  return <div className="diary-container">{output}</div>;
}
function MainTodo(props) {
  let lis = [];
  // console.log(props.task);
  if (props.task === 'null') {
    lis = null;
  } else {
    for (let i = 0; i < props.task.length; i++) {
      let t = props.task[i];
      lis.push(
        <div key={t.id} className="">
          <hr className="headHR" />
          <span className="item-dday">{t.title}</span>
          <hr className="headHR" />
        </div>,
      );
    }
  }
  return <div>{lis}</div>;
}
function MainDday(props) {
  let lis = [];
  if (props.dday === 'null') {
    lis = null;
  } else {
    for (let i = 0; i < props.dday.length; i++) {
      let t = props.dday[i];
      lis.push(
        <div key={t.id} className="">
          <hr className="headHR" />
          <span className="item-dday">D-{t.date_finish}</span>
          <span className="space"> </span>
          <span className="item-dday">{t.title}</span>
          <hr className="headHR" />
        </div>,
      );
    }
  }
  return <div>{lis}</div>;
}

export default function Main() {
  let [diary, setDiary] = useState('null');
  let [dday, setDday] = useState('null');
  let [task, setTask] = useState('null');

  useEffect(() => {
    if (localStorage.getItem('localDday'))
      setDday(JSON.parse(localStorage.getItem('localDday')));
    if (localStorage.getItem('localDiary'))
      setDiary(JSON.parse(localStorage.getItem('localDiary')));
    if (localStorage.getItem('localTasks'))
      setTask(JSON.parse(localStorage.getItem('localTasks')));
  }, []);

  return (
    <div className="MainTemp">
      <Topclock />
      <hr></hr>
      <div className="main-container">
        <div className="main-box">
          {/* <Diary /> */}
          <h2
            className="main-title"
            onClick={() => {
              window.location.href = '/diary';
            }}>
            Diary
          </h2>
          <MainDiary diary={diary}></MainDiary>
        </div>
        <div className="main-box">
          {/* <Todo /> */}
          <h2
            className="main-title"
            onClick={() => {
              window.location.href = '/todo';
            }}>
            ToDo
          </h2>
          <MainTodo task={task}></MainTodo>
        </div>
        <div className="main-box">
          {/* <Dday /> */}
          <h2
            className="main-title"
            onClick={() => {
              window.location.href = '/dday';
            }}>
            D-Day
          </h2>
          <MainDday dday={dday}></MainDday>
        </div>
      </div>
    </div>
  );
}
