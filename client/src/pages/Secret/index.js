import React, { Component } from 'react';
import styles from './styles.css';

class Secret extends Component {
  state = {
    name: 'Jacqueline Ka',
    disableForm: false,
    hideForm: false,
    showTypewriter: false,
    hideTypewriter: false,
    splitBackground: false,
  };

  TxtType = function(toRotate, period, callback) {
    const elements = document.getElementsByClassName('typewriter');
    this.toRotate = toRotate;
    this.el = elements[0];
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = this.txt;
      var that = this;
      var delta = 120 - Math.random() * 90;
      // var delta = 125;
      if (this.isDeleting) {
        // delta /= 2;
        delta = 80;
      }
      if (
        !this.isDeleting &&
        this.txt === fullTxt &&
        this.loopNum !== this.toRotate.length - 1
      ) {
        delta = this.period;
        this.isDeleting = true;
        setTimeout(function() {
          that.tick();
        }, delta);
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 600;
        setTimeout(function() {
          that.tick();
        }, delta);
      } else if (
        this.loopNum === this.toRotate.length - 1 &&
        this.txt === fullTxt &&
        callback
      ) {
        callback();
      } else {
        setTimeout(function() {
          that.tick();
        }, delta);
      }
    };
    this.isDeleting = false;
  };

  componentWillMount() {}

  componentDidMount() {
    new this.TxtType(["Hi, I'm Jon."], 500, () => {
      setTimeout(() => {
        this.setState({ showTextInput: true }, () => {
          console.log('show text input');
        });
      }, 1000);
    }).tick();
  }

  step1 = () => {
    console.log('step 1');
    new this.TxtType(['Hello cutie :)'], 500, () => {
      this.setState({ splitBackground: true });
    }).tick();
  };

  handleChange = event => {
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    const nameUppercase = toTitleCase(event.target.value);
    this.setState({ name: nameUppercase }, () => {
      if (this.state.name === 'Jacqueline Kao') {
        this.setState({ disableForm: true }, () => {
          setTimeout(() => {
            this.setState({ hideForm: true, hideTypewriter: true });
          }, 1000);
        });
        setTimeout(() => {
          this.setState({ hideTypewriter: false });
          this.step1();
        }, 3000);
      }
    });
  };

  selectBears = () => {
    console.log('selected bears');
  };

  selectElephants = () => {
    console.log('selected elephants');
  };

  render() {
    const {
      showTextInput,
      disableForm,
      hideForm,
      showTypewriter,
      hideTypewriter,
      splitBackground,
    } = this.state;
    return (
      <div className="wrapper">
        {splitBackground ? (
          <div className="animated fadeIn">
            <div
              className="leftBackground"
              onClick={() => {
                this.selectBears();
              }}
            >
              <div className="step2Select">Bears</div>
              <video autoPlay muted loop className="leftVideo">
                <source src="/assets/video/bear.mp4" type="video/mp4" />
              </video>
            </div>
            <div
              className="rightBackground"
              onClick={() => {
                this.selectElephants();
              }}
            >
              <div className="step2Select">Elephants</div>
              <video autoPlay muted loop className="rightVideo">
                <source src="/assets/video/elephant.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        ) : (
          <div className="fullBackground" />
        )}
        <div className="secretContainer">
          <span className="centerText unselectable">
            <span
              className={
                hideTypewriter
                  ? 'typewriter animated fadeOut unselectable'
                  : 'typewriter unselectable'
              }
            />
            <span
              className={
                hideTypewriter
                  ? 'cursorGoAway animated fadeOut unselectable'
                  : 'cursor unselectable'
              }
            >
              |
            </span>
          </span>

          <div className={!hideForm ? 'inputDiv' : 'inputDiv unselectable'}>
            {showTextInput ? (
              <input
                disabled={disableForm}
                className={
                  hideForm
                    ? 'inputStyle animated fadeOut'
                    : 'inputStyle animated fadeIn'
                }
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Secret;
