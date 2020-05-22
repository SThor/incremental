import React, { Component } from "react";
import styles from "./TabSubWrapper.module.css";

export class TabSubWrapper extends Component {
  render() {
    return (
      <div
        className={styles.TabSubWrapper}
        style={{
          width: this.props.width,
          transform: "translateX(" + -this.props.translate + "px)",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default TabSubWrapper;
