import React from 'react';
import Modal from './Modal.jsx';
import SignupForm from './SignupForm.jsx';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      didRegister: false
    };

  };
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  changeModal() {
    this.setState({ didRegister: true });
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
            <button type="button" id="login">Log in</button>
            <button type="button" id="signup" onClick={() => this.openModal()}>Sign Up</button>
          </div>
        </nav>

        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <button className="cancelBtn" onClick={() => this.closeModal()}>x</button>
          {this.state.didRegister ?
            <div className="modalContent" id="registrationSuccess">
              <h1>Account Registered!</h1>
              <p className="message">You have successfully registered your account.</p>
              <p className="message">Log into the account to enjoy all the perks registered users get.</p>
              <button className="closeBtn" onClick={() => this.closeModal()}>Close</button>
            </div>
            :
            <div className="modalContent">
              <h1>Sign Up!</h1>
              <SignupForm onSuccess={() => this.changeModal()}/>
            </div>
          }
        </Modal>
      </div>
      
    );
  }
}
export default NavBar;