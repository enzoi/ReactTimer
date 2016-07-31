var React = require('react');

// appear when start button is clicked
// no state, has two props (countdownStatus & onStatusChange ??)
var Controls = React.createClass({
  propTypes: {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  },
  onStatusChange: function (newStatus) { // prop function.....function currying
    return () => { // return function invoke handleStatusChange func in Countdown component
      this.props.onStatusChange(newStatus); //???  update props with new status --> in parent component
    }
  },
  render: function () {
    var { countdownStatus } = this.props; // get updated
    var renderStartStopButton = () => { // control button set (Pause OR Start)
      if (countdownStatus === 'started') {
        return <button className="button secondary" onClick={this.onStatusChange('paused')}>Pause</button>
      } else {
        return <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
      }
    };

    return (
      <div className="controls">
        {renderStartStopButton()}
        <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>Clear</button>
      </div>
    )
  }
});

module.exports = Controls;
