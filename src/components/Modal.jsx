import React, {Component, PropTypes} from 'react';

class Modal extends Component {
  render() {
    if(this.props.isOpen === false) {
      return null;
    }
    else {
      document.getElementById('container').className = 'noScroll'; //remove scroll bar on the background if any modal is active
    }
    
    return (
      <div>
        <div className={this.props.className}>
          {this.props.children}
        </div>
        {!this.props.noBackdrop &&
        <div className={this.props.backdropClassName} onClick={e => this.close(e)}/>}
      </div>
    );
  }

  close(e) {
    e.preventDefault();

    if(this.props.onClose) {
      this.props.onClose();
    }
  }
}

Modal.propTypes = {
  className: PropTypes.string.isRequired,
  backdropClassName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
