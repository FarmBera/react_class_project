import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Head from './components/head';
import Main from './components/main';
import Foot from './components/foot';

import Topclock from './components/topclock';
import Todo from './components/todo';
import Diary from './components/diary';
import Dday from './components/dday';

import Support from './components/support';
import Login from './components/login';
import Register from './components/register';

function Final() {
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
function Temp() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/dday" element={<Dday />}></Route>

          <Route path="/dday" element={<Support />}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Temp />
    </div>
  );
}

export default App;
