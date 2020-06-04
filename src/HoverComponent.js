import React, { Component } from "react";
import styles from "./HoverComponent.module.css";

export class ProgressButton extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0 };
    this.updateProgress = this.updateProgress.bind(this);
  }

  updateProgress(event) {
    console.log(Math.abs(event.movementX))
    if (this.state.progress > 1) {
      this.setState({
        progress: 0.0,
      });
      this.props.onFinished();
    } else {
      this.setState({
        progress: this.state.progress + this.toFraction(Math.abs(event.movementX)),
      });
    }
    event.preventDefault();
  }

  toFraction(value){
    return Math.min(value/this.props.target,1.0)
  }

  render() {
    let style ={
        background:`linear-gradient(to top, #51b7e6 0%, #51b7e6 ${this.state.progress * 100}%, transparent ${this.state.progress * 100}%, transparent 100%)`
    }

    return (
      <button className={styles.hoverZone} style={style} onMouseMove={this.updateProgress} onTouchMove={this.updateProgress}>
        {this.props.text}
      </button>
    );
  }
}

export default ProgressButton;
