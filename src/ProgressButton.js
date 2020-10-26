import React, { Component } from "react";
import styles from "./ProgressButton.module.css";

export class ProgressButton extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0 };
    this.onClick = this.onClick.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.progressIncrement = 0.1;
  }

  onClick() {
    this.progressIncrement = (this.props.failedState ? 0.03 : 0.1);
    if (this.state.progress === 0.0) this.timer = setTimeout(this.updateProgress, 50);
  }

  updateProgress() {
    if (this.state.progress > 1) {
      this.setState({
        progress: 0.0,
      });
      this.props.onFinished();
    } else {
      this.setState({
        progress: this.state.progress + this.progressIncrement,
      });
      this.timer = setTimeout(this.updateProgress, 50);
    }
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  render() {
    const colour = this.props.failedState ? '--failed-color' : '--normal-color';
    const style ={
        background:`linear-gradient(to right, var(${colour}) 0%, var(${colour}) ${this.state.progress * 100}%, transparent ${this.state.progress * 100}%, transparent 100%)`
    }

    return (
      <button className={styles.button + ' ' + (this.props.failedState ? styles.failed : '')} onClick={this.onClick} style={style}>
        {this.props.text}
      </button>
    );
  }
}

export default ProgressButton;
