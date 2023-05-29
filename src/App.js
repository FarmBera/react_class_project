import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Head from './js/head';
import Main from './js/main';
import Foot from './js/foot';

import Topclock from './js/topclock';
import Todo from './js/todo';
import Diary from './js/diary';
import Dday from './js/dday';

import Support from './js/support';
import Login from './js/login';
import Register from './js/register';

function Temp() {
  return (
    <div className="App">
      <Head />
      <hr />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/dday" element={<Dday />}></Route>
        </Routes>
      </BrowserRouter>
      <hr />
      <Foot />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {/* <Temp /> */}
      {/* <Todo /> */}
      <Dday />
    </div>
  );
}

export default App;
