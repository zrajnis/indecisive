import React from 'react';
import NavBar from './NavBar.jsx';
import Dilemma from '../Dilemma.jsx';
const {connect} = require('react-redux');
import {loadDilemmas, addNewVote, changeVote, removeVote} from '../../actions/Dilemmas';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(loadDilemmas());
  }

  render() {
    return (
      <div id="container">
        <NavBar/>
        {(this.props.dilemmas) ?
          this.props.dilemmas.map( (dilemma, index)=>
            <Dilemma dilemma={dilemma} key={index} dilemmaNumber={index}
               addNewVote={(index, id) => this.props.dispatch(addNewVote(index, id))}
               changeVote={(oldIndex, newIndex, id) => this.props.dispatch(changeVote(oldIndex, newIndex, id))}
               removeVote={(index, id) => this.props.dispatch(removeVote(index, id))} />)
          :
          <div className="errorMsg">{this.props.error} </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  if(state.Dilemmas !== null && state.Dilemmas.data) {
    return {
      dilemmas: state.Dilemmas.data
    };
  }
  else if(state.Dilemmas !== null && state.Dilemmas.error){
    return {
      error: state.Dilemmas.error
    }
  }
  else {
    return {}
  }
};


export default connect(mapStateToProps)(User);