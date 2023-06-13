import '../css/head.css';
import logo from '../img/logo.png';

// import { useState } from 'react';
// import { useEffect } from 'react';

// 헤더 영역
export default function Head(props) {
  /** useEffect 이용하여 localStorage에서 값 불러오려고 하였으나, 
   * props 로 불러오는게 더 효율적이라고 판단하여 deprecated
   */
  // useEffect(() => {
  //   if (!localStorage.getItem('isLogin')) {
  //     return;
  //   } else {
  //     setIsLoginlog(JSON.stringify(localStorage.getItem('isLogin')));
  //     // const atLocalLogin = JSON.stringify(localStorage.getItem('isLogin'));
  //   }
  // });
  // console.log(props.isLogin);

  /** 헤더 출력 부분 */
  return (
    <header className="header">
      <div className="header">
        <a href="/" className="logo">
          <img src={logo} alt="logo" width="30px" />
          X-Diary
        </a>
        <div className="header-right">
          <a href="/diary">Diary</a>
          <a href="/todo">TODO</a>
          <a href="/dday">D-Day</a>
          {/* <a href="/support">About</a> */}
          <a href="/login"
            onClick={event => {
              event.preventDefault();
              if (props.isLogin === 'true') props.setLogoutOK();
              else window.location.href = '/login';
              // console.log(props.isLogin);
            }}>
            {/* 삼항 연산자: 로그인 여부에 따라서 보여지는 값 달라지게 설정 */}
            {props.isLogin === 'true' ? 'LogOut' : 'LogIn'}
            {/* {isLoginlog} */}
          </a>
          <a href="/register">Register</a>
        </div>
      </div>
    </header>
  );
}
