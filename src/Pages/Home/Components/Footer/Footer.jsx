import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../Context";
import "./Footer.css";

const Footer = () => {
  const {
    authState: { token }
  } = useAuth();

  return (
    <footer>
      <h4 className="lp-footer-h1">About US</h4>
      <div className="lp-footer">
        <ul className="footer-nav-links">
          <li>
            <Link to="/">Contact Us</Link>
          </li>
          <li>
            <Link to="/products">Trending</Link>
          </li>
          <li>
            <Link to="/products">New Releases</Link>
          </li>
        </ul>
        <ul className="footer-nav-links">
          <li>
            <Link to={token ? "/cart" : "/"}>My Cart</Link>
          </li>
          <li>
            <Link to={token ? "/user" : "/signup"}>Sign up</Link>
          </li>
          <li>
            <Link to={token ? "/user" : "/login"}>Login</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export { Footer };
