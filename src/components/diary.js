import '../css/diary.css';

import { useState } from 'react';
import { useEffect } from 'react';

const ErrMsg = () => {
  const msg = `로그인 후에 이용하세요!`;
  alert(msg);
  console.log(msg);
};

function DiaryInput(props) {
  return (
    <div className="diary-input">
      <h2>글 쓰기</h2>
      <form
        className="input-container"
        onSubmit={event => {
          event.preventDefault();
          if (props.isLogin === 'false') {
            ErrMsg();
            return;
          }
          const title = event.target.title.value;
          const date = event.target.date.value;
          const body = event.target.body.value;
          // console.log(title, date, body);
          if (title === '' || body === '' || date === '') {
            alert('모든 항목을 입력해주세요!');
            return;
          }
          event.target.title.value = '';
          event.target.date.value = '';
          event.target.body.value = '';
          // const convDate = JSON.stringify(event.target.date.value);
          const newArticle = {
            id: props.nextId,
            title: title,
            date: date,
            body: body,
          };
          props.goSubmit(newArticle);
        }}>
        <input id="title" dtype="text" placeholder="Title" />
        <input id="date" type="date" value="2023-06-23" />
        <br />
        <textarea id="body" placeholder="Body area"></textarea>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

function DiaryBox(props) {
  const lis = [];
  for (let i = 0; i < props.article.length; i++) {
    let t = props.article[i];
    // console.log(t);
    lis.push(
      <div key={t.id}>
        <hr />
        <div className="diary-input-title">{t.title}</div>
        <div className="diary-input-date">{t.date}</div>
        <div className="diary-input-control">
          <button
            className="diary-input-button"
            onClick={currId => {
              // props.setUpdate()
              props.onUpdate(t.id);
            }}>
            수정
          </button>
          <button
            className="diary-input-button"
            onClick={() => {
              props.onDelete(t.id);
            }}>
            삭제
          </button>
        </div>
        <div className="diary-input-text">{t.body}</div>
        <hr />
      </div>,
    );
  }
  return (
    <div className="diary-box">{lis}</div>
    // <div className="diary-box">
    //   <div className="diary-date" id="bold-text">
    //     {props.diary_date}
    //   </div>
    //   <div className="diary-title">{props.diary_title}</div>
    //   <div className="diary-text" id="basic-text">
    //     {props.diary_body}
    //   </div>
    // </div>
  );
}

export default function Diary(props) {
  const [id, setId] = useState(null);
  let [nextId, setNextId] = useState(1);
  const [article, setArticle] = useState([
    {
      id: 0,
      title: 'title1',
      date: '2021-05-06',
      body: 'body1',
    },
  ]);
  const [mode, setMode] = useState('none');
  // const [diary_date, setDiary_date] = useState('2023-06-01');
  // const [diary_title, setDiary_title] = useState(null);
  // const [diary_body, setDiary_body] = useState(null);

  let editContent = null;

  useEffect(() => {
    if (props.isLogin !== false && localStorage.getItem('localDiary')) {
      const storedList = JSON.parse(localStorage.getItem('localDiary'));
      setArticle(storedList);
      setNextId(storedList.length);
      // setMode('none');
    }
  }, []);

  // Update
  if (mode === 'update') {
    // DiaryInput.target.title.value = id;
    for (let i = 0; i < article.length; i++) {
      if (article[i].id === id) {
        console.log(article[i]);
        // newArticle.push(article[i]);
        
      }
    }
    console.log(`mode: ${mode}`);
    return (
      <DiaryInput
        article={article}
        id={id}
        onLoad={() => {
          console.log(`test`);
          const newArticle = [];
          for (let i = 0; i < article.length; i++) {
            if (article[i].id === id) {
              // newArticle.push(article[i]);
            }
          }
        }}></DiaryInput>
    );
  } else {
    return (
      <div>
        {/* <h2>나의 다이어리</h2> */}
        <div>
          <DiaryInput
            article={article}
            nextId={nextId}
            setArticle={prop => {
              setArticle(prop);
            }}
            setNextId={prop => {
              setNextId(prop);
            }}
            goSubmit={input => {
              const newTopic = {
                id: nextId,
                title: input.title,
                date: input.date,
                body: input.body,
              };
              const newArticles = [...article];
              newArticles.push(newTopic);
              setArticle(newArticles);
              setId(nextId);
              setNextId(nextId + 1);
              localStorage.setItem('localDiary', JSON.stringify(newArticles));
            }}></DiaryInput>
        </div>
        <div className="diary-body">
          <DiaryBox
            article={article}
            onDelete={currId => {
              const newArticle = [];
              for (let i = 0; i < article.length; i++) {
                if (article[i].id !== currId) {
                  newArticle.push(article[i]);
                }
              }
              setArticle(newArticle);
              localStorage.setItem('localDiary', JSON.stringify(newArticle));
            }}
            onUpdate={currId => {
              setMode('update');
              setId(currId);
            }}></DiaryBox>
        </div>
      </div>
    );
  }
}
