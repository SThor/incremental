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
    this.endStory = this.endStory.bind(this);
    this.setChapter = this.setChapter.bind(this);
  }

  getDefaultState() {
    return Object.assign({}, {
      story: {chapter:0},
      currentTitle: this.stades[0].title,
    });
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.storeState);
    setInterval(this.storeState, 60000);
  }

  stades = [
    {
      title: "Prologue"
    },
    {
      title: "Beginning of an empire",
      contracts: [{ title: "thanks for the boar", contents: "thanks." },{ title: "thanks for the boar", contents: "thanks." }],
    },
  ];

  endStory() {
    this.setState({story:undefined});
  }
  setChapter(){
    this.setState({
      story: {chapter:this.state.story.chapter+1},
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
    return (
      <div className="App">
        {typeof this.state.story != "undefined" ? (
          <StoryMode onEndStory={this.endStory} story={this.state.story} onSetChapter={this.setChapter}></StoryMode>
        ) : (
          <>
          <h1>{this.state.currentTitle}</h1>
          <TabView showControls={true}>
            <ContractsTab
              contracts={this.stades[1].contracts}
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
