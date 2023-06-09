import '../css/diary.css';

import { useState, useEffect } from 'react';

// const Msg = `로그인 후에 이용하세요!`;

const ErrMsg = inputMsg => {
  // const msg = `${input}`;
  alert(inputMsg);
  console.log(inputMsg);
};

function DiaryInput(props) {
  return (
    <div className="diary-input">
      <h2>글쓰기</h2>
      <form
        className="input-container"
        onSubmit={event => {
          event.preventDefault();
          // console.log(`Login State: ${props.isLogin}`);
          if (props.isLogin === 'false') {
            ErrMsg('로그인 후 이용하세요');
            return;
          } else {
            const title = event.target.title.value;
            const date = event.target.date.value;
            const body = event.target.body.value;
            // console.log(title, date, body);
            if (title === '' || body === '' || date === '') {
              ErrMsg(`모든 항목을 입력해주세요!`);
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
          }
        }}>
        <p>
          <input id="title" dtype="text" placeholder="제목을 입력하세요" />
          <input id="date" type="date" />
        </p>
        <p>
          <textarea id="body" placeholder="내용을 입력하세요"></textarea>
        </p>
        <p>
          <input id="submit" type="submit" value="글쓰기" />
        </p>
      </form>
    </div>
  );
}

function DiaryUpdate(props) {
  const [title, setTitle] = useState(props.title);
  const [date, setDate] = useState(props.date);
  const [body, setBody] = useState(props.body);
  return (
    <div className="diary-input">
      <h2>글 수정하기</h2>
      <div className="diary-input-container">
        <form
          onSubmit={event => {
            event.preventDefault();
            const title = event.target.title.value;
            const date = event.target.date.value;
            const body = event.target.body.value;
            props.onUpdate(title, date, body);
          }}>
          <p>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="수정할 제목을 입력하세요"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
              }}
            />
            <input
              id="date"
              type="date"
              name="date"
              placeholder="수정할 날짜를 입력하세요"
              value={date}
              onChange={event => {
                setDate(event.target.value);
              }}
            />
          </p>
          <p>
            <textarea
              id="body"
              name="body"
              placeholder="수정할 내용을 입력하세요"
              value={body}
              onChange={event => {
                setBody(event.target.value);
              }}></textarea>
          </p>
          <p>
            <input id="submit" type="submit" value="수정하기"></input>
          </p>
        </form>
      </div>
    </div>
  );
}

function DiaryBox(props) {
  const output = [];
  for (let i = 0; i < props.article.length; i++) {
    let t = props.article[i];
    // console.log(t);
    output.push(
      <div className="diary-box" key={t.id}>
        <hr />
        <div className="diary-body-title">{t.title}</div>
        <div className="diary-body-date">
          <button
            id="btn"
            className="diary-body-button"
            onClick={currId => {
              props.onUpdate(t.id);
            }}>
            수정
          </button>
          <button
            id="btn"
            className="diary-body-button"
            onClick={() => {
              props.onDelete(t.id);
            }}>
            삭제
          </button>
          {t.date}
        </div>
        <div className="diary-body-text">{t.body}</div>
        <hr />
      </div>,
    );
  }
  return <div className="diary-container">{output}</div>;
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
  // console.log(mode);

  let editContent = null;

  useEffect(() => {
    if (props.isLogin !== false && localStorage.getItem('localDiary')) {
      const storedList = JSON.parse(localStorage.getItem('localDiary'));
      setArticle(storedList);
      setNextId(storedList.length);
      // setMode('none');
    }
  }, []);

  if (mode === 'none') {
    editContent = (
      <DiaryInput
        isLogin={props.isLogin}
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
    );
  }
  // Update
  else if (mode === 'update') {
    let title,
      body,
      date = null;
    for (let i = 0; i < article.length; i++) {
      if (article[i].id === id) {
        // console.log(article[i]);
        // console.log(article[i].id, id);
        title = article[i].title;
        date = article[i].date;
        body = article[i].body;
      }
    }
    editContent = (
      <DiaryUpdate
        title={title}
        date={date}
        body={body}
        onUpdate={(title, date, body) => {
          // console.log(title, body);
          const newArticles = [...article];
          const updatedArticle = {
            id: id,
            title: title,
            date: date,
            body: body,
          };
          for (let i = 0; i < newArticles.length; i++) {
            if (newArticles[i].id === id) {
              newArticles[i] = updatedArticle;
              break;
            }
          }
          setArticle(newArticles);
          localStorage.setItem('localDiary', JSON.stringify(newArticles));
          setMode('none');
        }}></DiaryUpdate>
    );
  }
  return (
    <div>
      {/* <h2>나의 다이어리</h2> */}
      {/* 입력 하는 부분 */}
      <div>{editContent}</div>
      <div className="diary-body">
        {props.isLogin === 'false' ? (
          <span className="err-msg">로그인 후 이용하세요!</span>
        ) : (
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
        )}
      </div>
    </div>
  );
}
