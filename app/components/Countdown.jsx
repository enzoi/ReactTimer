var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm'); // child
var Controls = require('Controls'); // child

// contains two children - Clock & Controls
// has two initial states - count & countdownStatus
var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    // Invoked immediately after the component's updates are flushed to the DOM.
    // This method is not called for the initial render.
    // Use this as an opportunity to operate on the DOM when the component has been updated.

    if (this.state.countdownStatus !== prevState.countdownStatus) { // changed
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
          break;
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function () { // when leave countdown page remove timer
    console.log('componentDidUnmount');
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  handleSetCountdown: function (seconds) { // from CountdownForm (set initial seconds & start)
    this.setState ({
      count: seconds,
      countdownStatus: 'started' // when start button submitted from CountdownForm
    });
  },

  handleStatusChange: function (newStatus) { // from Controls (start, paused or stopped)
    this.setState({countdownStatus: newStatus});
  }, // In CountdownForm..if countdown started => setState

  render: function () {
    var {count, countdownStatus} = this.state; // feed update data(as state) to render
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
      }
    };

    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
