import '../css/dday.css';

import { useState } from 'react';
import { useEffect } from 'react';
import Clock from 'react-live-clock';

// 오류 메시지 띄우기
const ErrMsg = inputMsg => {
  // const msg = `로그인 후에 이용하세요!`
  alert(inputMsg);
  console.log(inputMsg);
};

function Inputs(props) {
  return (
    <div>
      <form
        className="top_input"
        onSubmit={event => {
          event.preventDefault();
          // console.log(props.isLogin);
          if (props.isLogin === 'false') {
            ErrMsg(`로그인 후 이용하세요!`);
            return;
          } else {
            const title = event.target.inputTitle.value;
            const body = event.target.inputBody.value;
            const date = event.target.inputDate.value;
            if (title !== '' && body !== '' && date !== '') {
              // console.log(`${title}, ${body}, ${date}`);
              event.target.inputTitle.value = '';
              event.target.inputBody.value = '';
              event.target.inputDate.value = '';
              props.onCreate(title, body, date);
            } else {
              ErrMsg(`모든 항목을 입력하세요!`);
              // alert('모든 항목을 입력하세요!');
              // console.log(`미입력 항목 존재!`);
              return;
            }
          }
        }}>
        <input id="inputTitle" type="text" placeholder="제목" />
        <input id="inputBody" type="text" placeholder="추가 내용" />
        <input id="inputDate" type="date" />
        {/* <input id="inputDate" type="date" value={'2023-06-23'} /> */}
        <input id="inputSubmit" type="submit" value="추가!" />
      </form>
    </div>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.ddays.length; i++) {
    let t = props.ddays[i];
    lis.push(
      <div key={t.id} className="">
        <hr className="headHR" />
        <div key={t.id} className="container-dday">
          <button
            className="item-dday delbtn"
            onClick={event => {
              props.deleteItems(t.id);
            }}>
            삭제
          </button>
          {/* <span> </span> */}
          <span className="item-dday">D-{t.date_finish}</span>
          <span className="item-dday">{t.date_current}</span>
          <span className="item-dday">{t.title}</span>
          <span className="item-dday">{t.body}</span>
        </div>
        <hr className="headHR" />
      </div>,
    );
  }
  return <div>{lis}</div>;
}

export default function Dday(props) {
  const [mode, setMode] = useState('none');
  const [id, setId] = useState(null);
  let [nextId, setNextId] = useState('0');
  // let [nextId, setNextId] = useState(
  //   localStorage.getItem('localDday')
  //     ? JSON.parse(localStorage.getItem('localDday')).length
  //     : 0,
  // );
  // console.log(`from LocalStorage>>${nextId}`);
  // const [ddays, setDdays] = useState([]);
  const [ddays, setDdays] = useState([
    {
      id: 0,
      date_current: 'Date sample',
      date_finish: 'Sample"',
      title: 'Sample Title',
      body: 'Sample Body',
    },
  ]);

  const ErrMsg = msg => {
    // const msg = `로그인 후에 이용하세요!`;
    alert(msg);
    console.log(msg);
    setMode('none');
  };

  useEffect(() => {
    if (props.isLogin !== false && localStorage.getItem('localDday')) {
      const storedList = JSON.parse(localStorage.getItem('localDday'));
      setDdays(storedList);
      setNextId(storedList.length);
      // setMode('none');
    }
  }, []);

  // if (mode === 'none') {
  //   // console.log(`mode: ${mode}`);
  // } else if (mode === 'read') {
  //   // console.log(`mode: ${mode}`);
  //   contextControl = (
  //     <>
  //       <button
  //         href={'/update/' + id}
  //         onClick={event => {
  //           event.preventDefault();
  //           if (props.isLogin === 'false') {
  //             ErrMsg(`로그인 후 이용하세요!`);
  //             return;
  //           } else {
  //           }
  //         }}>
  //         Update
  //       </button>
  //       <button
  //         onClick={() => {
  //           if (props.isLogin === 'false') {
  //             ErrMsg(`로그인 후 이용하세요!`);
  //             return;
  //           } else {
  //             const newDdays = [];
  //             for (let i = 0; i < ddays.length; i++) {
  //               if (ddays[i].id !== id) {
  //                 newDdays.push(ddays[i]);
  //               }
  //             }
  //             setDdays(newDdays);
  //             localStorage.setItem('localDday', JSON.stringify(newDdays));
  //             setMode('none');
  //           }
  //         }}>
  //         Delete
  //       </button>
  //     </>
  //   );
  // }

  const headerItem = {
    btn: 'control',
    dday: 'D-Day',
    date: 'Date',
    title: 'Title',
    comment: 'Comment',
  };

  return (
    <div className="hover">
      <h2>Dday Area</h2>
      <p>
        Today is "
        <Clock className="big" format="YYYY-MM-DD" ticking={false}></Clock>"
      </p>
      <Inputs
        isLogin={props.isLogin}
        onCreate={(inputTitle, inputBody, inputDate) => {
          if (props.isLogin === 'false') {
            ErrMsg(`로그인 후 이용하세요`);
            return;
          }
          if (mode === 'update') {
            return;
          }
          const date1 = new Date();
          const date2 = new Date(inputDate);
          const DateDiff = date1.getTime() - date2.getTime();

          let temp = Math.floor(DateDiff / (1000 * 60 * 60 * 24));
          if (temp < 0) temp = `${Math.abs(temp)}`;
          else if (temp > 0) temp = `-${temp}`;
          else if (temp === 0) temp = `Day`;
          else {
            const msg = `D-Day Convertion ERR`;
            alert(msg);
            console.log(msg);
            return;
          }

          const conDDay = JSON.stringify(temp);
          const newDday = {
            id: nextId,
            title: inputTitle,
            body: inputBody,
            date_current: inputDate,
            date_finish: conDDay.replace('"', ''),
          };
          const newDdays = [...ddays];
          newDdays.push(newDday);
          setDdays(newDdays);
          // console.log(ddays);
          setId(nextId);
          setNextId(nextId + 1);
          localStorage.setItem('localDday', JSON.stringify(newDdays));
          // localStorage.setItem('len', nextId);
          // }
        }}></Inputs>
      {/* {contextControl} */}
      {props.isLogin === 'false' ? (
        <div className="err-msg">로그인 후 이용하세요!</div>
      ) : (
        <>
          <div>
            <hr className="headHR" />
            <hr className="specialHR" />
            {/* <hr className="headHR" /> */}
            <div className="container-dday">
              <span className="item-dday">{headerItem.btn}</span>
              <span className="item-dday">{headerItem.dday}</span>
              <span className="item-dday">{headerItem.date}</span>
              <span className="item-dday">{headerItem.title}</span>
              <span className="item-dday">{headerItem.comment}</span>
            </div>
            <hr className="headHR" />
            <hr className="specialHR" />
          </div>
          <Nav
            id={id}
            ddays={ddays}
            deleteItems={inputId => {
              const newDdays = [];
              for (let i = 0; i < ddays.length; i++) {
                if (ddays[i].id !== inputId) {
                  newDdays.push(ddays[i]);
                }
              }
              setDdays(newDdays);
              localStorage.setItem('localDday', JSON.stringify(newDdays));
              setMode('none');
              // // on Delete
              // setDdays(arrInput);
              // localStorage.setItem('localDday', JSON.stringify(arrInput));
              // setMode('none');
              // // console.log('moved!');
            }}></Nav>
        </>
      )}
      {/* <Nav
        ddays={ddays}
        onChangeMode={_id => {
          setMode('read');
          setId(_id);
        }}></Nav> */}
      {/* <div className="body_list">
        <ul>{content}</ul>
      </div> */}
    </div>
  );
}
