// import { useState, useEffect } from 'react';
import '../css/head.css';
import logo from '../img/logo.png';
// import logo from "img/logo.png";
// import search_ico from "img/search-icon.png";

export default function Head(props) {
  // useEffect(() => {
  //   if (!localStorage.getItem('isLogin')) {
  //     return;
  //   } else {
  //     setIsLoginlog(JSON.stringify(localStorage.getItem('isLogin')));
  //     // const atLocalLogin = JSON.stringify(localStorage.getItem('isLogin'));
  //   }
  // });
  // console.log(props.isLogin);
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
          <a href="/support">About</a>
          {/* <a href="/login">LogIn</a> */}
          <a
            href="/login"
            onClick={event => {
              event.preventDefault();
              if (props.isLogin === 'true') {
                props.setLogoutOK();
              } else {
                window.location.href = '/login';
              }
              // console.log(event.target.value)
              // if (event.target.value === "")
              console.log(props.isLogin);
            }}>
            {props.isLogin === 'true' ? 'LogOut' : 'LogIn'}
            {/* {isLoginlog} */}
            {/* <span>{loginStat}</span> */}
          </a>
          <a href="/register">Register</a>
        </div>
      </div>
    </header>
  );
}
