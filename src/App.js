import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';

import Head from './components/head';
import Foot from './components/foot';

import Topclock from './components/topclock';
import Diary from './components/diary';
// import Todo from './components/todo';
import TodoNew from './components/todo_new';
import Dday from './components/dday';

import Support from './components/support';
import Login from './components/login';
import Register from './components/register';
import DiaryEditor from './(deprecated)/diary_new';
import { useEffect, useState } from 'react';

function Home(props) {
  return (
    <div>
      {/* <StyledHome> */}
      <Topclock isLogin={props.isLogin} userid={props.userid} />
      <div className="BoxContainer">
        <div className="box-a">
          <Diary />
        </div>
        <div className="box-b">
          <TodoNew />
        </div>
        <div className="box-c">
          <Dday />
        </div>
      </div>
      {/* </StyledHome> */}
    </div>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState('false'); // 로그인 상태
  // const [username, setUsername] = useState(''); // userName 저장
  const [userid, setUserid] = useState(''); // userId 저장
  const [userpw, setUserpw] = useState(''); // userPw 저장

  useEffect(() => {
    if (!localStorage.getItem('isLogin'))
      localStorage.setItem('isLogin', 'false');
    // if (!localStorage.getItem('userInfo')) return;

    const getIsLogin = localStorage.getItem('isLogin');
    setIsLogin(getIsLogin);
    const gotUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(`gotUserInfo>>"${gotUserInfo}"`);
    setUserid(gotUserInfo.userid);
    setUserpw(gotUserInfo.userpw);
  }, []);
  // console.log('<APP Area>');
  // console.log(`userid>>"${userid}"`);
  // console.log(`userpw>>"${userpw}"`);

  const setLoginStatOK = () => {
    setIsLogin('true');
    localStorage.setItem('isLogin', 'true');
  };

  const setLogoutOK = () => {
    setIsLogin('false');
    localStorage.setItem('isLogin', 'false');
  };

  let content = null;
  return (
    <div className="App">
      <Head isLogin={isLogin} userid={userid} setLogoutOK={setLogoutOK} />
      <div className="grid">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home isLogin={isLogin} userid={userid} />}></Route>
            <Route
              path="/diary_new"
              element={<DiaryEditor isLogin={isLogin} />}></Route>
            <Route path="/diary" element={<Diary isLogin={isLogin} />}></Route>
            {/* <Route path="/todo" element={<Todo isLogin={isLogin} />}></Route> */}
            <Route path="/todo" element={<TodoNew isLogin={isLogin} />}></Route>
            <Route path="/dday" element={<Dday isLogin={isLogin} />}></Route>

            <Route
              path="/support"
              element={<Support isLogin={isLogin} />}></Route>
            <Route
              path="/login"
              element={
                <Login
                  userid={userid}
                  userpw={userpw}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  setLogintOK={setLogoutOK}
                  setLoginStatOK={setLoginStatOK}
                />
              }></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
