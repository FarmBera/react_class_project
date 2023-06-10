import '../css/register.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState('no');
  let [inputId, setInputId] = useState('');
  let [inputPw, setInputPw] = useState('');
  // let [savedId, setSavedId] = useState('');
  // let [savedPw, setSavedPw] = useState('');

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

  // useEffect(() => {
  //   const info = localStorage.getItem('userInfo');
  //   if (!info) return;
  //   const savedInfo = JSON.parse(info);
  //   // console.log(savedInfo);
  //   setSavedId(savedInfo.userid);
  //   setSavedPw(savedInfo.userpw);
  //   // console.log(savedInfo.userid);
  // });

  const ErrMsg = inputMsg => {
    if (!inputMsg) alert(`Undefined ERR`);
    else {
      console.log(`${inputMsg}`);
      alert(`${inputMsg}`);
    }
    return;
  };

  return (
    <div className="login-box">
      <h1>Login Page</h1>
      <form id="register">
        <div className="user-box">
          <h2>username</h2>
          <input id="userId" name="id" type="text"
            onChange={event => {
              setInputId(event.target.value);
            }}
          />
          <label>아이디를 입력해주세요</label>
        </div>{' '}
        <div className="user-box">
          <h2>password</h2>
          <input id="userPw" name="pw" type="password"
            onChange={event => {
              setInputPw(event.target.value);
            }}
          />
          <label>비밀번호를 입력해주세요</label>
        </div>
        <div className="button-box">
          <a id="submit" href="/"
            onClick={event => {
              event.preventDefault();
              // console.log(`props.userid>>"${props.userid}"`);
              if (props.userid === null && props.userpw === null) {
                // console.log(`NO Saved Info`);
                return;
              }
              if (props.userid !== inputId || props.userpw !== inputPw) {
                ErrMsg(`일치하는 정보가 없습니다.`);
                return;
              }
              // console.log(`savedId>>${savedId}`);
              // console.log(`savedPw>>${savedPw}`);
              // console.log(`inputId>>${inputId}`);
              // console.log(`inputPw>>${inputPw}`);
              console.log(`login SUCCESS!`);
              props.setLoginStatOK(); // 로그인 성공 함수 호출
              navigate('/'); // 메인 페이지로 이동

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
