import React, { Component } from "react";
import ProgressButton from "./ProgressButton";
import TabContent from "./Tabs/TabContent";
import BattleComponent from "./BattleComponent";

export class StoryMode extends Component {
  constructor() {
    super();

    this.onMainButton = this.onMainButton.bind(this);
    this.onFail = this.onFail.bind(this);
  }

  onMainButton() {
    if (this.props.currentParagraph >= this.props.story.paragraphs.length-1){
      this.props.onSetChapter();
    } else {
      this.props.onSetParagraph();
    }
  }

  onFail() {
    this.props.story.paragraphs[0].info = this.props.story.failText;
    this.props.onSetParagraph(0);
  }

  render() {
    let paragraph = this.props.story.paragraphs[this.props.currentParagraph];

    let title;
    if (this.props.story.hideTitle) {
      title = (<h1>{this.props.story.title}</h1>);
    }
    let skipButton;
    if (this.props.currentParagraph === 0) {
      skipButton = (<button onClick={()=>{this.props.onSetChapter()}} style={{ fontSize: "x-small" }}>
        Skip story
      </button>);
    }
    return (
      <>
        {skipButton}
        {title}

        <TabContent>
          <p>{paragraph.info}</p>
          {typeof paragraph.battle !== 'undefined' ? (
            <BattleComponent
              key={this.props.currentParagraph}
              text={paragraph.button}
              onSuccess={this.onMainButton}
              onFail={this.onFail}
              health={paragraph.battle.health}
              time={paragraph.battle.time}
            />
          ) : (
            <ProgressButton
              text={paragraph.button}
              onFinished={this.onMainButton}
            />
          )}
        </TabContent>
      </>
    );
  }
}

export default StoryMode;
