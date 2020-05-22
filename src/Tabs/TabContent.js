import React, { Component } from "react";
import styles from "./TabContent.module.css";

export class TabContent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    if (this.myRef.current) this.myRef.current.scrollTop = 0;
    return (
      <div className={styles.TabContent} ref={this.myRef}>
        {this.props.children}
      </div>
    );
  }
}

export default TabContent;
