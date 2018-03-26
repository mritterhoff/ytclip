import React from 'react';
import ClassNames from 'classnames';

import YouTubePlayer from './YouTubePlayer';


import './css/App.css';

class App extends React.Component {
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
