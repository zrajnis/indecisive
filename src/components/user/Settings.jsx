import React from 'react';
import {serverResponse, clearErrorMsg} from '../../actions/Settings';
import SettingsField from './SettingsField.jsx';
const {connect} = require('react-redux');


class Settings extends React.Component {
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
              console.log('Success');
              break;
            case 'Username is not available':
              console.log('username change');
              this.props.dispatch(serverResponse(data.result));
              break;
            case 'Email is already in use':
              console.log('email change');
              this.props.dispatch(serverResponse(data.result));
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
      <form id="signupForm" >
        <label htmlFor="changeUsername">Change the username:</label>
        <SettingsField id="changeUsername" type="text" errorMsg={this.props.errorMsg.username} changeData={this.changeData}/>
        <label htmlFor="changeEmail">Change the email:</label>
        <SettingsField id="changeEmail" type="email" errorMsg={this.props.errorMsg.email} changeData={this.changeData}/>
        <label htmlFor="changePassword">Change the password:</label>
        <SettingsField id="changePassword" type="password" errorMsg={this.props.errorMsg.password} changeData={this.changeData}/>
        <button type="submit" className="closeBtn">Close</button>
        <div className="serverResponse">{this.props.errorMsg}</div>
      </form>
    );
  }
}


const mapStateToProps = (state) => {
  if(state.Settings !== null){
    return {
      errorMsg: state.Settings.error
    };
  }
  else{
    return {errorMsg: ''}
  }
};

export default connect(mapStateToProps)(Settings);