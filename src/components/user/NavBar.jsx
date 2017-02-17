import React from 'react';
import Modal from '../Modal.jsx';
import Settings from './Settings.jsx';

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

  logout() {
    alert('should log out');
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <ul>
            <li><a className="active" href="/user">Home</a></li>
            <li><a href="/user/hot">Hot</a></li>
            <li><a href="/user/newest">Newest</a></li>
            <li><a href="/user/mine">Mine</a></li>
            <li><a href="/user/create">Create</a></li>
          </ul>
          <div className="searchFormContainer">
            <form id="searchForm" href="#search">
              <label  htmlFor="#searchBar" className="hidden">Search a dilemma</label>
              <input type="search" placeholder="Search a dilemma" id="searchBar"/>
              <button type="submit" id="searchBtn">
              </button>
            </form>
            <button type="button" id="login" onClick={() => this.openModal()}>Settings</button>
            <button type="button" id="signup" onClick={() => this.logout()}>Log out</button>
          </div>
        </nav>

        <Modal id="settingsModal" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <button className="cancelBtn" onClick={() => this.closeModal()}>x</button>
          <div id="settingsModalContainer">
            <h1 id="settingsTitle">Settings</h1>
            <Settings />
            <button type="button" id="closeSettingsBtn" className="closeBtn" onClick={() => this.closeModal()}>
              Close</button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default NavBar;