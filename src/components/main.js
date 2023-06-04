import '../css/main.css'; // CSS import

import Topclock from './topclock';
import Todo from './todo';
import Diary from './diary';
import Dday from './dday';

export default function MiniHome() {
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
