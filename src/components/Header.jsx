import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link to="/" className="brand">
          <span className="brandMark">EA</span>
          <span className="brandText">Estate Agent</span>
        </Link>

      </div>
    </header>
  );
}
