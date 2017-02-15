import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {serverResponse} from '../actions/Signup';
const {connect} = require('react-redux');

let form = reduxForm({
  form: 'SignupReduxForm',
  fields: ['username', 'email', 'password'],
  serverResponse : '',
  validate
});

const renderField = ({input, type, meta: {touched, error}}) => (
  <div className="inputWrapper">
    <input {...input} type={type} />
    {touched && error && <div className="error">{error}</div>}
  </div>
);

class SignupForm extends React.Component {

  handleFormSubmit(formProps) {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newUser: formProps
      })
    }).then((response) => {
      response.json().then((data) =>{
        if(data.result === 'Success'){
          this.props.onSuccess();
        }
        else{
          this.props.dispatch(serverResponse(data.result));
        }
      });
    });
  }

  render() {
    return (
      <form id="signupForm" onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        <label htmlFor="signupUsername">Choose the username:</label>
        <Field name="username" type="text" id="signupUsername"  component={renderField} />
        <label htmlFor="signupEmail">Enter the email:</label>
        <Field name="email" type="email" id="signupEmail" component={renderField} />
        <label htmlFor="signupEmail">Enter the password:</label>
        <Field name="password" type="password" id="signupPassword" component={renderField} />
        <button type="submit" id="signupBtn">Sign Up!</button>
        <div className="serverResponse">{this.props.serverResponse}</div>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  const usernameRegex =  /^[a-zA-Z0-9_\s]{2,16}$/;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =  /^[\s\S]{4,16}$/;
  if (!formProps.username) {
    errors.username = 'Please enter the username';
  }
  else if(!usernameRegex.test(formProps.username)){
    errors.username = 'Invalid username entered';
  }

  if (!formProps.email || !emailRegex.test(formProps.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  else if(!passwordRegex.test(formProps.password)){
    errors.password = 'Must be 4-16 characters long';
  }

  return errors;
}

const mapStateToProps = (state) => {
  if(state.Signup !== null){
    return {
      serverResponse: state.Signup.response
    };
  }
  else{
    return {serverResponse: ''}
  }
};

export default connect(mapStateToProps)(form(SignupForm));