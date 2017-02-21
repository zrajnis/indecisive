import React from 'react';

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
      document.getElementById('radioBtn' + index).checked = false;
      alert('should dispatch action to remove vote');
    }
    else {
      if(this.state.answerVoted !== -1) {
        alert(' should dispatch action to remove the old vote');
      }
      this.state.answerVoted = index;
      document.getElementById('radioBtn' + index).checked = true;
      alert('should dispatch action to vote the option');
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
              <input type="radio" name="upvote" className="upvoteRadio" id={"radioBtn" + i}/>
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
      </div>
    );
  }
}

export default Dilemma;