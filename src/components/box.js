import React, { Component } from "react";
class Box extends Component {
  render() {
    return (
      <div className="box">
        <div className="box-title">
          <div className="title_name">{this.props.title}</div>
        </div>
        <div className="box-content">{this.props.children}</div>
      </div>
    );
  }
}
export default Box;
