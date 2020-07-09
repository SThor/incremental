import React, { Component } from "react";
import TabContent from "../Tabs/TabContent";
import styles from "./ContractsTab.module.css";

export class ContractsTab extends Component {
  render() {
    return (
      <TabContent>
        <div className={styles.Contracts}>
          {this.props.contracts.map((contract, i) => (
            <div key={contract + i} className={styles.Contract}>
              <h3>{contract.title}</h3>
              <p>{contract.contents}</p>
              <button
                className={styles.StartButton}
                onClick={() => {
                  this.props.onStartContract(contract);
                }}
              >
                Start contract
              </button>
            </div>
          ))}
        </div>
      </TabContent>
    );
  }
}

export default ContractsTab;
