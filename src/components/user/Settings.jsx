import React from 'react';
import {serverUsernameResponse, serverEmailResponse, clearErrorMsg} from '../../actions/Settings';
import SettingsField from './SettingsField.jsx';
const {connect} = require('react-redux');


class Settings extends React.Component {
  constructor(props){
    super(props);
    this.changeData = this.changeData.bind(this);
  }
  componentWillUnmount() {
    this.props.dispatch(clearErrorMsg());
  }

  changeData(type, id) { // accepts type of input field from which we determine what kind of change it is,and value
    const input = document.getElementById(id);
    if(input.value.trim()){
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
        response.json().then((data) =>{
          switch(data.result ){
            case 'Success':
              input.value = '';
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
  console.log(state);
  if(state.Settings !== null){
    return {
      usernameError: state.Settings.usernameError,
      emailError: state.Settings.emailError,
      passwordError: state.Settings.passwordError
    };
  }
  else{
    return {usernameError: '', emailError: '', passwordError: ''}
  }
};

export default connect(mapStateToProps)(Settings);