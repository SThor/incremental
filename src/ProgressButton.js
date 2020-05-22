import React, { Component } from "react";
import styles from "./ProgressButton.module.css";

export class ProgressButton extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0 };
    this.onClick = this.onClick.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }

  onClick() {
    if (this.state.progress === 0.0) setTimeout(this.updateProgress, 50);
  }

  updateProgress() {
    if (this.state.progress > 1) {
      this.setState({
        progress: 0.0,
      });
      this.props.onFinished();
    } else {
      this.setState({
        progress: this.state.progress + 0.1,
      });
      setTimeout(this.updateProgress, 50);
    }
  }

  render() {
    let style ={
        background:`linear-gradient(to right, #51b7e6 0%, #51b7e6 ${this.state.progress * 100}%, transparent ${this.state.progress * 100}%, transparent 100%)`
    }

    return (
      <button className={styles.button} onClick={this.onClick} style={style}>
        {this.props.text}
      </button>
    );
  }
}

export default ProgressButton;
