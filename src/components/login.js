import '../css/register.css';
import { useState } from 'react';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 객체
  let [inputId, setInputId] = useState('');
  let [inputPw, setInputPw] = useState('');

  /** 로그인 상태 가져오기 (from localStorage) Comment
   * localStorage에서 직접 가져오는 것보다, 
   * props로 가져오는 것이 더 좋을 것 같아서 해당 코드는 Deprecate
   */
  // const [isLogin, setIsLogin] = useState('no');
  // let [savedId, setSavedId] = useState('');
  // let [savedPw, setSavedPw] = useState('');

  // 시도 1
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

  // 시도 2
  // useEffect(() => {
  //   const info = localStorage.getItem('userInfo');
  //   if (!info) return;
  //   const savedInfo = JSON.parse(info);
  //   // console.log(savedInfo);
  //   setSavedId(savedInfo.userid);
  //   setSavedPw(savedInfo.userpw);
  //   // console.log(savedInfo.userid);
  // });

  // 메시지 출력
  const ErrMsg = inputMsg => {
    if (!inputMsg) alert(`Undefined ERR`);
    else alert(`${inputMsg}`);
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
            }}/>
            <label>아이디를 입력해주세요</label>
        </div>{' '}
        <div className="user-box">
          <h2>password</h2>
          <input id="userPw" name="pw" type="password"
            onChange={event => {
              setInputPw(event.target.value);
            }}/>
            <label>비밀번호를 입력해주세요</label>
        </div>
        <div className="button-box">
          <a id="submit" href="/"
            onClick={event => {
              event.preventDefault();
              // console.log(`props.userid>>"${props.userid}"`);
              // 로그인 유효성 판단
              if (props.userid !== inputId || props.userpw !== inputPw
                || (props.userid === null && props.userpw === null)
                ) {
                ErrMsg(`일치하는 정보가 없습니다.`);
                return;
              }
              // console.log(`login SUCCESS!`);
              // console.log(`savedId>>${savedId}`);
              // console.log(`savedPw>>${savedPw}`);
              // console.log(`inputId>>${inputId}`);
              // console.log(`inputPw>>${inputPw}`);
              props.setLoginStatOK(); // 로그인 성공 함수 호출
              navigate('/'); // 메인 페이지로 이동
            }}>전송</a>
        </div>
      </form>
    </div>
  );
}
