import React, { Component } from "react";
import styles from "./styles.css";
const voices = [
  {
    voice: "Stephanie",
    locale: "en-US",
    profile: "F03",
    language: "English US",
    display: "Stephanie",
    image: "/flags/usa.png"
  },
  {
    voice: "John",
    locale: "en-US",
    profile: "M02",
    language: "English US",
    display: "John",
    image: "/flags/usa.png"
  },
  {
    voice: "Lisa",
    locale: "en-US",
    profile: "F05",
    language: "English US",
    display: "Lisa",
    image: "/flags/usa.png"
  },
  {
    voice: "Julia",
    locale: "en-US",
    profile: "F04",
    language: "English US",
    display: "Julia",
    image: "/flags/usa.png"
  },
  {
    voice: "Amy",
    locale: "en-GB",
    profile: "F02",
    language: "UK English",
    display: "Amy",
    image: "/flags/uk.png"
  },
  {
    voice: "Chris",
    locale: "en-GB",
    profile: "M02",
    language: "UK English",
    display: "Chris",
    image: "/flags/uk.png"
  },
  {
    voice: "윤정",
    locale: "ko-KR",
    profile: "F01",
    language: "Korean",
    display: "Esther",
    image: "/flags/korea.png"
  },
  {
    voice: "우호",
    locale: "ko-KR",
    profile: "M01",
    language: "Korean",
    display: "Eugene",
    image: "/flags/korea.png"
  },
  {
    voice: "유리",
    locale: "ko-KR",
    profile: "F04",
    language: "Korean",
    display: "Sarah",
    image: "/flags/korea.png"
  },
  {
    voice: "지훈",
    locale: "ko-KR",
    profile: "M02",
    language: "Korean",
    display: "Larry",
    image: "/flags/korea.png"
  },
  {
    voice: "두리",
    locale: "ko-KR",
    profile: "F05",
    language: "Korean",
    display: "Eunice",
    image: "/flags/korea.png"
  },
  {
    voice: "대휘",
    locale: "ko-KR",
    profile: "M03",
    language: "Korean",
    display: "Adam",
    image: "/flags/korea.png"
  },
  {
    voice: "张喆Zangzhe",
    locale: "zh-CN",
    profile: "F02",
    language: "Mandarin",
    display: "Fanny",
    image: "/flags/china.png"
  },
  // { voice: "王聪Wangcong", locale: "zh-CH", profile: "M02", language: "Mandarin", display: "Wangcong", image: "/flags/china.png"},
  // { voice: "Mujer", locale: "es-US", profile: "F01", language: "US Spanish", display: "Mujer", image: "/flags/mexico.png"},
  {
    voice: "Marie",
    locale: "de-DE",
    profile: "F01",
    language: "Germany",
    display: "Mary",
    image: "/flags/germany.png"
  },
  {
    voice: "Jan",
    locale: "de-DE",
    profile: "M01",
    language: "Germany",
    display: "William",
    image: "/flags/germany.png"
  },
  {
    voice: "Sandra",
    locale: "es-ES",
    profile: "F01",
    language: "Spanish",
    display: "Sandra",
    image: "/flags/spain.png"
  },
  {
    voice: "David",
    locale: "es-ES",
    profile: "M01",
    language: "Spanish",
    display: "David",
    image: "/flags/spain.png"
  },
  {
    voice: "Louise",
    locale: "fr-FR",
    profile: "F01",
    language: "French",
    display: "Michelle",
    image: "/flags/france.png"
  },
  {
    voice: "Valentin",
    locale: "fr-FR",
    profile: "M01",
    language: "French",
    display: "Pierre",
    image: "/flags/france.png"
  },
  {
    voice: "Angela",
    locale: "it-IT",
    profile: "F01",
    language: "Italian",
    display: "Angela",
    image: "/flags/italy.png"
  }
  // { voice: "Alessandro", locale: "it-IT", profile: "M01", language: "Italian", display: "Alessandro", image: "/flags/italy.png"},
];

const checkVoice = voice => {
  if (voice) {
    voice = voice.toString().toLowerCase();
    return voices.find(o => {
      return o.display.toLowerCase() == voice.toLowerCase();
    });
  }
  return null;
};

const buildSkitDisplay = scenes => {
  var display = "";
  scenes.forEach((o, i) => {
    var thisVoice = checkVoice(o.voice);
    if (thisVoice) {
      display += i + 1 + ". " + o.voice.toUpperCase() + ": " + o.text + "\n";
    }
  });
  return display.trim();
};

var parseSkit = skitString => {
  if (!skitString) {
    return null;
  }
  var scenesArray = skitString.split("<");
  if (
    skitString.substring(0, 6) == "<Skit>" &&
    skitString.substring(skitString.length - 7, skitString.length) == "</Skit>"
  ) {
    var name = "";
    var scenes = [];
    scenesArray.forEach(o => {
      var o = o.split(">");
      if (Array.isArray(o)) {
        if (o[0] == "Name") {
          name = o[1];
        } else if (o[0] != "/Skit" && o[0] != "Skit" && o[0] != "") {
          scenes.push({
            voice: o[0],
            text: o[1]
          });
        }
      }
    });
    var timeCreated = new Date().toISOString();
    return {
      scenes: scenes,
      name: name || "Unnamed Skit",
      display: buildSkitDisplay(scenes)
    };
  }
  return null;
};

class Privacy extends Component {
  state = {
    skits: [
      "<Skit><Name>Cow or Owl?<Stephanie>Knock Knock<John>Who's there?<Stephanie>Moo moo<John>Moo moo who?<Stephanie>Make up your mind! Are you a cow or an owl?</Skit>",
      "<Skit><Name>Robot Lie Detector<Stephanie>A father buys a lie detector robot that slaps people when they lie. One night, at dinner, he decides to test it out. He asks his son<Chris>What did you do this afternoon?<Stephanie>His son says<John>I did some homework.<Stephanie>The robot slaps him.<John>Alright, alright. I went to my friend's house and watched a movie.<Chris>What Movie?<John>Toy Story<Stephanie>The robot slaps him again.<John>Alright, alright. We watched an adult film.<Chris>Hmm? At your age I didn't even know what adult films were!<Stephanie>The robot slaps him. The mother laughs and says<Amy>Well, he certainly is your son.<Stephanie>The robot slaps her.</Skit>",
      "<Skit><Name>Auditing Grandpa<Lisa>The I R S decides to audit Grandpa, and summons him to the I R S office. The auditor was not surprised when Grandpa showed up with his attorney. The auditor said<John>Well, sir, you have an extravagant lifestyle and no full-time employment, which you explain by saying that you win money gambling. I'm not sure the I R S finds that believable.<Lisa>In response, grandpa said<Eugene>I'm a great gambler, and I can prove it.<Eugene>How about a demonstration?<Lisa>The auditor thinks for a moment and said<John>Okay, go ahead<Eugene>I'll bet you a thousand dollars that I can bite my own eye.<Lisa>The auditor thinks a moment and says<John>It's a bet.<Lisa>Grandpa removes his glass eye and bites it. The auditor's jaw drops. Grandpa says<Eugene>Now, I'll bet you two thousand dollars that I can bite my other eye.<Lisa>Now the auditor can tell Grandpa isn't blind, so he takes the bet. Grandpa removes his dentures and bites his good eye. The stunned auditor now realizes he has wagered and lost three grand, with Grandpa's attorney as a witness. He starts to get nervous.<Eugene>Want to go double or nothing?<Eugene>I'll bet you six thousand dollars that I can stand on one side of your desk, and pee into that wastebasket on the other side, and never get a drop anywhere in between.<Lisa>The auditor, twice burned, is cautious now, but he looks carefully and decides there's no way this old guy could possibly manage that stunt, so he agrees again. Grandpa stands beside the desk and unzips his pants, but although he strains mightily, he can't make the stream reach the wastebasket on the other side, so he ends up urinating all over the auditor's desk. The auditor leaps with joy, realizing that he has just turned a major loss into a huge win. But Grandpa's own attorney moans and puts his head in his hands. The auditor asks the attorney<John>Are you okay?<Chris>Not really<Lisa>the attorney replied<Chris>This morning, when Grandpa told me he'd been summoned for an audit, he bet me twenty-five thousand dollars that he could come in here and pee all over your desk and that you'd be happy about it!</Skit>",
      "<Skit><Name>Sex Therapy<Stephanie>A doctor had a good reputation of helping couples increase the joy in their sex life, but always promised not to take a case if he felt he couldn't help. The Browns came into see the successful doctor and he gave them thorough physical exams, psychological exams, and various tests. Finally, he concluded,<Chris>Yes, I am happy to say that I can help you. On your way home from my office stop at the grocery store and buy some grapes and doughnuts. Go home, take off your clothes, and you, sir, roll the grapes across the floor until you make a bulls eye in your wife's love canal. Then, on hands and knees, you must crawl to her like a leopard and retrieve the grape using only your tongue. Next, madam, you must take the doughnuts and from across the room, toss them at your husband until you make a ringer around his love pole. Then, like a lioness, you must crawl to him and consume the doughnut.<Stephanie>The couple went home and their sex life became more and more wonderful. They told their friends, Mr. & Mrs. Green that they should see the good doctor. The doctor greeted the Greens and said he would not take the case unless he felt that he could help them. So he conducted the physical exams and the same battery of tests. Then he told the Greens the bad news.<Chris>I cannot help you, so I will not take your money. I believe your sex life is as good as it will ever be, I cannot help.<Stephanie>The Greens pleaded with him, and said<John>You helped our friends the Browns, now please, please, help us.<Chris>Well, all right<Chris>On your way home from the office, stop at the grocery store and buy some apples and a box of cheerios...</Skit>",
      '<Skit><Name>Russian Girlfriend<John>I proposed to my russian girlfriend and she said yes. For the wedding, my whole family and friends flew over to her home town of Moscow. It was a beautiful ceremony, however I did find some things strange. For instance, the priest never said<Chris>You may now kiss the bride<John>I just assumed it was purely an American thing and didn\'t mind. Later during the reception, we were both starving. On the way to the buffet line, we passed the drink table, where about six people were waiting to get a fruity drink from a bowl. As we passed, they all said in unison<Amy>You may now kiss the bride!<John>My wife got giddy and gave me a big kiss, which I of course returned. As we walked away I asked, "Why did they tell us to kiss and not the priest?" My wife answered,<Michelle>In Soviet Russia, the punchline tells you!</Skit>'
    ],
    skitContent: []
  };
  componentWillMount() {}
  componentDidMount() {}

  //   handleChange = (e, i) => {
  //     var skits = this.state.skits;
  //     skits[i] = e.target.value;
  //     this.setState({ skits: skits });
  //   };

  copyToClipboard = (e, id, skitCount) => {
    e.preventDefault();
    this.state.skitContent[id].select();
    // e.target.focus();
    document.execCommand("copy");
    for (var j = 0; j < skitCount; j++) {
      if (id != j) {
        var tempStateObj = {};
        tempStateObj[j] = "";
        this.setState(tempStateObj);
      }
    }
    var stateObj = {};
    stateObj[id] = "Copied!";
    this.setState(stateObj);
  };

  returnSkits = skits => {
    return skits.map((o, i) => {
      var skit = parseSkit(o);
      var temp = "textArea";
      return (
        <div>
          <h6>{skit.name}</h6>
          <form>
            <textarea
              ref={ref => {
                return (this.state.skitContent[i] = ref);
              }}
              value={o}
              onChange={e => {
                // this.handleChange(e, i);
              }}
            />
            {document.queryCommandSupported("copy") && (
              <div>
                <button
                  onClick={e => {
                    this.copyToClipboard(e, i, skits.length);
                  }}
                >
                  Copy
                </button>
                {this.state[i]}
              </div>
            )}
          </form>
        </div>
      );
    });
  };

  render() {
    const { state } = this;
    return (
      <div className="skitContainer">
        <h3>Skits for Joke Generator</h3>
        <p>
          Joke Generator is a Bixby capsule where you can create jokes for Bixby
          to read. You can use different voices and approximately 11 minutes of
          dialog.
        </p>
        {this.returnSkits(state.skits)}
        <div className="divider" />
      </div>
    );
  }
}

export default Privacy;
