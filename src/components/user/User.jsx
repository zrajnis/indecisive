import React from 'react';
import NavBar from './NavBar.jsx';
import Dilemma from '../Dilemma.jsx';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dilemma:{
        title: 'First dilemma12 First dilemma12 First dilemma12 First dilemma12!',
        description: 'My description mate!My description mate!My description mate!My description mate!' +
        'My description mate!My description mate!My description mate!My description mate!My description mate!' +
        'My description mate!My description mate!My description mate! My description mate!My description mate!My description mate!My description mate!' +
        'My description mate!My description mate!',
        answers: ['First dilemma12 First dilemma12 First dilemma12 First dilemma12!', 'First dilemma12 First dilemma12 First dilemma12 First dilemma12!', 'First dilemma12 First dilemma12 First dilemma12 First dilemma12!', 'First dilemma12 First dilemma12 First dilemma12 First dilemma12!', 'First dilemma12 First dilemma12 First dilemma12 First dilemma12!'],
        answerVotes: [500, 4, 3, 2, 1 ],
        timestamp: '21/02/2017, 14:17:15 PM',
        author: 'MikeLitoris1234'
      }
    }
  }
  
  render() {
    return (
      <div id="container">
        <NavBar/>
        <Dilemma dilemma={this.state.dilemma}/>
      </div>
    );
  }
}

export default User;