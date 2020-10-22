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
    this.state = this.recoverState();

    this.onMainButton = this.onMainButton.bind(this);
    this.onFail = this.onFail.bind(this);
    this.skipPrologue = this.skipPrologue.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.storeState = this.storeState.bind(this);
    this.recoverState = this.recoverState.bind(this);
    this.onMainButton = this.onMainButton.bind(this);
    this.availableContracts = this.availableContracts.bind(this);
    this.startContract = this.startContract.bind(this);
    this.onContractSuccess = this.onContractSuccess.bind(this);
    this.onContractFail = this.onContractFail.bind(this);
  }

  getDefaultState() {
    return Object.assign(
      {},
      {
        currentStade: 0,
        currentTitle: this.stades[0].title,
        currentButtonText: this.stades[0].buttonText[0],
        currentInfoText: this.stades[0].infoText[0],
        currentSubStade: 0,
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
        "On waking up your body is still aching all over. You are lying on a makeshift bed made of ferns and twigs, and some kind of ointment has been spread on your wounds. You find a note by your side.",
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
    },
  ];

  contracts = [
    {
      id: 1,
      title: "Thanks for the boar",
      note: {
        author: "Thomas, the innkeeper",
        contents: "Hey there, thanks for taking care of that boar. You managed to kill it, but looking at you I can tell it didn't give up easy. I guess thanks to all those wars no one has time to get rid of them before they get that big. I found the boar in a nearby clearing and then you in here. I am a bit weary of strangers during this troubled times, but I couldn't leave you by yourself. I patched you up and stayed by your side until I saw you would recover and got back to my inn. I took the boar in payment. Anyway, if you find some other boar that you can handle, feel free to take care of them and soon enough you'll have enough coin to turn this cave into something a bit more pleasant.",
      },
      ennemy: "A pack of wild piglets",
      fail: "The pack of piglet trampled your body then disappeared in bushes. You managed to crawl back to your den.",
      stage: 1,
      health: 10,
      time: 30,
    },
    {
      id: 2,
      title: "thanks for the boar2",
      note: {
        author: "The Innkeeper",
        contents: "thanks.",
      },
      ennemy: "test",
      stage: 2,
      health: 10,
      time: 30,
    },
    {
      id: 3,
      title: "thanks for the boar3",
      note: {
        contents: "thanks.",
        author: "Gérald, the berserker",
      },
      ennemy: "test",
      stage: 2,
      health: 10,
      time: 30,
    },
  ];

  availableContracts(stage) {
    return this.contracts.filter((contract) => {return contract.stage <= stage && !this.state.finishedContracts.includes(contract.id)});
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
      contractInProgress:false,
      currentInfoText:
        "The last thing you saw was the boar's tusk ramming in your leg before you fell uncounscious.",
    });
  }

  skipPrologue() {
    this.setStade(1);
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
    return (
      <div className="App">
        {this.state.currentStade !== 0 || this.state.currentSubStade !== 0 ? (
          <h1>{this.state.currentTitle}</h1>
        ) : (
          <button onClick={this.skipPrologue} style={{ fontSize: "x-small" }}>
            Skip prologue
          </button>
        )}
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
              contracts={this.availableContracts(this.state.currentStade)}
              onStartContract={this.startContract}
            ></ContractsTab>
            <TabContent>Your den</TabContent>
          </TabView>
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
