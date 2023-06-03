import '../css/diary.css';
import { useState, useRef } from 'react';

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
  // const [diary_date, setDiary_date] = useState('2023-06-01');
  // const [diary_title, setDiary_title] = useState(null);
  // const [diary_body, setDiary_body] = useState(null);

  return (
    <div>
      <h2>Today's Note</h2>
      <div className="diary-input">
        <h2>Write Article</h2>
        <form
          onSubmit={event => {
            event.preventDefault();
            const convDate = JSON.stringify(event.target.date.value);
            const newArticle = {
              id: nextId,
              title: event.target.title.value,
              date: convDate,
              body: event.target.body.value,
            };
            const newArticles = [...article];
            newArticles.push(newArticle);
            setArticle(newArticles);
            setId(nextId);
            setNextId(nextId + 1);
          }}>
          <input id="title" dtype="text" placeholder="Title" />
          <input id="date" type="date" />
          <br />
          <textarea id="body" placeholder="Body area"></textarea>
          <br />
          <input type="submit" />
        </form>
      </div>
      <div className="diary-body">
        <DiaryBox
          article={article}
          onClickInfo={() => {
            console.log('asdfasdfa');
          }}
          onChangeMode={_id => {
            // setMode('read');
            setId(_id);
          }}></DiaryBox>
      </div>
    </div>
  );
}
