var React = require('react');
var Navigation = require('Navigation');
var Timer = require('Timer'); // child
var Countdown = require('Countdown'); // child


var Main = (props) => {
    return (
      <div>
        <Navigation />
        <div className="row">
          <div className="column small-centered medium-6 large-4">
            {props.children}
          </div>
        </div>
      </div>
    );
}

module.exports = Main;
