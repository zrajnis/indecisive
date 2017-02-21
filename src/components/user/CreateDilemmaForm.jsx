import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {resetAnswersArray, createDilemmaSuccess, createDilemmaFailure, clearDilemmaMessages}
  from '../../actions/CreateDilemma';
const validate =  require('../../validator').validateCreateDilemma;
const {connect} = require('react-redux');

let form = reduxForm({
  form: 'CreateDilemmaReduxForm',
  fields: ['title', 'description', 'answer'],
  answersArray: [],
  errorMsg : '',
  successMsg: '',
  validate
});

const renderField = ({input, name, meta: {touched, error}}) => (
  <div className="textareaWrapper">
    <textarea {...input} />
    {touched && error && <div className="error">{error}</div>}
  </div>
);

const answerField = ({input, type, clicked, meta: {touched, error}}) => (
  <div className="inputWrapper">
    <input {...input} type={type} id="answerInput" />
    <button type="submit"  id="addAnswersBtn" onClick={() => clicked()}>Add</button>
    {touched && error && <div className="error" >{error}</div>}
  </div>
);

class CreateDilemmaForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      wasClicked: false
    };
    this.clicked = this.clicked.bind(this);
    this.removeAnswerFromArray = this.removeAnswerFromArray.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(clearDilemmaMessages());
    this.props.dispatch(resetAnswersArray());
  }

  clicked(){
    this.setState({wasClicked: true})
  }

  removeAnswerFromArray(index) {
    this.props.answersArray.splice(index,1);
    if(this.props.answersArray.length === 4){
      document.getElementById('addAnswersBtn').disabled = false;
    }
    this.forceUpdate();
  }

  handleFormSubmit(formProps) {
    if(this.state.wasClicked) { //if user added an option
      if(formProps.answer.trim()) {
        this.props.answersArray.push(formProps.answer);
        formProps.answer = '';
      }

      if(this.props.answersArray.length === 5) { // Maximum allowed number of answers is 5 so,when reached disable button
        document.getElementById('addAnswersBtn').disabled = true;
      }

      this.setState({wasClicked: false});
    }
    else {
      fetch('/user/createDilemma', { //otherwise user submitted the form and tried to create a playlist
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dilemmaData: {
            title: formProps.title,
            description: formProps.description,
            answers: this.props.answersArray
          }
        }),
        credentials: 'same-origin'
      }).then((response) => {
        response.json().then((data) =>{
          if(data.result === 'Dilemma created') {
            formProps.title = ''; //reset values but don't refresh the page
            formProps.description = '';
            formProps.answer = '';
            document.getElementById('addAnswersBtn').disabled = false;
            this.props.dispatch(createDilemmaSuccess(data.result), this.props.dispatch(resetAnswersArray()));
          }
          else {
            this.props.dispatch(createDilemmaFailure(data.result));
          }
          setTimeout(() => {
            this.props.dispatch(clearDilemmaMessages());
          }, 3000)
        });
      });
    }
    return false;
  }

  render() {
    return (
      <form id="createDilemmaForm" onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        <label htmlFor="dilemmaTitle">Enter the title:</label>
        <Field name="title" id="dilemmaTitle"  component={renderField} />
        <label htmlFor="dilemmaDescription">Describe the dilemma:</label>
        <Field name="description"  id="dilemmaDescription" component={renderField} />
        <label htmlFor="dilemmaAnswer">Add answers:</label>
        <Field name="answer" type="text" id="dilemmaAnswer"  clicked={this.clicked} component={answerField} />
        <label htmlFor="answersList">Your answers:</label>
        <div id="answersListContainer">
          <ul id="answersList">{this.props.answersArray.length > 0 ? this.props.answersArray.map(
            (answer, i) =>  <li key={i}>{answer} <button type="button" className="removeAnswerBtn" onClick={() =>
          this.removeAnswerFromArray(i)}>x</button></li>) : ''}</ul>
        </div>
        <button type="submit" id="createDilemmaBtn" disabled={this.props.answersArray.length < 2}>Create</button>
        <span className="successMsg">{this.props.successMsg}</span>
        <div className="errorMsg">{this.props.errorMsg}</div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  if(state.CreateDilemma !== null && state.CreateDilemma.errorMsg) {
    return {
      errorMsg: state.CreateDilemma.errorMsg
    };
  }
  else if(state.CreateDilemma !== null && state.CreateDilemma.successMsg) { //if state of successmsg exists then answerarray does too since they're dispatched together
    return {
      successMsg: state.CreateDilemma.successMsg,
      answersArray: state.CreateDilemma.answersArray
    };
  }
  else if(state.CreateDilemma !== null && state.CreateDilemma.answersArray) {
    return {
      answersArray: state.CreateDilemma.answersArray
    };
  }
  else {
    return {}
  }
};

export default connect(mapStateToProps)(form(CreateDilemmaForm));