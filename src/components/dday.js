import '../css/dday.css';

import { useState } from 'react';
import { useEffect } from 'react';
import Clock from 'react-live-clock';

// 오류 메시지 띄우기
const ErrMsg = Msg => {
  // const msg = `로그인 후에 이용하세요!`
  alert(Msg);
  console.log(Msg);
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
        {/* Below code is for TEST */}
        {/* <input id="inputDate" type="date" value="2023-06-23" /> */}
        <input id="inputSubmit" type="submit" value="추가" />
      </form>
    </div>
  );
}

function EditDday(props) {
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date);
  const [body, setBody] = useState(props.body);
  // console.log(props.title);
  // console.log(props.date);
  // console.log(props.body);
  return (
    <div className="">
      {/* <h2>D-Day 수정하기</h2> */}
      <form
        className="top_input"
        onSubmit={event => {
          event.preventDefault();
          const title = event.target.inputTitle.value;
          const date = event.target.inputDate.value;
          const body = event.target.inputBody.value;
          // console.log(title, date, body);
          props.onEdit(title, date, body);
        }}>
        <input
          id="inputTitle"
          type="text"
          placeholder="수정 할 제목"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
        <input
          id="inputBody"
          type="text"
          placeholder="수정 할 추가 내용"
          value={body}
          onChange={event => {
            setBody(event.target.value);
          }}
        />
        <input
          id="inputDate"
          type="date"
          value={date}
          onChange={event => {
            setDate(event.target.value);
          }}
        />
        <input
          id="inputSubmit"
          className="dday-submit"
          type="submit"
          value="수정"
        />
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
          <div className="item-dday delbtn-container">
            <button
              className="delbtn"
              onClick={event => {
                props.editItem(t.id);
              }}>
              수정
            </button>
            <button
              className="delbtn"
              onClick={event => {
                props.deleteItems(t.id);
              }}>
              삭제
            </button>
          </div>
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
  const [ddays, setDdays] = useState([
    // {
    //   id: 0,
    //   date_current: 'Date sample',
    //   date_finish: 'Sample"',
    //   title: 'Sample Title',
    //   body: 'Sample Body',
    // },
  ]);
  // let [nextId, setNextId] = useState(
  //   localStorage.getItem('localDday')
  //     ? JSON.parse(localStorage.getItem('localDday')).length
  //     : 0,
  // );
  // console.log(`from LocalStorage>>${nextId}`);
  // const [ddays, setDdays] = useState([]);
  // let [titleMsg, setTitleMsg] = useState('나의 D-Day')

  useEffect(() => {
    if (props.isLogin !== false && localStorage.getItem('localDday')) {
      const storedList = JSON.parse(localStorage.getItem('localDday'));
      setDdays(storedList);
      setNextId(storedList.length);
      setMode('none');
      // console.log(`storedList: ${storedList}`);
    }
  }, []);

  const ErrMsg = msg => {
    // const msg = `로그인 후에 이용하세요!`;
    alert(msg);
    console.log(msg);
    setMode('none');
  };

  const calculateDDAY = inputDate => {
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
    return JSON.stringify(temp).replace('"', '');
  };

  const headerItem = {
    // Header 제목
    btn: '관리',
    dday: 'D-Day',
    date: '날짜',
    title: '제목',
    comment: '추가 내용',
  };

  let editContent = null;
  let titleMsg = '나의 D-Day';

  if (mode === 'none') {
    // console.log('mode: none');
    titleMsg = '나의 D-Day';
    editContent = (
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
          const conDDay = calculateDDAY(inputDate);
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
        }}></Inputs>
    );
  } else if (mode === 'edit') {
    let title,
      body,
      date = null;
    for (let i = 0; i < ddays.length; i++) {
      if (ddays[i].id === id) {
        // console.log(ddays[i]);
        title = ddays[i].title;
        date = ddays[i].date_current;
        body = ddays[i].body;
      }
    }
    // console.log(title, date, body);
    // console.log('mode: edit');
    titleMsg = `D-Day 수정하기`;
    editContent = (
      <EditDday
        title={title}
        date={date}
        body={body}
        onEdit={(inputtitle, inputdate, inputbody) => {
          const newDdays = [...ddays];
          const conDDay = calculateDDAY(inputdate);
          const updatedDdays = {
            id: id,
            title: inputtitle,
            date_current: inputdate,
            date_finish: conDDay.replace('"', ''),
            body: inputbody,
          };
          for (let i = 0; i < newDdays.length; i++) {
            if (newDdays[i].id === id) {
              newDdays[i] = updatedDdays;
              break;
            }
          }
          setDdays(newDdays);
          localStorage.setItem('localDday', JSON.stringify(newDdays));
          setMode('none');
        }}></EditDday>
    );
  }
  // console.log(ddays);
  return (
    <div className="hover">
      <h2>{titleMsg}</h2>
      <p>
        Today is "
        <Clock className="big" format="YYYY-MM-DD" ticking={false}></Clock>"
      </p>
      {editContent}
      {props.isLogin === 'false' ? (
        <div className="err-msg">로그인 후 이용하세요!</div>
      ) : (
        <>
          {ddays.length <= 0 ? (
            <div className="info">예정된 일정이 없습니다!</div>
          ) : (
            <div>
              {/* <hr className="headHR" /> */}
              <hr className="specialHR" />
              {/* <hr className="headHR" /> */}
              <div className="container-dday">
                <span className="item-dday">{headerItem.btn}</span>
                <span className="item-dday">{headerItem.dday}</span>
                <span className="item-dday">{headerItem.date}</span>
                <span className="item-dday">{headerItem.title}</span>
                <span className="item-dday">{headerItem.comment}</span>
              </div>
              {/* <hr className="headHR" /> */}
              <hr className="specialHR" />
            </div>
          )}
          <div className='dday-container-body'>
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
              }}
              editItem={inputId => {
                // console.log('editItem!');
                setId(inputId);
                setMode('edit');
              }}></Nav>
          </div>
        </>
      )}
    </div>
  );
}
