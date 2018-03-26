import React from 'react';
import ClassNames from 'classnames';

import YouTubePlayer from './YouTubePlayer.js';


import './css/App.css';

class App extends React.Component {
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  // hat tip to: https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  render() {
    return (
      <div className={ClassNames({ App: true, Debug: false })}>
        <h4>Instructions</h4>
        <ul>
          <li>To log an event, click a player name button, the next button row appears and playrate slows down.</li>
          <li>Select the next 2 buttons as appropriate, and the event appears in the log.</li>
          <li>To delete an event, hover over it and click the x button.</li>
          <li>To view an event, click the timestamp</li>
        </ul>
        <YouTubePlayer />
      </div>
    );
  }
}


export default App;
