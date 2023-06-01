import '../css/foot.css';
// import "../img/logo512.png";

export default function Foot() {
  return (
    <div className="Foot">
      <h1>Footer Page</h1>
      <ul>
        <li>
          <img
            src="../img/logo512.png"
            alt="Company Logo"
            width="30px"
            height="30px"
          />
          &nbsp; REACT Company
        </li>
      </ul>

      <ul>
        <li>About US</li>
        <li>Contact US</li>
        <li>Services</li>
        <li>Support</li>
      </ul>

      <p>@Copyright. All rights reserved </p>
    </div>
  );
}
