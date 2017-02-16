import React from 'react';
import Modal from '../Modal.jsx';
import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSignupModalOpen: false,
      isLoginModalOpen: false,
      didRegister: false
    };

  };
  openSignupModal() {
    this.setState({ isSignupModalOpen: true })
  }

  closeSignupModal() {
    this.setState({ isSignupModalOpen: false });
  }

  changeSignupModal() {
    this.setState({ didRegister: true });
  }

  openLoginModal() {
    this.setState({ isLoginModalOpen: true })
  }

  closeLoginModal() {
    this.setState({ isLoginModalOpen: false });
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
              <label  htmlFor="#searchBar" className="hidden">Search a dilemma</label>
              <input type="search" placeholder="Search a dilemma" id="searchBar"/>
              <button type="submit" id="searchBtn">
              </button>
            </form>
            <button type="button" id="login" onClick={() => this.openLoginModal()}>Log in</button>
            <button type="button" id="signup" onClick={() => this.openSignupModal()}>Sign up</button>
          </div>
        </nav>

        <Modal id="signupModal" isOpen={this.state.isSignupModalOpen} onClose={() => this.closeSignupModal()}>
          <button className="cancelBtn" onClick={() => this.closeSignupModal()}>x</button>
          {this.state.didRegister ?
            <div className="modalContent" id="registrationSuccess">
              <h1>Account Registered!</h1>
              <p className="message">You have successfully registered your account.</p>
              <p className="message">Log into the account to enjoy all the perks registered users get.</p>
              <button className="closeBtn" onClick={() => this.closeSignupModal()}>Close</button>
            </div>
            :
            <div id="signupModalContent">
              <h1 id="signupTitle">Sign up!</h1>
              <SignupForm onSuccess={() => this.changeSignupModal()}/>
            </div>
          }
        </Modal>

        <Modal id="loginModal" isOpen={this.state.isLoginModalOpen} onClose={() => this.closeLoginModal()}>
          <button className="cancelBtn" onClick={() => this.closeLoginModal()}>x</button>
          <div id="loginModalContent">
            <h1 id="loginTitle">Log in!</h1>
            <LoginForm />
          </div>
        </Modal>
      </div>
    );
  }
}
export default NavBar;