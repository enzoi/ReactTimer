var React = require('react');

// Accept seconds from user and start countdown when button clicked
var CountdownForm = React.createClass({

  onSubmit: function (e) {
    e.preventDefault(); // prevent the page from reloading
    var strSeconds = this.refs.seconds.value; // user input from the input form

    if (strSeconds.match(/^[0-9]*$/)) { // chekck if valid seconds entered
      this.refs.seconds.value = '';
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  },
  render: function () {
    return (
      <div>
        <form ref="form" onSubmit={this.onSubmit} className="countdown-form">
          <input type="text" ref="seconds" placeholder="Enter time in seconds"/>
          <button className="button expanded">Start</button>
        </form>
      </div>

    )
  }

});

module.exports = CountdownForm;
