import '../css/diary.css';
import { useState } from 'react';

function InputDiary(props) {
  return (
    <div>
      <h2>Write Article</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const AGER_VAR = {
            title: event.target.title.value,
            date: event.target.date.value,
            body: event.target.body.value,
          };
          props.onCreate(AGER_VAR);
        }}>
        <input id="title" dtype="text" placeholder="Title" />
        <input id="date" type="date" />
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
    lis.push(
      <div>
        <div className="diary-date">{props.diary_date}</div>
        <div className="diary-title">{props.diary_title}</div>
        <div className="diary-text">{props.diary_body}</div>
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

function Diary(props) {
  const [id, setId] = useState(null);
  let [nextId, setNextId] = useState(0);
  const [article, setArticle] = useState([
    {
      id: 0,
      date_current: '2021-05-06',
      date_finish: 'Day"',
      title: 'title1',
      body: 'body1',
    },
  ]);
  // const [diary_date, setDiary_date] = useState('2023-06-01');
  // const [diary_title, setDiary_title] = useState(null);
  // const [diary_body, setDiary_body] = useState(null);

  let diaryObj = {
    diary_date: Date(),
    diary_title: 'Title',
    diary_body: 'Article',
  };
  return (
    <div>
      <h2>Diary Area</h2>
      {/* <InputDiary
        onCreates={AGER_VAR => {
          console.log(AGER_VAR);
        }}
      /> */}
      {/* diary */}
      <div className="main-content">
        <div className="diary">
          <InputDiary
            onCreate={AGER_VAR => {
              console.log(AGER_VAR);
              // const date = new Date(inputDate);
              const convDate = JSON.stringify(AGER_VAR.date);
              console.log(AGER_VAR.title);
              console.log(AGER_VAR.date);
              console.log(AGER_VAR.body);

              // 객체 생성
              const newArticle = {
                id: nextId,
                title: AGER_VAR.title,
                date_current: convDate,
                body: AGER_VAR.body,
              };
              const newArticles = [...article];
              newArticles.push(newArticle);
              setArticle(newArticles);
              setId(nextId);
              setNextId(nextId + 1);
            }}></InputDiary>

          <DiaryBox
            article={article}
            onClickInfo={() => {
              console.log('asdfasdfa');
            }}
            onChangeMode={_id => {
              // setMode('read');
              setId(_id);
            }}></DiaryBox>

          {/* <DiaryBox
            diaryObj={diaryObj}></DiaryBox>
          <DiaryBox
            diaryObj={diaryObj}></DiaryBox>
          <DiaryBox
            diaryObj={diaryObj}></DiaryBox> */}
        </div>
      </div>
    </div>
  );
}

export default Diary;
