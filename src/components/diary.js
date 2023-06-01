import '../css/diary.css';
import { useState } from 'react';

function DiaryBox(props) {
  return (
    <div className="diary-box">
      <div className="diary-date" id="bold-text">
        {props.diaryDate}
      </div>
      <div className="diary-title">{props.diaryTitle}</div>
      <div className="diary-text" id="basic-text">
        {props.diaryBody}
      </div>
    </div>
  );
}

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
          props.onCreates(AGER_VAR);
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

  let diary_date = Date();
  let diary_title = 'Title';
  let diary_body = 'Article';
  return (
    <div>
      <h2>Diary Area</h2>
      <InputDiary
        onCreates={AGER_VAR => {
          console.log(AGER_VAR);
        }}
      />
      {/* diary */}
      <div className="main-content">
        <div className="diary">
          <DiaryBox
            diaryDate={diary_date}
            diaryTitle={diary_title}
            diaryBody={diary_body}></DiaryBox>
          <DiaryBox
            diaryDate={diary_date}
            diaryTitle={diary_title}
            diaryBody={diary_body}></DiaryBox>
          <DiaryBox
            diaryDate={diary_date}
            diaryTitle={diary_title}
            diaryBody={diary_body}></DiaryBox>
        </div>
      </div>
    </div>
  );
}

export default Diary;
