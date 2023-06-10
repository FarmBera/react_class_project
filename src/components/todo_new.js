import '../css/todo.css';
import '../css/checkBox.css';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function TodoNew(props) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  // console.log(task);
  // console.log(tasks);

  // 페이지 불러올 시,
  useEffect(() => {
    if (localStorage.getItem('localTasks')) {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      setTasks(storedList);
    }
    // console.log(props.isLogin);
  }, []);

  // 오류 메시지
  const ErrMsg = props => {
    alert('로그인 후에 이용하세요!');
    console.log('로그인 후에 이용하세요!');
    return;
  };

  // 작업 추가하기
  const addTask = event => {
    if (props.isLogin === 'false') {
      ErrMsg();
      return;
    }
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      // console.log(newTask);
      setTasks([...tasks, newTask]);
      localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]));
      setTask('');
    }
  };

  // 삭제하기
  const DeleteContent = task => {
    const deleted = tasks.filter(t => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem('localTasks', JSON.stringify(deleted));
  };

  // 모두 제거하기
  const clearContent = () => {
    setTasks([]);
    localStorage.removeItem('localTasks');
  };

  // 경고 메시지 스타일
  const WarningStyle = styled.div`
    span {
      font-size: 35pt;
      color: red;
    }
  `;

  // 할 일 개수 보여주는 곳
  let badgeInfo = null;
  if (props.isLogin === 'false') {
    badgeInfo = (
      <WarningStyle>
        <div className="badge">
          <span className="">로그인 후 이용하세요!</span>
        </div>
      </WarningStyle>
    );
  } else {
    badgeInfo = (
      <div className="badge">
        해야 할 일 개수:
        <span>
          {!tasks.length
            ? ' 없음 '
            : tasks.length === 1
            ? ' 1 '
            : tasks.length > 1
            ? ` ${tasks.length} `
            : null}
        </span>
        {/* <div className="badge">
        해야 할 일이
        {!tasks.length ? (
          <span>없습니다.</span>
        ) : tasks.length === 1 ? (
          <div>
            <span>{tasks.length}</span>
            <p>개 있습니다. </p>
          </div>
        ) : tasks.length > 1 ? (
          ` ${tasks.length} `
        ) : null}
        개 있습니다. */}
      </div>
    );
  }
  // console.log(tasks);
  // Output area
  return (
    <div className="">
      <h1 className="title">TODO List</h1>
      {badgeInfo}
      <div className="input-area ">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          className="input-box"
          onChange={event => setTask(event.target.value)}
        />
        <button className="input-addBtn" onClick={addTask}>
          추가
        </button>
      </div>
      {props.isLogin === 'false' ? (
        <div></div>
      ) : (
        <>
          {tasks.length === 0 ? (
            <div className="info">할 일이 없습니다!</div>
          ) : (
            tasks.map(task => (
              <React.Fragment key={task.id}>
                <div className="outer">
                  <div className="container-todo">
                    <div className="grid">
                      <label className="checkbox bounce">
                        <input
                          type="checkbox"
                          onClick={() => {
                            DeleteContent(task);
                          }}
                        />
                        <svg viewBox="0 0 21 21">
                          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                        </svg>
                      </label>
                    </div>
                    {/* <button
                  className="custom-btn btn-3"
                  // className="input-addBtn"
                  onClick={() => DeleteContent(task)}>
                  <span></span>
                </button> */}
                    <span className="innertext fromLeft">{task.title}</span>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </>
      )}
      {props.isLogin === 'false' || !tasks.length ? null : (
        <div className="item-bottom">
          <button className="clearBtn" onClick={() => clearContent()}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
