# Personal Diary WebSite

The React Project for Final Exam

> 코드 안에도 comment있으니, 참고부탁드립니다.
> 
> 작동 화면은 Screenshot 폴더에 있습니다.

## X-Diary: 다이어리 웹사이트

- 나의 일상을 기록할 수 있는, 해야 할 일을 기록하고, 특별한 날은 D-Day로 한눈에 확인하세요.

## 사용된 modules

- react
  - useState
  - useEffect
- react-router-dom
  - BrowserRouter, Routes, Route
  - useNavigate
- react-live-clock
- styled-components (일부)

## 기능 구현

### 로그인/로그아웃 기능

1. 회원가입, 로그인/로그아웃 기능 구현 (feat. **localStorage**)

- 로그인 전용, 회원가입 전용 페이지가 있음
- 회원가입 페이지에서: 회원가입 완료 시, localStorage에 아이디 및 비번 저장
- 로그인 상태는 localStorage의 `isLogin` 변수로 로그인 상태 설정 및 관리
- 로그인 페이지
  - 회원가입 할 때 사용했던 아이디/비번 입력하면 로그인
  - 로그인 request 하면, 회원가입할 때 localStorage에 저장했던 값을 불러와, 아이디, 비번이 일치하는지 확인함.
    - 입력 값 일치: 로그인 성공 -> 로그인 상태 true 변경
    - 입력 값 미일치: 로그인 실패 -> 로그인 상태 false 유지

2. 미로그인 시, 로그인 했을 시의 기능 차이

- 로그인 안한 상태 (게스트) 상태라면 첫 화면 최상단에 `Hello Guest` 라고 뜸
- 로그인을 한 상태라면, 홈 화면 최상단에 `Hello [UserId]` 로 회원가입 했던 유저의 id가 나타나게 됨
- 다이어리, 투두, 디데이 탭에 들어가면 `로그인 후 이용하세요!` 라는 문구가 뜨며 기능 사용 불가
  - 로그인 하면 정상 사용 가능

## 화면 구성

- React-Router-Dom의 BrowserRotuer를 이용
  - 웹사이트의 주소가 바뀌면 해당 페이지로 이동하게 구성함
- 일부 페이지는 페이지가 처음 로드되었을 때 **useEffect**를 이용
  - localStorage에서 해당하는 키 값으로 저장된 값(예를 들면 로그인 상태, userId, userPassword, 저장된 D-Day 목록 등)을 불러와, 컴포넌트가 렌더링 하기 전에 값을 불러와 렌더링 할 수 있도록 구현
- 

### 메인 화면

> JS파일 위치: components/main.js

> localhost:3000/

- 저장된 _Diary_, _ToDo_, _D-Day_ 항목이 보임
- 상단에는 가입한 유저의 id 값이 `Hello [유저이름]`의 형태로 보임
- 그 아래에는 현재 시간이랑 현재 날짜가 실시간으로 표시됨 (react-live-clock module 사용)
- 항목이 없다면 `저장된 [해당 column의 값]이 없습니다!` 라는 메시지가 표시됨
- 다이어리, ToDo List, D-Day 페이지에서 항목을 추가하고 다시 홈으로 오면 추가한 항목이 표시됨
- 'Diary', 'Todo', 'D-Day' 에 마우스를 hover 하면 hover 효과가 나타남
- 클릭하면 각 이름에 해당하는 페이지로 이동

### 다이어리 화면

> JS파일 위치: components/diary.js

> localhost:3000/diary

- 상단에는 글을 쓸 수 있는 부분이 있음
- 하단에는 사용자가 쓴 글이 쭉 나열됨
- 아무것도 입력 안하고 `글쓰기` 누르면 글이 작성되지 않음
  - 모든 항목 입력하고 `글쓰기` 버튼 누르면 정상 등록
- 수정 버튼을 누르면 상단의 _글쓰기_ 영역이 _글 수정하기_ 로 바뀌고, 기존에 등록되어있던 글이 불러와짐.
  - 글을 수정하고, 하단의 `수정하기` 버튼을 누르면 수정사항이 반영됨
- 글 본문의 `삭제` 버튼을 누르면 글이 삭제됨

### ToDo List 화면

> JS파일 위치: components/todo_new.js

> localhost:3000/todo

- 값을 입력하고 '추가' 버튼을 누르면 하단에 항목이 추가됨
- 아무것도 입력하지 않고 `추가` 버튼을 누르면 추가가 되지 않음 (조건 검사)
  - 항목을 입력하고 `추가` 버튼을 누르면 정상 추가 됨
- 글 왼쪽에 있는 하얀색 박스에 hover Effect 적용, 클릭하면 즉시 삭제됨
- 상단의 '해야 할 일 개수' 는 저장된 task의 길이에 따라 '없음', '1개', '해당 목록의 길이' 만큼 각각 표시해 줌 (count)

### D-Day 화면

> JS파일 위치: components/dday.js

> localhost:3000/dday

- 값을 입력하고 `추가` 버튼을 누르면 하단에 항목이 추가됨
- 아무 항목도 없으면 헤더 영역 (제목, D-Day, 날짜 헤더) 부분이 숨겨짐
  - 항목이 하나라도 있으면 헤더 영역 보임
- 사용자가 날짜를 입력하면 해당 날짜와 지금 날짜를 비교하여 D-Day를 계산하여 표시해줌 (ex. D-10)
- 왼쪽의 `수정` 버튼을 누르면 상단 입력하는 부분에 수정하고자 하는 내용을 수정할 수 있음
- `삭제` 클릭 시, 즉시 삭제

### Login 페이지

> JS파일 위치: components/login.js

> localhost:3000/login

- 아이디 & 비번을 입력할 수 있는 input 란이 있음
- 모두 입력하면 로그인 할 수 있음
  - 입력 안한 값이 있다면 alert 띄움 & 로그인 중지

### Register 페이지

> JS파일 위치: components/register.js

> localhost:3000/register

- Register 페이지
- 모든 항목을 입력하면 회원가입 가능
  - 입력 안한 값이 있다면 alert 띄우고 회원가입 중지
