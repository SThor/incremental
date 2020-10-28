import React, { Component } from "react";
import "./App.css";
import TabView from "./Tabs/TabView";
import TabContent from "./Tabs/TabContent";
import BattleComponent from "./BattleComponent";
import ContractsTab from "./Contracts/ContractsTab";
import Modal from "./Modal";
import StoryMode from "./StoryMode";

import chapters from "./gameContent.js";

export class App extends Component {
  constructor() {
    super();
    this.state = this.recoverState();

    this.getDefaultState = this.getDefaultState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.storeState = this.storeState.bind(this);
    this.recoverState = this.recoverState.bind(this);
    this.onMainButton = this.onMainButton.bind(this);
    this.availableContracts = this.availableContracts.bind(this);
    this.startContract = this.startContract.bind(this);
    this.onContractSuccess = this.onContractSuccess.bind(this);
    this.onContractFail = this.onContractFail.bind(this);
    this.setParagraph = this.setParagraph.bind(this);
    this.setChapter = this.setChapter.bind(this);
  }

  getDefaultState() {
    return Object.assign(
      {},
      {
        currentStade: 0,
        combatInProgress: false,
        currentContract: {},
        finishedContracts: [],
      }
    );
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.storeState);
    setInterval(this.storeState, 60000);
  }

  availableContracts(stage) {
    return chapters.contracts.filter((contract) => {return contract.stage <= stage && !this.state.finishedContracts.includes(contract.id)});
  }

  startContract(contract) {
    this.setState({
      contractInProgress: true,
      currentContract: contract,
    });
  }
  onContractSuccess() {
    let newFinishedContracts = this.state.finishedContracts;
    newFinishedContracts.push(this.state.currentContract.id)
    this.setState({
      contractInProgress: false,
      currentContract: {},
      finishedContracts: newFinishedContracts
    });
  }
  onContractFail() {
    let infoText = this.state.currentContract.fail;
    this.setState({
      contractInProgress: false,
      currentContract: {},
      currentInfoText: infoText,
    });
  }

  setParagraph(paragraph = (this.state.currentParagraph + 1)) {
    this.setState({
      currentParagraph: paragraph
    });
  }
  setChapter(chapter = (this.state.currentChapter + 1)) {
    this.setParagraph(0);
    this.setState({
      contractInProgress:false,
      currentChapter: chapter
    });
  }

  resetState() {
    this.setState(this.getDefaultState());
  }
  storeState() {
    window.localStorage.setItem("state", JSON.stringify(this.state));
  }
  recoverState() {
    let savedState = window.localStorage.getItem("state");
    if (savedState === null) {
      return this.getDefaultState();
    } else {
      return JSON.parse(savedState);
    }
  }

  render() {
    let chapter = chapters[this.state.currentChapter];
    return (
      <div className="App">
        { chapter.type === "story" ? (
          <StoryMode onSetChapter={this.setChapter} onSetParagraph={this.setParagraph} currentParagraph={this.state.currentParagraph} story={chapter}></StoryMode>
        ) : (
          <>
          <h1>{chapter.title}</h1>
          <TabView showControls={true}>
            <ContractsTab
              contracts={this.availableContracts(this.state.currentStade)}
              onStartContract={this.startContract}
            ></ContractsTab>
            <TabContent>Your den</TabContent>
          </TabView>
          </>
        )}
        <button
          onClick={this.resetState}
          style={{ fontSize: "x-small", position: "absolute", bottom: "0" }}
        >
          Reset state
        </button>
        <Modal active={this.state.contractInProgress}>
          <h1>{this.state.currentContract.title}</h1>
          <BattleComponent
            textEnnemy={this.state.currentContract.ennemy}
            onSuccess={this.onContractSuccess}
            onFail={this.onContractFail}
            health={this.state.currentContract.health}
            time={this.state.currentContract.time}
          ></BattleComponent>
        </Modal>
      </div>
    );
  }
}

export default App;
