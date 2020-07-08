import React, { Component } from "react";
import "./App.css";
import ProgressButton from "./ProgressButton";
import TabView from "./Tabs/TabView";
import TabContent from "./Tabs/TabContent";
import BattleComponent from "./BattleComponent";
import ContractsTab from "./Contracts/ContractsTab";
import Modal from "./Modal";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      currentStade: 0,
      currentTitle: this.stades[0].title,
      currentButtonText: this.stades[0].buttonText[0],
      currentInfoText: this.stades[0].infoText[0],
      currentSubStade: 0,
      combatInProgress: true,
    };
    this.onMainButton = this.onMainButton.bind(this);
    this.onFail = this.onFail.bind(this);
    this.skipPrologue = this.skipPrologue.bind(this);
  }

  stades = [
    {
      title: "Prologue",
      buttonText: [
        "Wake up",
        "Pick up the sword",
        "Swing your sword at it",
        "Take refuge in the cave",
        "Drift into a deep slumber",
        "Read the note",
      ],
      infoText: [
        "",
        "You see a unusually long and heavy sword lying next to you.",
        "As you pick it up, you notice from the corner of your eye a wounded boar charging at you.",
        "After defeating the boar, you spot a hidden cave nearby that feels safe.",
        "You found refuge in the cave.",
        "On waking up your body is still aching all over. You find a note thanking you for defeating the boar, along with a nice round coin.",
      ],
      initStade: () => {
        this.stades[0].setSubStade(0);
      },
      setSubStade: (index) => {
        if (index >= this.stades[this.state.currentStade].buttonText.length) {
          this.setStade(1);
        } else {
          console.log("setting substade to", index);
          this.setState({
            currentSubStade: index,
            currentButtonText: this.stades[this.state.currentStade].buttonText[
              index
            ],
            currentInfoText: this.stades[this.state.currentStade].infoText[
              index
            ],
          });
        }
      },
    },
    {
      title: "Beginning of an empire",
      initStade: () => {},
      contracts: [{ title: "thanks for the boar", contents: "thanks." },{ title: "thanks for the boar", contents: "thanks." }],
    },
  ];

  setStade(index) {
    index = Math.min(index, this.stades.length - 1);
    console.log("setting stade to", index);
    this.setState({
      currentStade: index,
      currentTitle: this.stades[index].title,
    });
    this.stades[index].initStade();
  }

  onMainButton() {
    if (this.state.currentStade === 0) {
      this.stades[0].setSubStade(this.state.currentSubStade + 1);
    } else {
      this.setStade(this.state.currentStade + 1);
    }
  }

  onFail() {
    this.setStade(0);
    this.setState({
      currentInfoText:
        "The last thing you saw was the boar's tusk ramming in your leg before you fell uncounscious.",
    });
  }

  skipPrologue() {
    this.setStade(1);
  }

  render() {
    return (
      <div className="App">
        {this.state.currentStade !== 0 || this.state.currentSubStade !== 0 ? (
          <h1>{this.state.currentTitle}</h1>
        ) : 
        (<button onClick={this.skipPrologue} style={{ "font-size": "x-small" }}>
          Skip prologue
        </button>)}
        {this.state.currentStade === 0 ? (
          <TabContent>
            <p>{this.state.currentInfoText}</p>
            {this.state.currentStade === 0 &&
            this.state.currentSubStade === 2 ? (
              <BattleComponent
                text={this.state.currentButtonText}
                onSuccess={this.onMainButton}
                onFail={this.onFail}
                health={10}
                time={30}
              />
            ) : (
              <ProgressButton
                text={this.state.currentButtonText}
                onFinished={this.onMainButton}
              />
            )}
          </TabContent>
        ) : (
          <TabView showControls={this.state.currentStade > 0}>
            <ContractsTab
              contracts={this.stades[this.state.currentStade].contracts}
            ></ContractsTab>
            <TabContent>Your den</TabContent>
          </TabView>
        )}
        <Modal active={this.state.currentStade > 0}><BattleComponent></BattleComponent></Modal>
      </div>
    );
  }
}

export default App;
