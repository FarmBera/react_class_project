import '../css/dday.css';

import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';

export default function Dday(props) {
  const [dday, setDday] = useState('');
  const [ddays, setDdays] = useState([
    {
      id: 0,
      date_current: '2021-05-06',
      date_finish: 'Day"',
      title: 'title1',
      body: 'body1',
    },
  ]);

  // const [mode, setMode] = useState('none');
  // const [id, setId] = useState(null);
  // let [nextId, setNextId] = useState(1);
  // const [topics, setTopics] = useState([
  //   {
  //     id: 0,
  //     date_current: '2021-05-06',
  //     date_finish: 'Day"',
  //     title: 'title1',
  //     body: 'body1',
  //   },
  // ]);

  ///////////////////////////

  useEffect(() => {
    if (localStorage.getItem('localDDays')) {
      const storedList = JSON.parse(localStorage.getItem('localDDays'));
      setDdays(storedList);
    }
  }, []);

  const addItem = item => {
    if (item) {
      const newItem = {
        id: new Date().getTime().toString(),
        // id: nextId++,
        date_current: item.date_current,
        date_finish: item.date_finish,
        title: item.title,
        body: item.body,
      };
      setDday([...ddays, newItem]);
      localStorage.setItem('localDDays', JSON.stringify([...ddays, newItem]));
      setDday('');
    }
  };

  const DeleteContent = dday => {
    const deleted = ddays.filter(t => t.id !== dday.id);
    setDdays(deleted);
    localStorage.setItem('localDDays', JSON.stringify(deleted));
  };

  const clearContent = () => {
    setDdays([]);
    localStorage.removeItem('localDDays');
  };

  /////////////////////////////
  /////////////////////////////
  /////////////////////////////

  return (
    <div>
      <h2>Dday Area</h2>
      <p>
        Today is "<Clock format="YYYY-MM-DD " ticking="true"></Clock>"
      </p>
      <div>
        <form
          className="top_input"
          onChange={event => {
            console.log(event.target.value);
            //   console.log(event.target.value);
            //   const object = {
            //     title: event.target.inputTitle.value,
            //     body: event.target.inputBody.value,
            //     date_current: event.target.inputDate.value,
            //   };
            //   setDday(object);
            //   console.log(object);
          }}
          onSubmit={event => {
            event.preventDefault();
            const title = event.target.inputTitle.value;
            const body = event.target.inputBody.value;
            const date = event.target.inputDate.value;
            if (title !== '' && body !== '' && date !== '') {
              const date1 = new Date(); // 날짜 변환
              const date2 = new Date(date);
              const DateDiff = date1.getTime() - date2.getTime(); // 날짜 계싼

              let temp = Math.floor(DateDiff / (1000 * 60 * 60 * 24)); // 날짜 계산
              if (temp < 0) temp = `${Math.abs(temp)}`;
              else if (temp > 0) temp = `-${temp}`;
              else if (temp === 0) temp = `Day`;
              const conDDay = JSON.stringify(temp); // 날짜 문자열로 변환
              const newItem = {
                title: title,
                body: body,
                date_current: date,
                date_finish: conDDay.replace('"', ''),
              };
              addItem(newItem);
            } else {
              // alert('모든 항목을 입력하세요!');
              console.log(`미입력 항목 존재!`);
              return;
            }
          }}>
          {/* for Test Input*/}
          {/* <input id="inputTitle" type="text" placeholder="제목" value="This is Title" />
          <input id="inputBody" type="text" placeholder="추가 내용" value="This is Body comments" />
          <input id="inputDate" type="date" value="2023-06-23" />
          <input id="inputSubmit" type="submit" value="추가!" /> */}

          {/* Real Input Test */}
          <input id="inputTitle" type="text" placeholder="제목" />
          <input id="inputBody" type="text" placeholder="추가 내용" />
          <input id="inputDate" type="date" />
          <input id="inputSubmit" type="submit" value="추가!" />
        </form>
        <button onClick={() => clearContent()}>CLEAR</button>
      </div>
      {ddays.map(item => (
        <React.Fragment key={item.id}>
          <li key={item.id}>
            <hr />
            <button onClick={event => {}}>수정</button>
            <button
              onClick={event => {
                DeleteContent(dday);
              }}>
              삭제
            </button>
            <span>D-{item.date_finish}</span>
            &nbsp;
            <span>{item.date_current}</span>
            &nbsp;
            <span>{item.title}</span> &nbsp;
            <span>{item.body}</span>
            <hr />
          </li>
        </React.Fragment>
      ))}
    </div>
  );
}
