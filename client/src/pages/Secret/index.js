import React, { Component } from 'react';
import styles from './styles.css';

class Secret extends Component {
  state = {
    name: 'Poop',
    disableForm: false,
    hideForm: false,
    showTypewriter: false,
    hideTypewriter: false,
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
      var delta = 200 - Math.random() * 100;
      if (this.isDeleting) {
        delta /= 2;
      }
      if (
        !this.isDeleting &&
        this.txt === fullTxt &&
        this.loopNum !== this.toRotate.length - 1
      ) {
        delta = this.period;
        this.isDeleting = true;
        setTimeout(function() {
          console.log('pooping');
          that.tick();
        }, delta);
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        setTimeout(function() {
          console.log('shooping');
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
          console.log('looping');
          that.tick();
        }, delta);
      }
    };
    this.isDeleting = false;
  };

  componentWillMount() {}

  componentDidMount() {
    new this.TxtType(["Hi, I'm Jon. What's your name?"], 1000, () => {
      setTimeout(() => {
        this.setState({ showTextInput: true }, () => {
          console.log('show text input');
        });
      }, 1000);
    }).tick();
  }

  step1 = () => {
    console.log('step 1');
    new this.TxtType(
      [
        'Hello cutie :)',
        'Thank you for coming!',
        'Here is something I wrote for you',
      ],
      2000,
      () => {
        console.log('step1 done');
      },
    ).tick();
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

  render() {
    const {
      showTextInput,
      disableForm,
      hideForm,
      showTypewriter,
      hideTypewriter,
    } = this.state;
    return (
      <div className="secretContainer">
        <span className="centerText">
          <span
            className={
              hideTypewriter ? 'typewriter animated fadeOut' : 'typewriter'
            }
          />
          <span className={hideTypewriter ? 'cursorGoAway' : 'cursor'}>|</span>
        </span>

        <div className="inputDiv">
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
    );
  }
}

export default Secret;
