import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {serverResponse, loginFailure, clearErrorMsg} from '../../actions/Login';
const {connect} = require('react-redux');

let form = reduxForm({
  form: 'LoginReduxForm',
  fields: ['username', 'password'],
  errorMsg : ''
});

const renderField = ({input, type}) => (
  <div className="inputWrapper">
    <input {...input} type={type} />
  </div>
);

class LoginForm extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(clearErrorMsg());
  }

  handleFormSubmit(formProps) {
    if(formProps.username.trim() && formProps.password.trim()){
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userData: formProps
        }),
        credentials: 'same-origin'
      }).then((response) => {
        response.json().then((data) =>{
          if(data.result === 'Success'){
            window.location.href='http://localhost:3000/user';
          }
          else{
            this.props.dispatch(serverResponse(data.result));
          }
        });
      });
    }
    else{
      this.props.dispatch(loginFailure());
    }
  }

  render() {
    return (
      <form id="signupForm" onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        <label htmlFor="loginUsername">Choose the username:</label>
        <Field name="username" type="text" id="loginUsername"  component={renderField} />
        <label htmlFor="loginPassword">Enter the password:</label>
        <Field name="password" type="password" id="loginPassword" component={renderField} />
        <button type="submit" id="signupBtn">Sign Up!</button>
        <div className="serverResponse">{this.props.errorMsg}</div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  if(state.Login !== null){
    return {
      errorMsg: state.Login.error
    };
  }
  else{
    return {errorMsg: ''}
  }
};

export default connect(mapStateToProps)(form(LoginForm));