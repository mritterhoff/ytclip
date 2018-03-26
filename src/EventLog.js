import React from 'react';
import ClassNames from 'classnames';

class Event extends React.Component {
  render() {
    const {
      time, teammate, playType, playResult
    } = this.props.event;
    const seekToCB = () => this.props.seekToCB(time);
    const deleteEventCB = () => this.props.deleteEventCB(this.props.index);
    return (
      <div className='event' >
        <div className='buttonContainer'>
          <button onClick={deleteEventCB}>x</button>
        </div>
        <span>{teammate}: {playType} - {playResult} @ <a href='#' onClick={seekToCB}>{time}</a></span>
      </div>
    );
  }
}

class EventLog extends React.Component {
  render() {
    let key = 0;

    const events = this.props.events.map((e, i) => (
      <Event key={key++} event={e} index={i} seekToCB={this.props.seekToCB} deleteEventCB={this.props.deleteEventCB} />));

    return (
      <div className={ClassNames({ EventLog: true })}>
        {this.props.events.length > 0 ? events : <span>(Log is empty)</span>}
      </div>
    );
  }
}


export default EventLog;
