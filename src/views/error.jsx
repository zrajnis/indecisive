const React = require('react');

class Error extends React.Component {
  render() {
    return (
      <html>
      <head><title>Error</title></head>
      <body>Something bad happened!</body>
      </html>
    );
  }
}

module.exports = Error;