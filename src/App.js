/* eslint-disable no-restricted-globals */

import React from 'react';

import ClipCreator from './ClipCreator';
import ClipPlayer from './ClipPlayer';

import './css/App.css';

/* test:
  http://localhost:3000/?v=pI4T4C75H0U&s=1651&d=4&r=.25
  http://localhost:3000/?v=pI4T4C75H0U&s=2532&d=7.5&r=.75
  https://mritterhoff.github.io/ytclip/?d=7.5&r=.75&s=2532&v=pI4T4C75H0U
*/


/** Function map to convert url param to appropriate value. */
const paramParserMap = {
  v: (v) => v,
  s: (s) => {
    let mm_ss = s.split(':');
    return mm_ss.length == 1 ? Number(s) : Number(mm_ss[0])*60 + Number(mm_ss[1]);
  },
  d: (d) => Number(d),
  r: (r) => Number(r)
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function mapFromURL() {
  const searchParams = new URLSearchParams(window.location.search);
  const toReturn = {};
  Object.keys(paramParserMap).forEach((key) => {
    if (searchParams.has(key)) {
      toReturn[key] = paramParserMap[key](searchParams.get(key));
    }
  });
  return toReturn;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      urlMap: mapFromURL()
    };
  }

  // change the URL without causing any reload/refresh
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method
  updateURL = (r) => {
    const newHref = location.href.replace(/(r=)[^&]+/, `$1${r}`);
    console.log(newHref);
    history.pushState(null, null, newHref);
    this.setState({ urlMap: mapFromURL() });
  }

  render() {
    const { urlMap } = this.state;

    // we have a fullly specified URL, show the CLipPlayer page.
    if (Object.keys(urlMap).length >= 3) {
      return <ClipPlayer urlMap={urlMap} updateURL={this.updateURL} />;
    }

    // otherwise show a UI that makes it easy to choose a video, start, duration and playback rate.
    return <ClipCreator />;
  }
}

export default App;
