import React from 'react';
import ClassNames from 'classnames';


const rates = [ 0.25, 0.5, 0.75, 1 ];

class SpeedButtons extends React.Component {
  render() {
    const selectedRate = this.props.rate;
    console.log('selectedRate', selectedRate);
    return (
      <div id='speedButtons'>
        {rates.map(r => (
          <button
            className={ClassNames({ active: selectedRate === r })}
            key={r}
            onClick={() => this.props.onClickCB(r)}
          >
            {r.toString().replace(/^0/, '')}x
          </button>
        ))}
      </div>
    );
  }
}

export default SpeedButtons;
