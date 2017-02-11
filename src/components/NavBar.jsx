import React from 'react';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <ul>
          <li><a class="active" href="/">Home</a></li>
          <li><a href="#hot">Hot</a></li>
          <li><a href="#newest">Newest</a></li>
        </ul>
        <div className="btnContainer">
          <form id="searchForm" href="#search">
            <label for="#searchBar">Search a dilemma</label>
            <input type="search" placeholder="Search a dilemma" id="searchBar"/>
            <button type="submit" id="searchBtn">
            </button>
          </form>

          <button type="button" id="login">Log in</button>
          <button type="button" id="signup">Sign Up</button>
        </div>

      </nav>
    );
  }
}

export default NavBar;