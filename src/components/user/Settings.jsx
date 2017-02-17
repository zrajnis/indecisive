import React from 'react';
import {serverUsernameResponse, serverEmailResponse, serverPasswordResponse, failedUsernameValidation,
  failedEmailValidation, failedPasswordValidation, clearErrorMsg} from '../../actions/Settings';
import SettingsField from './SettingsField.jsx';
const validate = require('../../validator').validateSettings;
const {connect} = require('react-redux');


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(clearErrorMsg());
  }

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
            case 'Invalid username entered':
              this.props.dispatch(serverUsernameResponse(data.result));
              break;
            case 'Email is already in use':
            case 'Please enter a valid email':
              this.props.dispatch(serverEmailResponse(data.result));
              break;
            case 'Must be 4-16 characters long':
              this.props.dispatch(serverPasswordResponse(data.result));
              break;
            default:
              console.log('something unexpected happened');
              break;
          }
        });
      });
    }
    else if(error) {
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
    return {usernameError: '', emailError: '', passwordError: ''}
  }
};
export default connect(mapStateToProps)(Settings);


