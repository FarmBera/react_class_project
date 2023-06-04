import '../css/register.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isLogin, setIsLogin] = useState('no');
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
    <div className="Login">
      <h1>Register Page</h1>
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
              let userObj = {
                userid: inputId,
                userpw: inputPw,
              };
              console.log(userObj);
              userObj = JSON.stringify(userObj);
              localStorage.setItem('userInfo', userObj);
              navigate('/');
            }}>
            전송
          </a>
        </div>
      </form>
    </div>
  );
}
