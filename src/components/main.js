import '../css/main.css'; // main.css import

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import Topclock from './topclock';
// import Todo from '../components/todo_new';
// import Diary from '../components/diary';
// import Dday from '../components/dday';

// 다이어리 부분 출력
function MainDiary(props) {
  let outDiary = null;
  outDiary = <div className="main-info">저장된 다이어리가 없습니다!</div>;
  // console.log(props.diary);
  // console.log(props.diary.length);
  if (!localStorage.getItem('localDiary') || props.diary.length === 0)
    return <div>{outDiary}</div>;
  else {
    // if (props.diary.length > 0) {
    outDiary = [];
    for (let i = 0; i < props.diary.length; i++) {
      let t = props.diary[i];
      // console.log(t);
      outDiary.push(
        <div className="main-diary-container" key={t.id}>
          <hr className="main-body-hr" />
          <div className="main-diary-title">{t.title}</div>
          <div className="main-diary-date">{t.date}</div>
          <div className="main-diary-body">{t.body}</div>
          <hr className="main-body-hr" />
        </div>,
      );
    }
    return <div className="diary-container">{outDiary}</div>;
  }
  // console.log(outDiary);
}

// 투두 리스트 부분 출력
function MainTodo(props) {
  // let outTodo = [];
  let outTodo = <div className="main-info">저장된 Todo 리스트가 없습니다!</div>;
  // console.log(props.task);
  if (!localStorage.getItem("localTasks") || props.task.length === 0)
    return <div>{outTodo}</div>;
  else {
    outTodo = [];
    for (let i = 0; i < props.task.length; i++) {
      let t = props.task[i];
      outTodo.push(
        <div key={t.id} className="">
          <hr className="main-body-hr" />
          <span className="item-dday">{t.title}</span>
          <hr className="main-body-hr" />
        </div>
      );
    }
    return <div>{outTodo}</div>;
  }
}

// 디데이 부분 출력
function MainDday(props) {
  // let outDday = [];
  let outDday = <div className="main-info">저장된 D-Day가 없습니다!</div>;
  if (!localStorage.getItem('localDday') || props.dday.length === 0)
    return <div>{outDday}</div>;
  else {
    outDday = [];
    for (let i = 0; i < props.dday.length; i++) {
      let t = props.dday[i];
      outDday.push(
        <div key={t.id} className="">
          <hr className="main-body-hr" />
          <span className="item-dday">D-{t.date_finish}</span>
          <span className="space"> / </span>
          <span className="item-dday">{t.title}</span>
          <hr className="main-body-hr" />
        </div>
      );
    }
    return <div>{outDday}</div>;
  }
}

// main.js 메인 코드
export default function Main(props) {
  let [diary, setDiary] = useState('null');
  let [dday, setDday] = useState('null');
  let [task, setTask] = useState('null');

  useEffect(() => {
    if (localStorage.getItem('localDday')) setDday(JSON.parse(localStorage.getItem('localDday')));
    if (localStorage.getItem('localDiary')) setDiary(JSON.parse(localStorage.getItem('localDiary')));
    if (localStorage.getItem('localTasks')) setTask(JSON.parse(localStorage.getItem('localTasks')));
  }, []);

  // console.log(`from localStorage >> ${props.diary}`);

  // console.log(props.isLogin);
  let OutputArea = (
    <div className="main-container">
      <div className="main-box">
        {/* <Diary /> */}
        <h2 className="main-title"
          onClick={() => {
            window.location.href = '/diary';
          }}>Diary</h2>
        <MainDiary diary={diary}></MainDiary>
      </div>
      <div className="main-box">
        {/* <Todo /> */}
        <h2 className="main-title"
          onClick={() => {
            window.location.href = '/todo';
          }}>ToDo</h2>
        <MainTodo task={task}></MainTodo>
      </div>
      <div className="main-box">
        {/* <Dday /> */}
        <h2 className="main-title"
          onClick={() => {
            window.location.href = '/dday';
          }}>D-Day</h2>
        <MainDday dday={dday}></MainDday>
      </div>
    </div>
  );

  return (
    <div className="MainTemp">
      <Topclock userid={props.userid} />
      <hr className="headHR" />
      {props.isLogin === 'false' ? (
        <div className="err-msg">로그인 후 이용하세요!</div>
      ) : (
        OutputArea
      )}
    </div>
  );
}
