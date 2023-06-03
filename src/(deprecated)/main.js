import '../css/main.css'; // CSS import

import Topclock from '../components/topclock';
import Todo from '../components/todo';
import Diary from '../components/diary';
import Dday from '../components/dday';

export default function MainTemp() {
  return (
    <div className="MainTemp">
      <Topclock />
      <hr></hr>
      <Diary />
      <Todo />
      <Dday />
    </div>
  );
}
