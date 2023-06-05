import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import '../css/todo.css';

export default function TodoNew(props) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  // console.log(task);
  // console.log(tasks);

  useEffect(() => {
    if (localStorage.getItem('localTasks')) {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      setTasks(storedList);
    }
  }, []);

  const ErrMsg = props => {
    alert('로그인 후에 이용하세요!');
    console.log('로그인 후에 이용하세요!');
    return;
  };

  const addTask = event => {
    if (props.isLogin === 'false') {
      ErrMsg();
      return;
    }
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      console.log(newTask);
      setTasks([...tasks, newTask]);
      localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]));
      setTask('');
    }
  };

  const DeleteContent = task => {
    const deleted = tasks.filter(t => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem('localTasks', JSON.stringify(deleted));
  };

  const clearContent = () => {
    setTasks([]);
    localStorage.removeItem('localTasks');
  };

  const WarningStyle = styled.div`
    span {
      color: red;
    }
  `;

  let badgeInfo = null;
  // console.log(props.isLogin);
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
          add
        </button>
      </div>
      {props.isLogin === 'false' ? (
        <div>asdf</div>
      ) : (
        tasks.map(task => (
          <React.Fragment key={task.id}>
            <div className="outer">
              <div className="container-todo">
                <button
                  className="custom-btn btn-3"
                  onClick={() => DeleteContent(task)}>
                  <span>{/* 완료! */}</span>
                </button>
                <span className="innertext fromLeft">{task.title}</span>
              </div>
            </div>
          </React.Fragment>
        ))
      )}
      {!tasks.length ? null : (
        <div className="item-bottom">
          <button className="body-clearBtn" onClick={() => clearContent()}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
