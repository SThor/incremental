import React, { Component } from "react";
import styles from "./Tab.module.css";

export class Tab extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClicked(this.props.index);
  }
  render() {
    return (
      <button
        className={this.props.current ? styles.TabCurrent : styles.Tab}
        onClick={this.handleClick}
      >
        {this.props.title}
      </button>
    );
  }
}

export default Tab;
