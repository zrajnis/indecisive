import React from 'react';

class SettingsField extends React.Component {
  render() {
    return (
      <div className="inputWrapper">
        <input type={this.props.type} id={this.props.id}  className="settingsInput"/>
        <button type="button" className="changeBtn" onClick={() =>
        this.props.changeData(this.props.type,this.props.id)}>Change</button>
        <div className="error">{this.props.errorMsg}</div>
      </div>
    );
  }
}

export default SettingsField;