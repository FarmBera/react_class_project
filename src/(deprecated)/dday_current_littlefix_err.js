import '../css/main.css';

import { useState } from 'react';
import { useEffect } from 'react';
// import { useMemo } from "react";
// import { useCallback } from "react";
// import { Component } from 'react';
// import { Component, useState, useEffect, useMemo, useCallback } from "react";

import Clock from 'react-live-clock';

const saveLocalStorage = props => {
  localStorage.setItem('localDday', JSON.stringify(props));
};

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.dayitem.length; i++) {
    let t = props.dayitem[i];
    lis.push(
      <li key={t.id}>
        <hr />
        <span>
          <a
            id={t.id}
            href={'/read/' + t.id}
            onClick={event => {
              event.preventDefault();
              props.onChangeMode(Number(event.target.id));
            }}>
            D-{t.date_finish}
          </a>
        </span>
        &nbsp;
        <span>{t.date_current}</span>
        &nbsp;
        <span>{t.title}</span> &nbsp;
        <span>{t.body}</span>
        <hr />
      </li>,
    );
  }
  return (
    <nav>
      <ul>{lis}</ul>
    </nav>
  );
}

export default function Dday(props) {
  const [mode, setMode] = useState('none');
  const [id, setId] = useState(null);
  let [nextId, setNextId] = useState(0);
  const [dayitem, setDayItem] = useState([
    // {
    //   id: 0,
    //   date_current: '2021-05-06',
    //   date_finish: 'Day"',
    //   title: 'title1',
    //   body: 'body1',
    // },
  ]);

  let contextControl = null;
  /////////////////////////////
  /////////////////////////////
  // useEffect(() => {
  //   const atLocalStorage = JSON.parse(localStorage.getItem('localDday'));
  //   // console.log(atLocalStorage);
  //   if (atLocalStorage) {
  //     setDayItem(atLocalStorage);
  //     console.log(dayitem);
  //     console.log(`StoredId: ${atLocalStorage.length}`);
  //     setNextId(atLocalStorage.length);
  //   }
  //   // if (atLocalStorage)
  // }, []);

  if (mode === "load") {
    const atLocalStorage = JSON.parse(localStorage.getItem('localDday'));
    // console.log(atLocalStorage);
    if (atLocalStorage) {
      setDayItem(atLocalStorage);
      console.log(dayitem);
      console.log(`StoredId: ${atLocalStorage.length}`);
      setNextId(atLocalStorage.length);
    }
    setMode("none");
  }
  else if (mode === 'none') {
    // console.log(`mode: ${mode}`);
  } else if (mode === 'read') {
    contextControl = (
      <>
        <button
          href={'/update/' + id}
          onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
          }}>
          Update
        </button>
        <button
          onClick={() => {
            const newDitems = [];
            for (let i = 0; i < dayitem.length; i++) {
              if (dayitem[i].id !== id) {
                newDitems.push(dayitem[i]);
              }
            }
            setDayItem(newDitems);
            localStorage.setItem('localDday', JSON.stringify(newDitems));
            setMode('none');
          }}>
          Delete
        </button>
      </>
    );
  }

  return (
    <div>
      <h2>Dday Area</h2>
      <p>
        Today is "<Clock format="YYYY-MM-DD " ticking="true"></Clock>"
      </p>
      <form
        className="top_input"
        onSubmit={event => {
          event.preventDefault();
          let inputTitle = event.target.inputTitle.value;
          let inputBody = event.target.inputBody.value;
          let inputDate = event.target.inputDate.value;
          if (inputTitle !== '' && inputBody !== '' && inputDate !== '') {
            const date1 = new Date();
            const date2 = new Date(inputDate);
            let temp = Math.floor(
              (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24),
            );
            if (temp < 0) temp = `${Math.abs(temp)}`;
            else if (temp > 0) temp = `-${temp}`;
            else if (temp === 0) temp = `Day`;
            const conDDay = JSON.stringify(temp);
            const newDitem = {
              id: nextId,
              title: inputTitle,
              body: inputBody,
              date_current: inputDate,
              date_finish: conDDay.replace('"', ''),
            };
            const newDitems = [...dayitem];
            newDitems.push(newDitem);
            setDayItem(newDitems);
            setId(nextId);
            setNextId(nextId + 1);

            localStorage.setItem('localDday', JSON.stringify(dayitem));
            // console.log(dayitem);
            // inputTitle = '';
            // inputBody = '';
            // inputDate = '';
            console.log("asdf")
          } else {
            alert('모든 항목을 입력하세요!');
            console.log(`미입력 항목 존재!`);
            return;
          }
        }}>
        <input id="inputTitle" type="text" placeholder="제목" />
        <input id="inputBody" type="text" placeholder="추가 내용" />
        <input id="inputDate" type="date" />
        <input id="inputSubmit" type="submit" value="추가!" />
      </form>
      {contextControl}
      <Nav
        dayitem={dayitem}
        onClickInfo={() => {
          console.log('asdfasdfa');
        }}
        onChangeMode={_id => {
          setMode('read');
          setId(_id);
        }}></Nav>
    </div>
  );
}
