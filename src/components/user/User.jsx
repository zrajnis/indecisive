import React, {Component, PropTypes} from 'react';
import NavBar from './NavBar.jsx';
import Dilemma from '../Dilemma.jsx';
const {connect} = require('react-redux');
import {loadDilemmas, addNewVote, changeVote, removeVote, removeDilemmaError, searchDilemma} from '../../actions/Dilemmas';
import {logout} from '../../actions/Logout';

class User extends Component {
  componentDidMount() {
    let tabName = window.location.href.split('/');

    tabName = tabName[tabName.length -1];
    if(tabName !== 'user' && tabName !== 'search') {
      this.props.dispatch(loadDilemmas(tabName));
    }
    else if(tabName === 'user') {
      this.props.dispatch(loadDilemmas('home'));
    }
    else {
      this.props.dispatch(searchDilemma());
    }
  }

  load(tabName) {
    this.props.dispatch(loadDilemmas(tabName));
  }

  search() {
    this.props.dispatch(searchDilemma());
  }

  logout() {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <div id="container">
        <NavBar load={(tabName) => this.load(tabName)} search={() => this.search()} logout={() => this.logout()}
          error={this.props.logoutError}/>
        {this.props.dilemmas ?
          this.props.dilemmas.map((dilemma, index) =>
            <Dilemma dilemma={dilemma} key={index} dilemmaNumber={index}
              voteIndex={this.props.votes[index].voteIndex}
              addNewVote={(index, id) => this.props.dispatch(addNewVote(index, id))}
              changeVote={(oldIndex, newIndex, id) => this.props.dispatch(changeVote(oldIndex, newIndex, id))}
              removeVote={(index, id) => this.props.dispatch(removeVote(index, id))}
              removeDilemmaError={(id) => this.props.dispatch(removeDilemmaError(id))}/>)
          :
          <div className="errorMsg">{this.props.error}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if(state.Dilemmas !== null && state.Dilemmas.data) {
    return {
      dilemmas: state.Dilemmas.data,
      votes: state.Dilemmas.votes ? state.Dilemmas.votes : [],
      logoutError: state.Logout ? state.Logout.error : ''
    };
  }
  else if(state.Dilemmas !== null && state.Dilemmas.error) {
    return {
      error: state.Dilemmas.error,
      logoutError: state.Logout ? state.Logout.error : ''
    };
  }
  else {
    return {};
  }
};

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dilemmas: PropTypes.array,
  votes: PropTypes.array,
  logoutError: PropTypes.string,
  error: PropTypes.string
};

export default connect(mapStateToProps)(User);
