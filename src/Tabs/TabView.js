import React, { Component } from "react";
import Tabs from "./Tabs";
import TabsWrapper from "./TabsWrapper";
import styles from "./TabView.module.css"

export class TabView extends Component {
  constructor() {
    super();
    this.state = { currentTab: 0 };
    this.setTabIndex = this.setTabIndex.bind(this);
  }

  setTabIndex(index) {
    this.setState({
      currentTab: index,
    });
  }

  render() {
    return (
      <div className={styles.TabView}>
        {this.props.showControls ? (
          <Tabs
            activeIndex={this.state.currentTab}
            titles={["Tab1", "Tab2", "Tab3"]}
            onTabClicked={this.setTabIndex}
          />
        ) : null}
        <TabsWrapper activeIndex={this.state.currentTab}>
          {this.props.children}
        </TabsWrapper>
      </div>
    );
  }
}

export default TabView;
