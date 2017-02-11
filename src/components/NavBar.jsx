import React from 'react';
import SignUpModal from './SignUpModal.jsx';
import { Field, reduxForm } from 'redux-form';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      signupData:{
        username: null,
        email: null,
        password: null
      }
    };
    this.updateSignupData = this.updateSignupData.bind(this);
  };
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  updateSignupData(e) {

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <ul>
            <li><a className="active" href="/">Home</a></li>
            <li><a href="#hot">Hot</a></li>
            <li><a href="#newest">Newest</a></li>
          </ul>
          <div className="searchFormContainer">
            <form id="searchForm" href="#search">
              <label for="#searchBar" className="hidden">Search a dilemma</label>
              <input type="search" placeholder="Search a dilemma" id="searchBar"/>
              <button type="submit" id="searchBtn">
              </button>
            </form>

            <button type="button" id="login">Log in</button>
            <button type="button" id="signup" onClick={() => this.openModal()}>Sign Up</button>
          </div>
        </nav>
        <SignUpModal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <button className="cancelBtn"onClick={() => this.closeModal()}>x</button>
          <h1>Sign Up!</h1>
          <form id="signupForm">
            <label for="signupUsername">Choose the username:</label>
            <div className="inputWrapper">
              <input type="text" id="signupUsername"  />
            </div>
            <label for="signupEmail">Enter the email:</label>
            <div className="inputWrapper">
              <input type="email" id="signupEmail"  />
            </div>
            <label for="signupEmail">Enter the password:</label>
            <div className="inputWrapper">
              <input type="password" id="signupPassword"  />
            </div>
            <button type="submit" id="signupBtn">Sign Up!</button>

          </form>

        </SignUpModal>
      </div>


    );
  }
}

export default NavBar;