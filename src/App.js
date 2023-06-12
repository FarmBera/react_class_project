import './App.css';

import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';

import Head from './components/head';
import Main from './components/main';

import Diary from './components/diary';
import TodoNew from './components/todo_new';
import Dday from './components/dday';

import Login from './components/login';
import Register from './components/register';


// deprecated
/* function PreviousHome(props) {
  return (
    <div>
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
    </div>
  );
} */

export default function App() {
  const [isLogin, setIsLogin] = useState('false'); // 로그인 상태
  const [userid, setUserid] = useState(''); // userId 저장
  const [userpw, setUserpw] = useState(''); // userPw 저장

  useEffect(() => {
    if (!localStorage.getItem('isLogin'))
      localStorage.setItem('isLogin', 'false');
    const getIsLogin = localStorage.getItem('isLogin');
    setIsLogin(getIsLogin);
    const gotUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!gotUserInfo) return;
    // console.log(`gotUserInfo>>"${gotUserInfo}"`);
    setUserid(gotUserInfo.userid);
    setUserpw(gotUserInfo.userpw);
  }, []);
  // console.log('<APP Area>');
  // console.log(`userid>>"${userid}"`);
  // console.log(`userpw>>"${userpw}"`);

  // 로그인 상태 True 로 변경
  const setLoginStatOK = () => {
    setIsLogin('true');
    localStorage.setItem('isLogin', 'true');
  };

  // 로그인 상태 False 로 변경
  const setLogoutOK = () => {
    setIsLogin('false');
    localStorage.setItem('isLogin', 'false');
  };

  // let content = null; // Deprecated

  // 본문 render
  return (
    <div className="App">
      <Head isLogin={isLogin} userid={userid} setLogoutOK={setLogoutOK} />
      <div className="grid">
        <BrowserRouter>
          <Routes>
            {/* Deprecated */}
            {/* <Route
              path="/home"
              element={
                <PreviousHome isLogin={isLogin} userid={userid} />
              }></Route> */}
            <Route path="/"
              element={<Main isLogin={isLogin} userid={userid} />}></Route>
            <Route path="/diary" element={<Diary isLogin={isLogin} />}></Route>
            <Route path="/todo" element={<TodoNew isLogin={isLogin} />}></Route>
            <Route path="/dday" element={<Dday isLogin={isLogin} />}></Route>
            <Route path="/login"
              element={ <Login
                userid={userid} userpw={userpw}
                isLogin={isLogin}
                // setIsLogin={setIsLogin}
                setLogintOK={setLogoutOK} setLoginStatOK={setLoginStatOK}
                />
              }></Route>
            <Route path="/register" element={<Register />}></Route>
            {/* <Route path="/diary_new"
              element={<DiaryEditor isLogin={isLogin} />}></Route> */}
            {/* <Route path="/support" element={<Support isLogin={isLogin} />}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
