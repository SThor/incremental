import React, { Component } from "react";
import TabContent from "../Tabs/TabContent";

export class ContractsTab extends Component {
  render() {
    return (
      <TabContent>
        {this.props.contracts.map((contract,i) => (
          <div key={contract+i}>
            <h3>{contract.title}</h3>
            <p>{contract.contents}</p>
          </div>
        ))}
      </TabContent>
    );
  }
}

export default ContractsTab;
