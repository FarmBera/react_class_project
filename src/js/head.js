import "../css/head.css";
// import logo from "img/logo.png";
// import search_ico from "img/search-icon.png";

function Head() {
  return (
    <div className="Head">
      <h1>header Area</h1>
      <header>
        <ul className="">
          <li className="">
            <img src="/img/logo.png" alt="Company Logo" width="30px" />
          </li>
          <li className="">
            <a href="#">Daily Note</a>
          </li>
          <li className="">
            <a href="#">ToDo</a>
          </li>
          <li className="">
            <a href="#">D-Day</a>
          </li>
          <li className="">
            <a href="#">My Page</a>
          </li>
          {/* <li className="">
            <input type="text" placeholder="Search..." />
            <img src="search_ico" alt="search Icon" />
          </li> */}
          <li className="">
            <a href="#">LogIn</a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Head;
