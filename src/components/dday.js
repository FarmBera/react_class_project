import '../css/dday.css';

import { useState, useEffect } from 'react';

import Clock from 'react-live-clock';

/** 오류 메시지 띄우기 */
const ErrMsg = Msg => {
  alert(Msg);
  console.log(Msg);
};

/** 입력 전용 컴포넌트 */
function Inputs(props) {
  return (
    <div>
      <form className="top_input"
        onSubmit={event => {
          event.preventDefault();
          // console.log(props.isLogin);
          if (props.isLogin === 'false') { ErrMsg(`로그인 후 이용하세요!`); return; } 
          else {
            // 입력값 저장
            const title = event.target.inputTitle.value;
            const body = event.target.inputBody.value;
            const date = event.target.inputDate.value;
            // 유효성 검사 시작
            if (title !== '' && body !== '' && date !== '') {
              // console.log(`${title}, ${body}, ${date}`);
              event.target.inputTitle.value = '';
              event.target.inputBody.value = '';
              event.target.inputDate.value = '';
              props.onCreate(title, body, date);
            }
            else {
              ErrMsg(`모든 항목을 입력하세요!`);
              return;
            }
          }
        }}>
        <input id="inputTitle" type="text" placeholder="제목" />
        <input id="inputBody" type="text" placeholder="추가 내용" />
        <input id="inputDate" type="date" />
        <input id="inputSubmit" type="submit" value="추가" />
      </form>
    </div>
  );
}

/** 수정 전용 컴포넌트 */
function EditDday(props) {
  /** 수정중인 제목 저장 */
  const [title, setTitle] = useState(props.title);
  /** 수정 중인 닐짜 저장 */
  const [date, setDate] = useState(props.date);
  /** 수정 중인 내용 저장 */
  const [body, setBody] = useState(props.body);
  // console.log(props.title);
  // console.log(props.date);
  // console.log(props.body);
  return (
    <div>
      {/* <h2>D-Day 수정하기</h2> */}
      <form className="top_input"
        // 전송버튼 눌렀을 때
        onSubmit={event => {
          event.preventDefault();
          const title = event.target.inputTitle.value;
          const date = event.target.inputDate.value;
          const body = event.target.inputBody.value;
          // console.log(title, date, body);
          props.onEdit(title, date, body);
        }}>
        <input id="inputTitle" type="text" placeholder="수정 할 제목" value={title} 
        onChange={event => {
            setTitle(event.target.value);
          }}
        />
        <input id="inputBody" type="text" placeholder="수정 할 추가 내용" value={body} 
        onChange={event => {
            setBody(event.target.value);
          }}
        />
        <input id="inputDate" type="date" value={date} 
        onChange={event => {
            setDate(event.target.value);
          }}
        />
        <input id="inputSubmit" className="dday-submit" type="submit"
          value="수정" />
      </form>
    </div>
  );
}

/** D-Day 출력하는 컴포넌트 */
function Nav(props) {
  /** 저장된 D-Day 값들을 배열에 저장 & 출력 */
  const ddayList = [];
  for (let i = 0; i < props.ddays.length; i++) {
    let t = props.ddays[i];
    ddayList.push(
      <div key={t.id} className="">
        <hr className="headHR" />
        <div key={t.id} className="container-dday">
          <div className="item-dday delbtn-container">
            <button className="delbtn"
              onClick={() => {
                props.editItem(t.id); // 수정 모드 진입
              }}>수정</button>
            <button className="delbtn"
              onClick={() => {
                props.deleteItems(t.id); // 삭제 수행
              }}>삭제</button>
          </div>
          <span className="item-dday">D-{t.date_finish}</span>
          <span className="item-dday">{t.date_current}</span>
          <span className="item-dday">{t.title}</span>
          <span className="item-dday">{t.body}</span>
        </div>
        <hr className="headHR" />
      </div>,
    );
  }
  return <div>{ddayList}</div>;
}

export default function Dday(props) {
  /** 삽입/수정 모드 여부 */
  const [mode, setMode] = useState('none');
  /** 삽입/수정할 때 고유 id값 */
  const [id, setId] = useState(null);
  /** 다음에 삽입할 때 고유 id값 */
  let [nextId, setNextId] = useState('0');
  /** 내용이 저장된 항목 */
  const [ddays, setDdays] = useState([
    // { id: 0, date_current: 'Date sample', date_finish: 'Sample"', title: 'Sample Title', body: 'Sample Body', },
  ]);

  // 첫 실행 시, localStorage에서 저장된 값 불러오기
  useEffect(() => {
    if (props.isLogin !== false && localStorage.getItem('localDday')) {
      const storedList = JSON.parse(localStorage.getItem('localDday'));
      setDdays(storedList);
      setNextId(storedList.length);
      setMode('none');
      // console.log(`storedList: ${storedList}`);
    }
  }, []);

  // 오류 메시지 띄우기
  const ErrMsg = msg => {
    alert(msg);
    console.log(msg);
    setMode('none');
  };

  /** D-Day 계산하는 함수 * (해당 날짜부터 몇일 남았는지 계산) */
  const calculateDDAY = inputDate => {
    const date1 = new Date(); // 오늘 날짜
    const date2 = new Date(inputDate); // 입력한 날짜
    const DateDiff = date1.getTime() - date2.getTime(); // 차이점 계산
    let temp = Math.floor(DateDiff / (1000 * 60 * 60 * 24)); // 시간 계산
    // 계산 결과 음수로 나와서 양수로 변환, 및 당일 날짜이면 'Day' 로 출력
    if (temp < 0) temp = `${Math.abs(temp)}`;
    else if (temp > 0) temp = `-${temp}`;
    else if (temp === 0) temp = `Day`; // 당일이면 'D-Day' 처럼 표시
    else { ErrMsg(`D-Day Convertion ERR`); return; }
    return JSON.stringify(temp).replace('"', '');
  };

  /** Header 표시될 제목이름이 저장되어 있는 객체 */
  const headerItem = {
    btn: '관리',
    dday: 'D-Day',
    date: '날짜',
    title: '제목',
    comment: '추가 내용',
  };

  /** 컨텐츠 수정 컨트롤 부분 */
  let editContent = null;
  /** h2 요소(최상단 제목)에 보여질 메시지 */
  let titleMsg = '나의 D-Day';

  // 기본 모드 (삽입 모드)
  if (mode === 'none') {
    // console.log('mode: none');
    titleMsg = '나의 D-Day';
    editContent = (
      <Inputs isLogin={props.isLogin}
        onCreate={(inputTitle, inputBody, inputDate) => {
          if (props.isLogin === 'false') { // 로그인 안했다면
            ErrMsg(`로그인 후 이용하세요`);
            return;
          }
          if (mode === 'update') return;
          /** 입력한 날짜를 D-Day로 변환 */
          const conDDay = calculateDDAY(inputDate);
          const newDday = { // 저장 할 객체 생성
            id: nextId,
            title: inputTitle,
            body: inputBody,
            date_current: inputDate,
            date_finish: conDDay.replace('"', ''),
          };
          // 배열 복사 및 신규 항목 추가
          const newDdays = [...ddays, newDday];
          // newDdays.push(newDday);
          setDdays(newDdays);
          // console.log(ddays);
          setId(nextId);
          setNextId(nextId + 1);
          // localStorage에 항목 저장
          localStorage.setItem('localDday', JSON.stringify(newDdays));
        }}></Inputs>
    );
  }
  // 수정할 때 (항목 편집할 때)
  else if (mode === 'edit') {
    let title, body, date = null;
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
      <EditDday title={title} date={date} body={body}
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
      <p>Today is "<Clock className="big" format="YYYY-MM-DD" ticking={false}></Clock>"</p>
      {editContent}
      {props.isLogin === 'false' ? (
        <div className="err-msg">로그인 후 이용하세요!</div>
      ) : (
        <>
          {ddays.length <= 0 ? (
            <div className="info">예정된 일정이 없습니다!</div>
          ) : (
            <div>
              <hr className="specialHR" />
              <div className="container-dday">
                <span className="item-dday">{headerItem.btn}</span>
                <span className="item-dday">{headerItem.dday}</span>
                <span className="item-dday">{headerItem.date}</span>
                <span className="item-dday">{headerItem.title}</span>
                <span className="item-dday">{headerItem.comment}</span>
              </div>
              <hr className="specialHR" />
            </div>
          )}
          <div className='dday-container-body'>
            <Nav id={id} ddays={ddays}
              deleteItems={inputId => {
                // console.log(`on Delete Method!`);
                const newDdays = [];
                for (let i = 0; i < ddays.length; i++)
                  if (ddays[i].id !== inputId) newDdays.push(ddays[i]);
                setDdays(newDdays);
                localStorage.setItem('localDday', JSON.stringify(newDdays));
                setMode('none');
              }}
              editItem={inputId => {
                // console.log(`Edit Method!`);
                setId(inputId);
                setMode('edit');
              }}></Nav>
          </div>
        </>
      )}
    </div>
  );
}
