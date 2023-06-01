import '../css/head.css';
// import logo from "img/logo.png";
// import search_ico from "img/search-icon.png";

export default function Head() {
  return (
    <div className="Head">
      <h1>header Area</h1>
      <header>
        <ul className="">
          <li className="">
            <img src="/img/logo.png" alt="Company Logo" width="30px" />
          </li>
          <li className="">
            <a href="/diary">Daily Note</a>
          </li>
          <li className="">
            <a href="/todo">ToDo</a>
          </li>
          <li className="">
            <a href="/dday">D-Day</a>
          </li>
          <li className="">
            <a href="#">LogIn</a>
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
