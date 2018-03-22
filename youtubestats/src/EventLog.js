import React from 'react';
import ClassNames from 'classnames';

class Event extends React.Component {
  render() {
    const { time, teammate } = this.props.event;
    const cb = () => this.props.cb(time);
    return (
      <span onClick={cb}>
        {teammate} @ {time}
      </span>
    );
  }
}


class EventLog extends React.Component {
  render() {
    let key = 0;
    return (
      <div className={ClassNames({ EventLog: true })}>
        {this.props.events.map(e => <Event key={key++} event={e} cb={this.props.cb} />)}
      </div>
    );
  }
}


export default EventLog;
