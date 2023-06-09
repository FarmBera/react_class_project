import '../css/main.css';

import Topclock from './topclock';
import Todo from '../components/todo_new';
import Diary from '../components/diary';
import Dday from '../components/dday';

export default function Main() {
  return (
    <div className="MainTemp">
      <Topclock />
      <hr></hr>
      <div className="main-container">
        <div className="box-a">
          <Diary />
        </div>
        <div className="box-b">
          <Todo />
        </div>
        <div className="box-c">
          <Dday />
        </div>
      </div>
    </div>
  );
}
