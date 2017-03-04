import React from 'react';
import Modal from '../Modal.jsx';
import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';
import {Link} from 'react-router';

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
    this.setState({ isSignupModalOpen: true });
  }

  closeSignupModal() {
    this.setState({ isSignupModalOpen: false });
  }

  changeSignupModal() {
    this.setState({ didRegister: true });
  }

  openLoginModal() {
    this.setState({ isLoginModalOpen: true });
  }

  closeLoginModal() {
    this.setState({ isLoginModalOpen: false });
  }

  render() {
    return (
      <div id="navBarContainer">
        <nav id="navBar">
          <ul id="navBarList">
            <li><Link to="/" onClick={() => this.props.load('home')}>Home</Link></li>
            <li><Link to="/hot" onClick={() => this.props.load('hot')}>Hot</Link></li>
            <li><Link to="/newest" onClick={() => this.props.load('newest')}>Newest</Link></li>
          </ul>
          <div id="navBarBtnContainer">
            <label  htmlFor="#searchBar" className="hidden">Search a dilemma</label>
            <input type="search" placeholder="Search a dilemma" id="searchBar"/>
            <Link to="/search"><button type="button" id="searchBtn" onClick={() => this.props.search()}>
            </button></Link>
            <button type="button" className="navBarBtn" id="login" onClick={() => this.openLoginModal()}>Log in</button>
            <button type="button" className="navBarBtn" id="signup" onClick={() => this.openSignupModal()}>Sign up</button>
          </div>
        </nav>

        <Modal className="modal" id="signupModal" backdropClassName="backdrop" isOpen={this.state.isSignupModalOpen} onClose={() => this.closeSignupModal()}>
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

        <Modal className="modal" backdropClassName="backdrop" id="loginModal" isOpen={this.state.isLoginModalOpen} onClose={() => this.closeLoginModal()}>
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
