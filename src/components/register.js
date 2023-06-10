import '../css/register.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  // const [isLogin, setIsLogin] = useState('no');
  let [inputId, setInputId] = useState('');
  let [inputPw, setInputPw] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const localInfo = localStorage.getItem('userInfo');
    // console.log("userObj:", localInfo);
    if (localInfo) {
      setInputPw(localInfo.userid);
      setInputPw(localInfo.password);
    }
  }, []);
  return (
    <div className="login-box">
      <h1>Register</h1>
      <form id="register">
        <div className="user-box">
          <h2>username</h2>
          <input id="userId" type="text"
            onChange={event => {
              setInputId(event.target.value);
            }}
          /><label>아이디를 입력해주세요</label>
        </div>
        <div className="user-box">
          <h2>password</h2>
          <input id="userPw" type="password"
            onChange={event => {
              setInputPw(event.target.value);
            }}
          /><label>비밀번호를 입력해주세요</label>
        </div>
        <div className="button-form">
          <a id="submit" href="/"
            onClick={event => {
              event.preventDefault();
              let userObj = {
                userid: inputId,
                userpw: inputPw,
              };
              console.log(userObj);
              userObj = JSON.stringify(userObj);
              localStorage.setItem('userInfo', userObj);
              navigate('/'); // 메인 화면으로 이동
            }}>
            전송
          </a>
        </div>
      </form>
    </div>
  );
}
