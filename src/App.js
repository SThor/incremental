import React, { Component } from "react";
import "./App.css";
import ProgressButton from "./ProgressButton";
import TabView from "./Tabs/TabView";
import TabContent from "./Tabs/TabContent";

export class App extends Component {
  constructor() {
    super();
    this.state = { stade: 0};
    this.onWakeUp = this.onWakeUp.bind(this);
  }

  onWakeUp() {
    this.setState({
      stade: 1,
    });
  }

  render() {
    return (
      <div className="App">
        <TabView>
          <TabContent><ProgressButton
            text={this.state.stade === 0 ? "Wake up" : "Breathe"}
            onFinished={this.onWakeUp}
          /></TabContent>
          <TabContent>Test</TabContent>
          <TabContent>Retest</TabContent>
        </TabView>
      </div>
    );
  }
}

export default App;
