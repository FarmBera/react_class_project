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

  /** 오류 메시지 */
  const ErrMsg = Msg => {
    alert(Msg);
    console.log(Msg);
    return;
  };

  /** 작업 추가하기 */
  const addTask = event => {
    if (props.isLogin === 'false') {
      ErrMsg(`로그인 후 이용하세요!`);
      return;
    }
    if (task) {
      const newTask = { 
        id: new Date().getTime().toString(),
        title: task
      };
      // console.log(newTask);
      setTasks([...tasks, newTask]);
      localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]));
      setTask('');
    }
    else ErrMsg(`항목을 입력하세요!`);
  };

  /** 삭제하기 */
  const DeleteContent = task => {
    const deleted = tasks.filter(t => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem('localTasks', JSON.stringify(deleted));
  };

  /** 모두 제거하기 */
  const clearContent = () => {
    setTasks([]);
    localStorage.removeItem('localTasks');
  };

  // 경고 메시지 스타일 컴포넌트
  /** 경고 메시지 스타일 컴포넌트 */
  const WarningStyle = styled.div`
    span {
      font-size: 35pt;
      color: red;
    }
  `;

  // 할 일 개수 보여주는 곳
  /** badgeInf
   * / 할 일 개수 보여줌 / 
   */
  let badgeInfo = null;
  if (props.isLogin === 'false') {
    badgeInfo = (
      // 스타일 컴포넌트 사용
      <WarningStyle>
        <div className="badge">
          <span className="">로그인 후 이용하세요!</span>
        </div>
      </WarningStyle>
    );
  } 
  else {
    badgeInfo = (
      <div className="badge">
        해야 할 일 개수:
        <span>
          {/* 삼항 연산자를 이용하여 저장된 값에 따라 분기 */}
          {!tasks.length
            ? ' 없음 '
            : tasks.length === 1
            ? ' 1 '
            : tasks.length > 1
            ? ` ${tasks.length} `
            : null}
        </span>
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
        <input className="input-box" name="task" type="text" value={task} placeholder="Write your task..."
          onChange={event => setTask(event.target.value)}
        />
        <button className="input-addBtn" onClick={addTask}>추가</button>
      </div>
      {/* 로그인 상태에 따라서 분기 */}
      {props.isLogin === 'false' ? (
        // 비어있는 element 출력
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
                        <input type="checkbox"
                          onClick={() => {
                            DeleteContent(task);
                          }}
                        />
                        <svg viewBox="0 0 21 21">
                          <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                        </svg>
                      </label>
                    </div>
                    <span className="innertext fromLeft">{task.title}</span>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </>
      )}
      {/** 초기화 버튼 부분
       * 로그인 상태가 false 라면, 버튼이 보이지 않음
       * 로그인 상태가 true 라면, 버튼이 보여짐
       */}
      {props.isLogin === 'false' || !tasks.length ? null : (
        <div className="item-bottom">
          <button className="clearBtn" onClick={() => clearContent()}>Clear</button>
        </div>
      )}
    </div>
  );
}
