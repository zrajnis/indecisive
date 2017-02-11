import React from 'react';

class SignUp extends React.Component {
  render() {
    if (this.props.isOpen === false)
      return null;

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '448px',
      height: '298px',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#eddbcd',
      border: '1px solid #c06014'
    };

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.6)'
    };

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop &&
        <div className={this.props.backdropClassName} style={backdropStyle}
             onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}


export default SignUp;