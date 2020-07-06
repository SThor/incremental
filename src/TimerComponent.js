import React, { Component } from "react";
import styles from "./TimerComponent.module.css";

export class TimerComponent extends Component {
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
        progress: this.state.progress + this.step,
      });
      this.timer = setTimeout(this.updateProgress, 50);
    }
  }

  componentDidMount() {
    // Times 20 because we use 50ms increments and we want target to be seconds
    this.step = 1 / (this.props.target*20);
    this.setState({
      progress: this.state.progress + this.step,
    });
    this.timer = setTimeout(this.updateProgress, 50);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    let style = {
      background: `linear-gradient(to top, #bb0000 0%, #bb0000 ${
        this.state.progress * 100
      }%, transparent ${this.state.progress * 100}%, transparent 100%)`,
    };

    return (
      <div className={styles.timerComponent} style={style}>
        {this.props.text}
      </div>
    );
  }
}

export default TimerComponent;
