import React, {Component, PropTypes} from 'react';

class SettingsField extends Component {
  render() {
    return (
      <div className="inputWrapper">
        <input type={this.props.type} id={this.props.id}  className="settingsInput"/>
        <button type="button" className={this.props.successMsg ? 'changeBtn successMsgBtn' : 'changeBtn'} onClick={() =>
          this.props.changeData(this.props.type, this.props.id)}>
          {this.props.successMsg ? this.props.successMsg : 'Change'}
        </button>
        <div className="error">{this.props.errorMsg}</div>
      </div>
    );
  }
}

SettingsField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  changeData: PropTypes.func.isRequired,
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string
};

export default SettingsField;
