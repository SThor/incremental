import React, { Component } from "react";
import ProgressButton from "./ProgressButton";
import TabContent from "./Tabs/TabContent";
import BattleComponent from "./BattleComponent";

export class StoryMode extends Component {
  constructor() {
    super();
    this.state = this.recoverState();

    this.onMainButton = this.onMainButton.bind(this);
    this.onFail = this.onFail.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.storeState = this.storeState.bind(this);
    this.recoverState = this.recoverState.bind(this);
    this.setChapter = this.setChapter.bind(this);
  }

  getDefaultState() {
    return Object.assign(
      {},
      {
        currentButtonText: this.content.buttonText[0],
        currentInfoText: this.content.infoText[0],
      }
    );
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.storeState);
    setInterval(this.storeState, 60000);
  }

  resetState() {
    this.setState(this.getDefaultState());
  }
  storeState() {
    window.localStorage.setItem("state_prologue", JSON.stringify(this.state));
  }
  recoverState() {
    let savedState = window.localStorage.getItem("state_prologue");
    if (savedState === null) {
      return this.getDefaultState();
    } else {
      return JSON.parse(savedState);
    }
  }

  content = {
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
    initStade: () => {},
  };

  setChapter(index) {
    if (index >= this.content.buttonText.length) {
      this.props.onEndStory();
    } else {
      console.log("setting substade to", index);
      this.props.onSetChapter(index);
    }
  }

  onMainButton() {
    this.setChapter(this.props.story.chapter + 1);
  }

  onFail() {
    this.content.infoText[0] = "The last thing you saw was the boar's tusk ramming in your leg before you fell uncounscious.";
    this.setChapter(0);
  }

  render() {
    return (
      <div>
        {this.props.story.chapter > 0 ? (
          <h1>Prologue</h1>
        ) : (
          <button onClick={this.props.onEndStory} style={{ fontSize: "x-small" }}>
            Skip prologue
          </button>
        )}
        <TabContent>
          <p>{this.content.infoText[this.props.story.chapter]}</p>
          {this.props.story.chapter === 2 ? (
            <BattleComponent
              text={this.content.buttonText[this.props.story.chapter]}
              onSuccess={this.onMainButton}
              onFail={this.onFail}
              health={10}
              time={30}
            />
          ) : (
            <ProgressButton
              text={this.content.buttonText[this.props.story.chapter]}
              onFinished={this.onMainButton}
            />
          )}
        </TabContent>
      </div>
    );
  }
}

export default StoryMode;
