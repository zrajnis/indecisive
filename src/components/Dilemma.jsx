import React from 'react';
const {connect} = require('react-redux');

class Dilemma extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answerVoted: -1, //index of answer that user voted for
      isDisplayingVoteResults: false
    }
  }

  incrementVote(index) {
    if(this.state.answerVoted === index) {
      this.state.answerVoted = -1;
      document.getElementById("Dilemma" + this.props.dilemmaNumber + "RadioBtn" + index).checked = false;
      this.props.removeVote(index, this.props.dilemma._id);
    }
    else {
      if(this.state.answerVoted === -1) { //if answer wasnt already upvoted and no other answer was selected add new one
        this.props.addNewVote(index, this.props.dilemma._id);
      }
      else {  //otherwise change the vote from one answer to another
        this.props.changeVote(this.state.answerVoted, index, this.props.dilemma._id);
      }
      this.state.answerVoted = index;
      document.getElementById("Dilemma" + this.props.dilemmaNumber + "RadioBtn" + index).checked = true;
    }
  }

  toggleVoteDisplay() {
    this.setState({isDisplayingVoteResults: !this.state.isDisplayingVoteResults})
  }

  render() {
    return (
      <div className="dilemmaContainer">
        <div className="dilemmaTitleContainer">
          <span className="dilemmaTitle">{this.props.dilemma.title}</span>
          <div className="authorContainer">By: {this.props.dilemma.author}, on {this.props.dilemma.timestamp}</div>
        </div>
        <div className="dilemmaDescription">
          {this.props.dilemma.description}
        </div>
        <div className="dilemmaAnswerContainer">
          {this.props.dilemma.answers.map((answer, i) =>
            <div key={i} className="dilemmaRadioWrapper">
              <input type="radio" name={"upvoteDilemma" + this.props.dilemmaNumber} className="upvoteRadio" 
                     id={"Dilemma" + this.props.dilemmaNumber + "RadioBtn" + i}/>
              <span className="radioImg" onClick={() => this.incrementVote(i)}/>
              <label htmlFor={"radioBtn" + i}>
                <span  className="radioText">{answer}</span>
              </label>
              {this.state.isDisplayingVoteResults ?
                <span className="answerVotes">{this.props.dilemma.answerVotes[i]}</span>
                : ''}
            </div>
          )}
        </div>
        <div className="toggleVotesBtnContainer">
          <button className="toggleVotesBtn" onClick={() =>{this.toggleVoteDisplay()}}>
            {this.state.isDisplayingVoteResults ? 'Hide votes' : 'Show votes'}</button>
        </div>
        <div className="errorMsg">{this.props.dilemma.error ? this.props.dilemma.error : ''}</div>
      </div>
    );
  }
}

/*const mapStateToProps = (state) => {
  console.log('dilemma state')
  console.log(state);
  if(state.Dilemmas !== null && (state.Dilemmas.data[this.props.dilemmaNumber] ||
    state.Dilemmas.data[this.props.dilemmaNumber].error)) {
    return {dilemma: state.dilemmas.data[this.props.dilemmaNumber]}
  }
  else {
    return {}
  }
};*/

export default Dilemma;