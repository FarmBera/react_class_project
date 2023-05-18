import "../css/head.css";

function Head() {
  return (
    <div className="Head">
      <h1>header Area</h1>
      <ul>
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
        <li className="">
          <a href="#">LogIn</a>
        </li>
      </ul>
    </div>
  );
}

export default Head;
