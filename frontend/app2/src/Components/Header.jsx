import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const isLoggedIn = localStorage.getItem("userData");
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <LinkContainer to="/">
            <Link className="navbar-brand text-white">Electricity Board</Link>
          </LinkContainer>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">

                  <LinkContainer to="/">
            <Link className="nav-link active text-white">Electricity Board</Link>
          </LinkContainer>

              </li>
              <li className="nav-item">
                <LinkContainer to="/StatisticsCollection">
                <a className="nav-link text-white" href="#">
                DashBoard Statistics
                </a>
                </LinkContainer>
              </li>
          
              {isLoggedIn ? (
                <li className="nav-item">
                  <LinkContainer to="/logout">
                  <Link className="nav-link">Logout</Link>
                  </LinkContainer>
                </li>
              ) : (
                <li className="nav-item">
                  <LinkContainer to="/login">
                  <Link className="nav-link">Login</Link>
                  </LinkContainer>
                  </li>
              )}
            
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
