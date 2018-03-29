import React from 'react';
import ClassNames from 'classnames';

import YouTubePlayer from './YouTubePlayer';


import './css/App.css';

// test: http://localhost:3000/?id=pI4T4C75H0U&s=1651&d=4&r=.25
// and:  http://localhost:3000/?v=pI4T4C75H0U&s=2532&d=7.5&r=.75

// https://www.youtube.com/watch?v=K8P8uFahAgc
// https://youtu.be/K8P8uFahAgc?t=6

class App extends React.Component {
  render() {
    const urlMap = this.mapFromURL();

    // we have a fullly specified URL, show a looping page.
    if (Object.keys(urlMap).length >= 3) {
      return <LoopingYoutubeVideo urlMap={urlMap} />;
    }

    return (
      <div className={ClassNames({ App: true, Debug: false })}>
        <h4>Instructions</h4>
        <ul>
          <li>TODO</li>
        </ul>
        <YoutTubeIDExtractor />
      </div>
    );
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  mapFromURL() {
    const searchParams = new URLSearchParams(window.location.search);
    const toReturn = {};
    const blessedKeys = [ 'v', 's', 'd', 'r' ];
    blessedKeys.forEach((key) => {
      if (searchParams.has(key)) {
        toReturn[key] = key === 'v'
          ? searchParams.get(key)
          : Number(searchParams.get(key));
      }
    });
    return toReturn;
  }
}

class LoopingYoutubeVideo extends React.Component {
  render() {
    const params = this.props.urlMap;
    return (
      <div>
        <div id='debug'>
          <span>Debug info:</span>
          {Object.keys(params).map(k => <span key={k}>{k}: {params[k]}</span>)}
        </div>
        <YouTubePlayer
          videoId={params.v}
          start={params.s}
          end={params.s + params.d}
          rate={params.r}
          fullScreen
        />
      </div>
    );
  }
}

class YoutTubeIDExtractor extends React.Component {
  constructor() {
    super();
    this.state = {
      videoID: undefined
    };
  }

  newVideoID = () => {
    console.log(`found match: ${this.state.videoID}`);
  }

  onChange = (el) => {
    const url = el.target.value;
    console.log(url);

    const id = this.extract(url);
    if (id) {
      this.setState({ videoID: id }, this.newVideoID);
    }
    else {
      this.setState({ videoID: undefined });
    }
  }

  extract = (url) => {
    if (url.match(/^(?:https?:\/\/)?www.youtube.com/)) {
      const vidMatch = url.match(/v=([A-Za-z0-9-]+)/);
      if (vidMatch) {
        return vidMatch[2];
      }
    }
    if (url.match(/^https?:\/\/youtu.be\//)) {
      const vidMatch = url.match(/https?:\/\/youtu.be\/([A-Za-z0-9-]+)/);
      if (vidMatch) {
        return vidMatch[1];
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        <label htmlFor='textInput'>Youtube link:</label>
        <input id='textInput' size='32' onChange={this.onChange} />
        <span style={{ display: 'inline-block', marginLeft: '.2em' }}>
          VideoID: {this.state.videoID}
        </span>
      </div>
    );
  }
}


export default App;
