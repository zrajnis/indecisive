const React = require('react');
const DefaultLayout = require('./layout.jsx');
const Container = require('./components/Container.jsx');

class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
       <Container/>

      </DefaultLayout>
    );
  }
}

module.exports = HelloMessage;