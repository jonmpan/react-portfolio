import React, { Component } from "react";
import styles from "./styles.css";

class Privacy extends Component {
  state = { copySuccess: "", copySuccess2: "" };

  componentWillMount() {}
  componentDidMount() {}

  copyToClipboard = e => {
    this.textArea.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: "Copied!" });
  };
  copyToClipboard2 = e => {
    this.textArea2.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess2: "Copied!" });
  };

  render() {
    return (
      <div className="skitContainer">
        <form>
          <textarea
            ref={textarea => (this.textArea = textarea)}
            value="<Skit><Name>Knock Knock<Stephanie>Knock Knock<John>Who's there?<Stephanie>Moo moo<John>Moo moo who?<Stephanie>Make up your mind! Are you a cow or an owl?</Skit>"
          />
          {document.queryCommandSupported("copy") && (
            <div>
              <button onClick={this.copyToClipboard}>Copy</button>
              {this.state.copySuccess}
            </div>
          )}
        </form>
        <div className="divider"></div>
        <form>
          <textarea
            ref={textarea2 => (this.textArea2 = textarea2)}
            value="<Skit><Name>Robot Lie Detector<Stephanie>A father buys a lie detector robot that slaps people when they lie. One night, at dinner, he decides to test it out. He asks his son<Chris>What did you do this afternoon?<Stephanie>His son says<John>I did some homework.<Stephanie>The robot slaps him.<John>Alright, alright. I went to my friend's house and watched a movie.<Chris>What Movie?<John>Toy Story<Stephanie>The robot slaps him again.<John>Alright, alright. We watched an adult film.<Chris>Hmm? At your age I didn't even know what adult films were!<Stephanie>The robot slaps him. The mother laughs and says<Amy>Well, he certainly is your son.<Stephanie>The robot slaps her.</Skit>"
          />
          {document.queryCommandSupported("copy") && (
            <div>
              <button onClick={this.copyToClipboard2}>Copy</button>
              {this.state.copySuccess2}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Privacy;
