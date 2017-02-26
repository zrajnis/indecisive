import React from 'react';


class Dilemma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //answerVoted: -1, //index of answer that user voted for
      isDisplayingVoteResults: false
    };
  }

  voteAction(index) {
    this.props.removeDilemmaError(this.props.dilemma._id);
    if(this.props.voteIndex === index) { //if user is  removing existing answer
      this.props.removeVote(index, this.props.dilemma._id);
      //this.state.answerVoted = -1;
    }
    else {
      if(this.props.voteIndex === -1) { //if answer wasnt already upvoted and no other answer was selected add new one
        this.props.addNewVote(index, this.props.dilemma._id);
      }
      else {  //otherwise change the vote from one answer to another
        this.props.changeVote(this.props.voteIndex, index, this.props.dilemma._id);
      }
      //this.state.answerVoted = index;
    }
  }

  toggleVoteDisplay() {
    this.setState({isDisplayingVoteResults: !this.state.isDisplayingVoteResults});
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
                     id={"Dilemma" + this.props.dilemmaNumber + "RadioBtn" + i} checked={(this.props.dilemma.error || i !== this.props.voteIndex) ? false : true}/>
              <span className={this.props.dilemma.error ? "radioImg unclickable" : "radioImg"} onClick={() => this.voteAction(i)}/>
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

export default Dilemma;