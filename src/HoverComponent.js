import React, { Component } from "react";
import styles from "./HoverComponent.module.css";

export class ProgressButton extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0, previousTouch: null };
    this.updateProgress = this.updateProgress.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleMouse(event) {
    this.updateProgress(Math.abs(event.movementX));
    event.preventDefault();
  }

  handleTouch(event) {
    if (this.state.previousTouch == null) {
      this.setState({
        previousTouch: event.touches[0].clientX
      });
      return;
    }
    let movementValue = Math.abs(event.touches[0].clientX - this.state.previousTouch);
    this.updateProgress(movementValue);
    this.setState({
      previousTouch: event.touches[0].clientX
    });
    event.preventDefault();
  }

  updateProgress(movementValue) {
    if (this.state.progress > 1) {
      this.setState({
        progress: 0.0,
      });
      this.props.onFinished();
    } else {
      this.setState({
        progress: this.state.progress + this.toFraction(movementValue),
      });
    }
  }

  toFraction(value){
    return Math.min(value/this.props.target,1.0)
  }

  render() {
    let style ={
        background:`linear-gradient(to top, #51b7e6 0%, #51b7e6 ${this.state.progress * 100}%, transparent ${this.state.progress * 100}%, transparent 100%)`
    };

    return (
      <div className={styles.hoverZone} style={style} onMouseMove={this.handleMouse} onTouchMove={this.handleTouch}>
        {this.props.text}
      </div>
    );
  }
}

export default ProgressButton;
