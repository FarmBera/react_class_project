import { useState, useEffect } from 'react';
import '../css/head.css';
// import logo from "img/logo.png";
// import search_ico from "img/search-icon.png";

export default function Head(props) {
  // const [isLoginlog, setIsLoginlog] = useState('false');
  // let [loginStat, setLoginStat] = useState('false');

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
          {/* <img src="../img/logo.png" alt="logo" width="30px" /> */}
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
      {/* <nav>
        <ul>
          <li className="">
            <a href="/diary">Diary</a>
          </li>
          <li className="">
            <a href="/todo">ToDo</a>
          </li>
          <li className="">
            <a href="/dday">D-Day</a>
          </li>
          <li className="">
            <a href="#">LogIn</a>
          </li>
          {/* <li className="">
                <input type="text" placeholder="Search..." />
                <img src="search_ico" alt="search Icon" />
              </li>
        </ul>
      </nav> */}
    </header>
  );
}
