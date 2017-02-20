import React from 'react';

class Modal extends React.Component {
  render() {
    if(this.props.isOpen === false)
      return null;
    
    return (
      <div>
        <div className={this.props.className}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop &&
        <div className={this.props.backdropClassName} onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault();

    if(this.props.onClose) {
      this.props.onClose()
    }
  }
}

export default Modal;