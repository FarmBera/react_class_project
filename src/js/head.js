import "../css/head.css";
// import logo from "img/logo.png";
// import search_ico from "img/search-icon.png";

function Head() {
  return (
    <div className="Head">
      <header>
        <h1>header Area</h1>
        <ul>
          <li className="">
            <img src="/img/logo.png" alt="Company Logo" />
          </li>
          <li className="">
            <a href="#">Home</a>
          </li>
          <li className="">
            <a href="#">Category</a>
          </li>
          <li className="">
            <a href="#">Shop</a>
          </li>
          <li className="">
            <a href="#">My Page</a>
          </li>
          <input type="text" placeholder="Search..." />
          <img src="search_ico" alt="search Icon" />
          <li className="">
            <a href="#">LogIn</a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Head;
