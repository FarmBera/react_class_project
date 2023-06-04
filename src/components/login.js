import '../css/login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState('no');
  let [inputId, setInputId] = useState('');
  let [inputPw, setInputPw] = useState('');

  // useEffect(() => {
  // const loginState = JSON.parse(localStorage.getItem('isLogin'));
  // console.log(loginState);
  // if (props.isLogin) {
  //   // props.setIsLogin('loginState', false);
  //   // console.log('로그아웃 됨!');
  //   navigate('/');
  // } else {
  //   // console.log(`guest mode`);
  // }
  // const localInfo = localStorage.getItem('userInfo');
  // if (localInfo) {
  // }
  // });
  return (
    <div className="Login">
      <h1>Login Page</h1>
      <form id="redister">
        <div className="user_box">
          <h2>username</h2>
          <input
            type="text"
            id="userId"
            placeholder="아이디를 입력해주세요"
            onChange={event => {
              setInputId(event.target.value);
            }}
          />
          <h2>password</h2>
          <input
            type="password"
            id="userPw"
            placeholder="비밀번호를 입력해주세요"
            onChange={event => {
              setInputPw(event.target.value);
            }}
          />
        </div>
        <div className="button_box">
          <a
            id="submit"
            href="/"
            onClick={event => {
              event.preventDefault();
              console.log(`props.userid>>"${props.userid}"`);

              if (props.userid === null && props.userpw === null) {
                console.log(`NO Saved Info`);
                return;
              }
              if (props.userid !== inputId || props.userpw !== inputPw) {
                alert('일치하는 정보가 없습니다. ');
                console.log(`일치하는 정보가 없습니다. `);
                return;
              }
              console.log(`login SUCCESS!`);
              props.setLoginStatOK(); // 로그인 성공 함수 호출
              navigate('/');

              // if (props.userid === '' && props.userpw === '') {
              //   if (props.userid !== inputId || props.userpw !== inputPw) {
              //     alert('일치하는 정보가 없습니다. ');
              //     console.log(`일치하는 정보가 없습니다. `);
              //   } else {
              //     console.log(`login SUCCESS!`);
              //     props.setLoginStatOK(); // 로그인 성공 함수 호출
              //     navigate('/');
              //   }
              // }
            }}>
            전송
          </a>
        </div>
      </form>
    </div>
  );
}
