import React, { Component } from "react";
import styles from "./TabsWrapper.module.css";
import TabSubWrapper from "./TabSubWrapper";

export class TabsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, translate: 0 };
  }

  getWidth() {
    return window.innerWidth;
  }

  render() {
    return (
      <div className={styles.TabsWrapper}>
        <TabSubWrapper
          translate={this.props.activeIndex * this.getWidth()}
          width={this.getWidth()}
        >
          {this.props.children}
        </TabSubWrapper>
      </div>
    );
  }
}

export default TabsWrapper;
