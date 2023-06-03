import '../css/foot.css';
// import "../img/logo512.png";

export default function Foot() {
  return (
    <footer className="header">
      <img src="/img/logo.png" alt="Company Logo" width="30px" />
      <h2>footer Area</h2>
      <nav>
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
              </li> */}
        </ul>
      </nav>
    </footer>
    // <div className="Foot">
    //   <h1>Footer Page</h1>
    //   <ul>
    //     <li>
    //       <img
    //         src="../img/logo512.png"
    //         alt="Company Logo"
    //         width="30px"
    //         height="30px"
    //       />
    //       &nbsp; REACT Company
    //     </li>
    //   </ul>

    //   <ul>
    //     <li>About US</li>
    //     <li>Contact US</li>
    //     <li>Services</li>
    //     <li>Support</li>
    //   </ul>

    //   <p>@Copyright. All rights reserved </p>
    // </div>
  );
}
