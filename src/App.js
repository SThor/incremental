import React, { Component } from "react";
import "./App.css";
import TabView from "./Tabs/TabView";
import TabContent from "./Tabs/TabContent";
import BattleComponent from "./BattleComponent";
import ContractsTab from "./Contracts/ContractsTab";
import Modal from "./Modal";
import StoryMode from "./StoryMode";

export class App extends Component {
  constructor() {
    super();
    this.state = this.recoverState();

    this.getDefaultState = this.getDefaultState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.storeState = this.storeState.bind(this);
    this.recoverState = this.recoverState.bind(this);
    this.setParagraph = this.setParagraph.bind(this);
    this.setChapter = this.setChapter.bind(this);
  }

  getDefaultState() {
    return Object.assign({}, {
      currentChapter: 0,
      currentParagraph: 0
    });
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.storeState);
    setInterval(this.storeState, 60000);
  }

  chapters = [
    {
      type: "story",
      title: "Prologue",
      failText: "The last thing you saw was the boar's tusk ramming in your leg before you fell uncounscious.",
      paragraphs: [
        {
          info: "",
          button: "Wake up",
          hideTitle: true
        },
        {
          info: "You see a unusually long and heavy sword lying next to you.",
          button: "Pick up the sword"
        },
        {
          info: "As you pick it up, you notice from the corner of your eye a wounded boar charging at you.",
          button: "Swing your sword at it",
          battle: {
            health: 10,
            time: 30
          }
        },
        {
          info: "After defeating the boar, you spot a hidden cave nearby that feels safe.",
          button: "Take refuge in the cave"
        },
        {
          info: "You found refuge in the cave.",
          button: "Drift into a deep slumber"
        },
        {
          info: "On waking up your body is still aching all over. You find a note thanking you for defeating the boar, along with a nice round coin.",
          button: "Read the note"
        }
      ]
    },
    {
      type: "adventure",
      title: "Beginning of an empire",
      contracts: [{ title: "thanks for the boar", contents: "thanks." },{ title: "thanks for the boar", contents: "thanks." }],
    }
  ];

  setParagraph(paragraph = (this.state.currentParagraph + 1)) {
    this.setState({
      currentParagraph: paragraph
    });
  }
  setChapter(chapter = (this.state.currentChapter + 1)) {
    this.setParagraph(0);
    this.setState({
      currentChapter: chapter
    });
  }

  resetState() {
    this.setState(this.getDefaultState());
  }
  storeState() {
    window.localStorage.setItem('state', JSON.stringify(this.state));
  }
  recoverState() {
    let savedState = window.localStorage.getItem('state');
    if (savedState === null) {
      return this.getDefaultState();
    } else {
      return JSON.parse(savedState);
    }
  }

  render() {
    let chapter = this.chapters[this.state.currentChapter];
    return (
      <div className="App">
        { chapter.type === "story" ? (
          <StoryMode onSetChapter={this.setChapter} onSetParagraph={this.setParagraph} currentParagraph={this.state.currentParagraph} story={chapter}></StoryMode>
        ) : (
          <>
          <h1>{chapter.title}</h1>
          <TabView showControls={true}>
            <ContractsTab
              contracts={chapter.contracts}
            ></ContractsTab>
            <TabContent>Your den</TabContent>
          </TabView>
          </>
        )}
      <button onClick={this.resetState} style={{ "fontSize": "x-small", "position": "absolute", "bottom": "0" }}>Reset state</button>
        <Modal active={false}><BattleComponent></BattleComponent></Modal>
      </div>
    );
  }
}

export default App;
