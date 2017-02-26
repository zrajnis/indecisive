import React from 'react';
import {changeEmail, changePassword, deactivateAccount,
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
    this.props.dispatch(clearErrorMsg());
    this.setState({isDeactivateActive: true});
  }

  hideDeactivateField() {
    this.props.dispatch(clearErrorMsg());
    this.setState({isDeactivateActive: false});
  }

  deactivateAccount() {
    
  };

  changeData(type, id) { // accepts type of input field from which we determine what kind of change it is,and value
    const input = document.getElementById(id);
    const error = validate(type, input.value);

    if(input.value.trim() && !error) {
      switch (type) {
        case 'email':
          this.props.dispatch(changeEmail(input));
          break;
        case 'password':
          this.props.dispatch(changePassword(input));
          break;
        default:
          break;
      }
    }
    else if(input.value.trim() && error) {
      switch(type) {
        case 'email':
          this.props.dispatch(failedEmailValidation(error));
          break;
        case 'password':
          this.props.dispatch(failedPasswordValidation(error));
          break;
        default:
          break;
      }
    }
  }

  render() {
    return (
      <div id="settingsContainer" >
        <label htmlFor="changeEmail">Change the email:</label>
        <SettingsField id="changeEmail" type="email" errorMsg={this.props.emailError} changeData={this.changeData}/>
        <label htmlFor="changePassword">Change the password:</label>
        <SettingsField id="changePassword" type="password" errorMsg={this.props.passwordError} changeData={this.changeData}/>
        <div id="deactivateContainer">
          {this.state.isDeactivateActive ?
            <div id="deactivateConfirmationContainer">
              <div id="deactivateDecision">Are you sure that you want to deactivate your account?</div>
              <button type="button" id="confirmDeactivationBtn" onClick={() => this.props.dispatch(deactivateAccount())}>Yes</button>
              <button type="button" id="declineDeactivationBtn" onClick={() => this.hideDeactivateField()}>No</button>
              <div id="deactivateError">{this.props.deactivateError}</div>
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
      emailError: state.Settings.emailError,
      passwordError: state.Settings.passwordError,
      deactivateError: state.Settings.deactivateError
    };
  }
  else {
    return {};
  }
};
export default connect(mapStateToProps)(Settings);


