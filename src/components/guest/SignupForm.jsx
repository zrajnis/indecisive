import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {serverResponse, clearErrorMsg} from '../../actions/Signup';
const validate =  require('../../validator').validateSignup;
const {connect} = require('react-redux');

let form = reduxForm({
  form: 'SignupReduxForm',
  fields: ['username', 'email', 'password'],
  errorMsg : '',
  validate
});

const renderField = ({input, type, meta: {touched, error}}) => (
  <div className="inputWrapper">
    <input {...input} type={type} />
    {touched && error && <div className="error">{error}</div>}
  </div>
);

class SignupForm extends Component {
  componentWillUnmount() {
    this.props.dispatch(clearErrorMsg());
  }

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
      response.json().then((data) => {
        if(data.result === 'Success') {
          this.props.onSuccess();
        }
        else {
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
        <label htmlFor="signupPassword">Enter the password:</label>
        <Field name="password" type="password" id="signupPassword" component={renderField} />
        <button type="submit" id="signupBtn">Sign up</button>
        <div className="serverResponse">{this.props.errorMsg}</div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  if(state.Signup !== null) {
    return {
      errorMsg: state.Signup.error
    };
  }
  else {
    return {};
  }
};

SignupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  errorMsg: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(form(SignupForm));
