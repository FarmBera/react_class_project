import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

import '../css/todo.css';

export default function TodoNew() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  console.log(task);
  console.log(tasks);

  useEffect(() => {
    if (localStorage.getItem('localTasks')) {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      setTasks(storedList);
    }
  }, []);

  const addTask = event => {
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

  return (
    <div className="">
      <h1 className="title">TODO List</h1>
      <div className="badge">
        You have
        <span>
          {!tasks.length
            ? ' no '
            : tasks.length === 1
            ? ' 1 '
            : tasks.length > 1
            ? ` ${tasks.length} `
            : null}
        </span>
        tasks
      </div>
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
      {tasks.map(task => (
        <React.Fragment key={task.id}>
          <div className="outer">
            <div className="container">
              <button
                className="custom-btn btn-3"
                onClick={() => DeleteContent(task)}>
                <span>{/* 완료! */}</span>
              </button>
              <span className="innertext fromLeft">{task.title}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
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
