import React, { Component } from "react";
import styles from "./BattleComponent.module.css";
import TimerComponent from "./TimerComponent";
import HoverComponent from "./HoverComponent";

export class BattleComponent extends Component {
  constructor() {
    super();
    this.state = { alreadyFinished: false };
    this.onFinished = this.onFinished.bind(this);
  }

  onFinished(callable) {
    if (!this.state.alreadyFinished) {
      this.setState({alreadyFinished: true});
      callable();
    }
  }

  render() {
    let health = this.props.health ? this.props.health : 10;
    let time = this.props.time ? this.props.time : 30;
    return (
      <div className={styles.battleComponent}>
        <HoverComponent style={{"flex-grow":1}} text={this.props.text} target={health} onFinished={()=>{this.onFinished(this.props.onSuccess)}}/>
        <TimerComponent text={this.props.textEnnemy} onFinished={()=>{this.onFinished(this.props.onFail)}} target={time}/>
      </div>
    );
  }
}

export default BattleComponent;
