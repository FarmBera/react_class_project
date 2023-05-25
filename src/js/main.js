import "../css/main.css"; // CSS import

import Topclock from "./topclock";
import Todo from "./todo";
import Diary from "./diary";
import Dday from "./dday";


function App() {
  return (
    <div className="App">
      <Topclock />
      <hr></hr>
      <Diary />
      <Todo />
      <Dday />
    </div>
  );
}

export default App;
