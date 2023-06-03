import '../css/head.css';
// import logo from "img/logo.png";
// import search_ico from "img/search-icon.png";

export default function Head() {
  return (
    <header className="header">
      <div class="header">
        {/* <img src="../logo.svg" alt="Company Logo" width="30px" /> */}
        <a href="/" class="logo">
          React Company
        </a>
        <div class="header-right">
          <a href="/diary">Diary</a>
          <a href="/todo">TODO</a>
          <a href="/dday">D-Day</a>
          <a href="/support">About</a>
          <a href="/login">LogIn</a>
        </div>
      </div>
      {/* <nav>
        <ul>
          <li className="">
            <a href="/diary">Diary</a>
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
              </li>
        </ul>
      </nav> */}
    </header>
  );
}
