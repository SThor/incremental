import React, { Component } from "react";
import "./App.css";
import ProgressButton from "./ProgressButton";
import HoverComponent from "./HoverComponent";
import TabView from "./Tabs/TabView";
import TabContent from "./Tabs/TabContent";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      currentStade: 0,
      currentTitle: this.stades[0].title,
      currentButtonText: this.stades[0].buttonText[0],
      currentInfoText: this.stades[0].infoText[0],
      currentSubStade: 0,
    };
    this.onMainButton = this.onMainButton.bind(this);
  }

  stades = [
    {
      title: "Introduction",
      buttonText: [
        "Wake up",
        "Pick up the sword",
        "Swing your sword at it",
        "Take refuge in the cave",
        "Heal",
      ],
      infoText: [
        "",
        "You see a unusually long and heavy sword lying next to you.",
        "As you pick it up, you notice from the corner of your eye a wounded boar charging at you.",
        "After defeating the boar, you spot a hidden cave nearby that feels safe.",
        "You found refuge in the cave.",
      ],
    },
  ];

  setStade(index) {
    index = Math.min(index, this.stades.length - 1);
    console.log("setting stade to", index);
    this.setState({
      currentStade: index,
      currentTitle: this.stades[index].title,
    });
    this.setSubStade(0);
  }

  setSubStade(index) {
    index = Math.min(
      index,
      this.stades[this.state.currentStade].buttonText.length - 1
    );
    console.log("setting substade to", index);
    this.setState({
      currentSubStade: index,
      currentButtonText: this.stades[this.state.currentStade].buttonText[index],
      currentInfoText: this.stades[this.state.currentStade].infoText[index],
    });
  }

  onMainButton() {
    if (this.state.currentStade === 0) {
      this.setSubStade(this.state.currentSubStade + 1);
    } else {
      this.setStade(this.state.currentStade + 1);
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.currentStade !== 0 || this.state.currentSubStade !== 0 ? (
          <h1>{this.state.currentTitle}</h1>
        ) : null}
        <TabView showControls={this.state.currentStade > 0}>
          <TabContent>
            <p>{this.state.currentInfoText}</p>
            {this.state.currentStade === 0 && this.state.currentSubStade === 2 ? (
              <HoverComponent
                text={this.state.currentButtonText}
                onFinished={this.onMainButton}
                target={5000}
              />
            ) : (
              <ProgressButton
                text={this.state.currentButtonText}
                onFinished={this.onMainButton}
              />
            )}
          </TabContent>
          <TabContent>Test</TabContent>
          <TabContent>Retest</TabContent>
        </TabView>
      </div>
    );
  }
}

export default App;
