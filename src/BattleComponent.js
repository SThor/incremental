import React, { Component } from "react";
import styles from "./BattleComponent.module.css";
import TimerComponent from "./TimerComponent";
import HoverComponent from "./HoverComponent";

export class BattleComponent extends Component {
  constructor() {
    super();
    this.state = { progress: 0.0 };
  }

  render() {
    return (
      <div className={styles.battleComponent}>
        <HoverComponent style={{"flex-grow":1}} text={this.props.text} target={this.props.health} onFinished={this.props.onSuccess}/>
        <TimerComponent onFinished={this.props.onFail} target={this.props.time}/>
      </div>
    );
  }
}

export default BattleComponent;
