var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
    getInitialState: function () {
      return {
        count: 0,
        timerStatus: 'stopped'
      };
    },
    componentDidUpdate: function (prevProps, prevState) {
      // Invoked immediately after the component's updates are flushed to the DOM.
      // This method is not called for the initial render.
      // Use this as an opportunity to operate on the DOM when the component has been updated.

      if (this.state.timerStatus !== prevState.timerStatus) { // changed
        switch (this.state.timerStatus) {
          case 'started':
            this.handleStart();
            break;
          case 'stopped':
            this.setState({count: 0});
            clearInterval(this.timer);
            this.timer = undefined;
            break;
          case 'paused':
            clearInterval(this.timer);
            this.timer = undefined;
            break;
        }
      }
    },
    componentWillUnmount: function () {
      clearInterval(this.timer);
    },
    handleStatusChange: function (newStatus) {
      this.setState({timerStatus: newStatus});
    },
    handleStart: function () {
      this.timer = setInterval(() => {
        this.setState({
          count: this.state.count + 1
        });
      }, 1000);
    },
    render: function () {
      var {count, timerStatus} = this.state;
      return (
        <div>
          <h1 className="page-title">Timer App</h1>
          <Clock totalSeconds={count}/>
          <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
        </div>
    )
  }
});

module.exports = Timer;
