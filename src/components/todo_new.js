import React, { useState, useEffect } from 'react';

export default function TodoNew() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('localTasks')) {
      const storedList = JSON.parse(localStorage.getItem('localTasks'));
      setTasks(storedList);
    }
  }, []);

  const addTask = event => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
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
        {!tasks.length
          ? ' no tasks'
          : tasks.length === 1
          ? ' 1 task'
          : tasks.length > 1
          ? ` ${tasks.length} tasks`
          : null}
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
          <div className="body">
            <button className="delBtn" onClick={() => DeleteContent(task)}>
              Del
            </button>{' '}
            &nbsp;
            <span className="innertext">{task.title}</span>
          </div>
        </React.Fragment>
      ))}
      {!tasks.length ? null : (
        <div>
          <button
            className="clearBtn"
            onClick={() => clearContent()}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
