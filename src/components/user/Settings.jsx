import React from 'react';
import {serverUsernameResponse, serverEmailResponse, failedUsernameValidation,
  failedEmailValidation, failedPasswordValidation, clearErrorMsg} from '../../actions/Settings';
import SettingsField from './SettingsField.jsx';
const validate = require('../../validator').validateSettings;
const {connect} = require('react-redux');

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeactivateActive: false
    };
    this.changeData = this.changeData.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(clearErrorMsg());
  }

  showDeactivateField() {
    this.setState({isDeactivateActive: true});
  }

  hideDeactivateField() {
    this.setState({isDeactivateActive: false});
  }

  deactivateAccount() {
    fetch('/user/settings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(() => {
      window.location.href='http://localhost:3000';
    });
  };

  changeData(type, id) { // accepts type of input field from which we determine what kind of change it is,and value
    const input = document.getElementById(id);
    const error = validate(type, input.value);
    if(input.value.trim() && !error) {
      fetch('/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: type,
          value: input.value.trim()
        }),
        credentials: 'same-origin'
      }).then((response) => {
        response.json().then((data) => {
          switch(data.result ) {
            case 'Success':
              input.value = '';
              this.props.dispatch(clearErrorMsg());
              break;
            case 'Username is not available':
              this.props.dispatch(serverUsernameResponse(data.result));
              break;
            case 'Email is already in use':
              this.props.dispatch(serverEmailResponse(data.result));
              break;
            default:
              console.log('something unexpected happened');
              break;
          }
        });
      });
    }
    else if(input.value.trim() && error) {
      switch(type) {
        case 'text':
          this.props.dispatch(failedUsernameValidation(error));
          break;
        case 'email':
          this.props.dispatch(failedEmailValidation(error));
          break;
        case 'password':
          this.props.dispatch(failedPasswordValidation(error));
          break;
        default:
          console.log('something unexpected happened');
          break;
      }
    }
  }

  render() {
    return (
      <div id="settingsContainer" >
        <label htmlFor="changeUsername">Change the username:</label>
        <SettingsField id="changeUsername" type="text" errorMsg={this.props.usernameError} changeData={this.changeData}/>
        <label htmlFor="changeEmail">Change the email:</label>
        <SettingsField id="changeEmail" type="email" errorMsg={this.props.emailError} changeData={this.changeData}/>
        <label htmlFor="changePassword">Change the password:</label>
        <SettingsField id="changePassword" type="password" errorMsg={this.props.passwordError} changeData={this.changeData}/>
        <div id="deactivateContainer">
          {this.state.isDeactivateActive ?
            <div id="deactivateConfirmationContainer">
              <div id="deactivateDecision">Are you sure that you want to deactivate your account?</div>
              <button type="button" id="confirmDeactivationBtn" onClick={() => this.deactivateAccount()}>Yes</button>
              <button type="button" id="declineDeactivationBtn" onClick={() => this.hideDeactivateField()}>No</button>
            </div>
            :
            <button type="button" id="deactivateBtn" onClick={() => this.showDeactivateField()}>Deactivate </button>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if(state.Settings !== null) {
    return {
      usernameError: state.Settings.usernameError,
      emailError: state.Settings.emailError,
      passwordError: state.Settings.passwordError
    };
  }
  else {
    return {};
  }
};
export default connect(mapStateToProps)(Settings);


