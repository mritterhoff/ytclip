// import React from 'react';
// import ClassNames from 'classnames';

// const getInitialState = () => ({
//   videoID: undefined,
//   startTime: undefined,
//   endTime: undefined,

// });

// class Controls extends React.Component {
//   constructor() {
//     super();
//     this.state = getInitialState();
//   }

//   setTeammate = (tm) => {
//     const time = this.props.getTime();

//     this.setState(() => ({
//       teammate: tm,
//       time: time
//     }));
//     this.props.setSpeed(0.25);
//   }

//   setPlayType = (pt) => {
//     this.setState(() => ({
//       playType: pt
//     }));
//   }

//   setPlayResult = (pr) => {
//     this.setState(
//       () => ({
//         playResult: pr
//       }),
//       () => {
//         console.log('saving:', this.state);
//         this.props.saveEvent(this.state);
//         this.props.setSpeed(1);
//         this.setState(getInitialState());
//       }
//     );
//   }

//   getButtons = (collection, stateMatch, setCallback) => {
//     return collection.map(el => (
//       <button
//         className={ClassNames({ selected: el === stateMatch })}
//         onClick={() => setCallback(el)}
//         key={el}
//         disabled={!this.props.enabled}
//       >
//         {el}
//       </button>
//     ));
//   }

//   render() {
//     const { teammate, playType, playResult } = this.state;

//     return (
//       <div className='controls'>
//         <div className='teammates'>
//           {this.getButtons(this.props.teammates, teammate, this.setTeammate)}
//         </div>
//         <div className='playType' hidden={!teammate}>
//           {this.getButtons(Object.keys(PlayTypes), playType, this.setPlayType)}
//         </div>
//         <div className='playSuccess' hidden={!playType}>
//           {this.getButtons(playType ? PlayTypes[playType].results : [], playResult, this.setPlayResult)}
//         </div>
//       </div>
//     );
//   }
// }

// export default Controls;
