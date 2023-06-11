# # Before Execution...

`npm install`

# Personal Diary WebSite

Final Exam React Project

>  코드 안에 comment있으니, 참고부탁드립니다. 

## 사용된 modules

- react
  - useState
  - useEffect
- react-router-dom
  - BrowserRouter, Routes, Route
  - useNavigate
- react-live-clock
- styled-components

## 기능 구현

1. 회원가입, 로그인/로그아웃 기능 구현

- 로그인/회원가입 페이지가 있음
- 회원가입 페이지에서: 회원가입 완료 시, localStorage에 아이디 및 비번 저장
- 로그인 페이지에서: 회원가입 할 때 사용했던 아이디/비번 입력하면 로그인

2. 미로그인 시, 로그인 했을 시의 기능 차이

- 로그인 안한 상태 (게스트) 상태라면 첫 화면 최상단에 `Hello Guest` 라고 뜸
- 다이어리, 투두, 디데이 탭에 들어가면 `로그인 후 이용하세요!` 라는 문구가 뜨며 기능 사용 불가
  - 로그인 하면 정상 사용 가능

## 화면 구성

- React-Router-Dom의 BrowserRotuer를 이용,
  웹사이트의 주소가 바뀌면 해당 페이지로 이동하게 구성함
- 각 페이지별로 페이지가 처음 로드되었을 때, **useEffect**를 이용,
  localStorage에서 해당하는 키 값으로 저장된 값을 불러와, 컴포넌트가 렌더링 할 수 있도록 구현
- 

### 메인 화면

> localhost:3000/

- 저장된 *Diary*, *ToDo*, *D-Day* 항목이 보임
- 항목이 없다면 빈 공간

### 다이어리 화면

> localhost:3000/diary

- 상단에는 글을 쓸 수 있는 부분이 있음
- 하단에는 사용자가 쓴 글이 쭉 나열됨
- 아무것도 입력 안하고 `글쓰기` 누르면 글이 작성되지 않음
  - 모든 항목 입력하고 `글쓰기` 버튼 누르면 정상 등록
- 수정 버튼을 누르면 상단의 *글쓰기* 영역이 *글 수정하기* 로 바뀌고, 기존에 등록되어있던 글이 불러와짐.
  => 글을 수정하고, 하단의 `수정하기` 버튼을 누르면 수정사항이 반영됨

### ToDo List 화면

> localhost:3000/todo

> localhost:3000/dday

### About 페이지

> localhost:3000/about

### Login 페이지

> localhost:3000/

### Register 페이지

> localhost:3000/register
