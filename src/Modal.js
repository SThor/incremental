import React, { Component } from "react";
import styles from "./Modal.module.css";

export class Modal extends Component {
  render() {
    return (
      <div className={`${styles.Modal} ${this.props.active?styles.Active:""}`}>
        <div className={styles.ModalContent}>
          {/* <span className={styles.ModalClose}>&times;</span> */}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
