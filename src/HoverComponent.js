import React, { Component } from "react";
import styles from "./HoverComponent.module.css";

export class ProgressButton extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0, previousX: null };
    this.updateProgress = this.updateProgress.bind(this);
    this.elem = React.createRef();
  }

  updateProgress(event) {
    // Fetching HoverComponent bounding rectangle
    let rect = this.elem.current.getBoundingClientRect();

    // Detecting out of bound touches (triggered if touchstart in element but moves outside)
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        return;
    }

    // Zeroing x depending on component position
    let x = event.clientX - rect.left;
    // Normalizing x using element size
    // We want ~1 health = 1 sweep, multiplying by 1.08 to account for imperfections in the listeners/events
    let normalisedX = (x/this.elem.current.offsetWidth)*1.08;

    if (this.state.previousX === null) {
      this.setState({
        previousX: normalisedX
      });
      return;
    }

    let diff = Math.abs(normalisedX - this.state.previousX);
    this.setState({
      previousX: normalisedX
    });

    if (this.state.progress > 1) {
      this.props.onFinished();
    } else {
      this.setState({
        progress: this.state.progress + this.toFraction(diff),
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
      <div ref={this.elem} className={styles.hoverZone} style={style} onPointerMove={this.updateProgress}>
        {this.props.text}
      </div>
    );
  }
}

export default ProgressButton;
