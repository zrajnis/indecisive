import React from 'react';
import { Field, reduxForm } from 'redux-form';
const {connect} = require('react-redux');

var mapStateToProps = state => state;

var form = reduxForm({
  form: 'SignupForm',
  fields: ['username', 'email', 'password'],
  validate
});


class SignupForm extends React.Component {

  handleFormSubmit(formProps) {
    alert(JSON.stringify(formProps));
  }
  render() {
    return (
      <form id="signupForm" onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        <label htmlFor="signupUsername">Choose the username:</label>
        <div className="inputWrapper">
          <Field name="username" type="text" id="signupUsername" component="input" />
        </div>
        <label htmlFor="signupEmail">Enter the email:</label>
        <div className="inputWrapper">
          <Field name="email" type="email" id="signupEmail" component="input" />
         </div>
        <label htmlFor="signupEmail">Enter the password:</label>
        <div className="inputWrapper">
          <Field name="password" type="password" id="signupPassword" component="input" />
        </div>
        <button type="submit" id="signupBtn">Sign Up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Please enter the username';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }
  return errors;

}
export default connect(mapStateToProps)(form(SignupForm));