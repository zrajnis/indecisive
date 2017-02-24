import React from 'react';
import Modal from '../Modal.jsx';
import Settings from './Settings.jsx';
import CreateDilemmaForm from './CreateDilemmaForm.jsx';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateDilemmaModalOpen: false,
      isSettingsModalOpen: false
    };
  };
  
  openSettingsModal() {
    this.setState({ isSettingsModalOpen: true })
  }

  closeSettingsModal() {
    this.setState({ isSettingsModalOpen: false });
  }

  openCreateDilemmaModal() {
    this.setState({ isCreateDilemmaModalOpen: true })
  }

  closeCreateDilemmaModal() {
    this.setState({ isCreateDilemmaModalOpen: false });
  }

  logout() {
    fetch('/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(() => {
      window.location.href='http://localhost:3000';
    });
  }

  render() {
    return (
      <div id="navBarContainer">
        <nav id="navBar">
          <ul id="navBarList">
            <li><a className="active" href="/user">Home</a></li>
            <li><a href="/user/hot">Hot</a></li>
            <li><a href="/user/newest">Newest</a></li>
            <li><a href="/user/mine">Mine</a></li>
          </ul>
          <div id="searchFormContainer">
            <form id="searchForm" href="#search">
              <label  htmlFor="#searchBar" className="hidden">Search a dilemma</label>
              <input type="search" placeholder="Search a dilemma" id="searchBar"/>
              <button type="submit" id="searchBtn">
              </button>
            </form>
            <button type="button" className="navBarBtn"  id="create" onClick={() => this.openCreateDilemmaModal()}>Create</button>
            <button type="button" className="navBarBtn"  id="settings" onClick={() => this.openSettingsModal()}>Settings</button>
            <button type="button" className="navBarBtn"  id="logout" onClick={() => this.logout()}>Log out</button>
          </div>
        </nav>

        <Modal className="modal" backdropClassName="backdrop" id="settingsModal" isOpen={this.state.isSettingsModalOpen}
               onClose={() => this.closeSettingsModal()}>
          <button className="cancelBtn" onClick={() => this.closeSettingsModal()}>x</button>
          <div id="settingsModalContainer">
            <h1 id="settingsTitle">Settings</h1>
            <Settings />
            <button type="button" id="closeSettingsBtn" className="closeBtn" onClick={() => this.closeSettingsModal()}>
              Close</button>
          </div>
        </Modal>

        <Modal className="createDilemmaModal" backdropClassName="backdrop" id="createModal"
               isOpen={this.state.isCreateDilemmaModalOpen} onClose={() => this.closeCreateDilemmaModal()}>
          <button className="cancelBtn" onClick={() => this.closeCreateDilemmaModal()}>x</button>
          <div id="createDilemmaModalContainer">
            <h1 id="createDilemmaTitle">Create a dilemma</h1>
            <CreateDilemmaForm />
            <button type="button" id="cancelCreateBtn" className="closeBtn" onClick={() => this.closeCreateDilemmaModal()}>
              Close</button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default NavBar;