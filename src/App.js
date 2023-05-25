import "./App.css";
import Head from "./js/head";
import Main from "./js/main";
import Foot from "./js/foot";

import Support from "./js/support";
import Login from "./js/login";
import Register from "./js/register";

function App() {
  return (
    <div className="App">
      <Head />
      <hr />
      <div className="">
        <Main />
      </div>
      <hr />
      <Foot />
    </div>
  );
}

export default App;
