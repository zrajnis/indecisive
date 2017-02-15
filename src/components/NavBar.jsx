import React from 'react';
import Modal from './Modal.jsx';
import SignupForm from './SignupForm.jsx';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

  };
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false });
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
          <h1>Sign Up!</h1>
          <SignupForm error="errorZZ"/>
        </Modal>
      </div>


    );
  }
}
export default NavBar;