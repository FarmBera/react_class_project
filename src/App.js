import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Head from './components/head';
import Foot from './components/foot';

import Topclock from './components/topclock';
import Diary from './components/diary';
// import Todo from './components/todo';
import TodoNew from './components/todo_new';
import Dday from './components/dday';

import Support from './components/support';
import Login from './components/login';
import Register from './components/register';
import DiaryEditor from './components/diary_new';

function Home() {
  return (
    <div>
      {/* <StyledHome> */}
      <Topclock />
      <div className="BoxContainer">
        <div className="box-a">
          <Diary />
        </div>
        <div className="box-b">
          <TodoNew />
        </div>
        <div className="box-c">
          <Dday />
        </div>
      </div>
      {/* </StyledHome> */}
    </div>
  );
}
function Main() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/diary_new" element={<DiaryEditor />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          {/* <Route path="/todo" element={<Todo />}></Route> */}
          <Route path="/todo" element={<TodoNew />}></Route>
          <Route path="/dday" element={<Dday />}></Route>

          <Route path="/support" element={<Support />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Head />
      <div className="grid">
        <Main />
        {/* <TodoNew /> */}
      </div>
      {/* <Foot /> */}
    </div>
  );
}
