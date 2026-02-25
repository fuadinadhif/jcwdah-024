import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <div>LOGO</div>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Link to="#">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
