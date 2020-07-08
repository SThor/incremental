import React, { Component } from "react";
import styles from "./TimerComponent.module.css";

export class TimerComponent extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0 };
    this.updateProgress = this.updateProgress.bind(this);
  }

  updateProgress() {
    let now = Date.now();
    let diff = now - this.start;
    this.setState({
      progress: (diff / (this.props.target*1000)),
    });
    if (this.state.progress > 1) {
      this.props.onFinished();
    }
  }

  componentDidMount() {
    this.start = Date.now();
    this.target = this.start + (this.props.target*1000);
    this.interval = setInterval(this.updateProgress, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
