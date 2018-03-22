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
        <YouTubePlayer/>
      </div>
    );
  }
}


export default App;
