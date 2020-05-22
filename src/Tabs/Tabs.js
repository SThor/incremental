import React, { Component } from "react";
import Tab from "./Tab";
import styles from "./Tabs.module.css";

export class Tabs extends Component {
  constructor() {
    super();
    this.handleTabClicked = this.handleTabClicked.bind(this);
  }

  handleTabClicked(index) {
    this.props.onTabClicked(index);
  }

  render() {
    return (
      <div className={styles.Tabs}>
        <div className={styles.TabList}>
          {this.props.titles.map((title, i) => (
            <Tab
              key={title + i}
              title={title}
              index={i}
              onClicked={this.handleTabClicked}
              current={this.props.activeIndex === i}
            />
          ))}
        </div>
        <div
          className={styles.Underline}
          style={{
            width: 100 / this.props.titles.length + "%",
            transform: "translateX(" + 100 * this.props.activeIndex + "%)",
          }}
        />
      </div>
    );
  }
}

export default Tabs;
