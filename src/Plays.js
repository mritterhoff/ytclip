
const Side = {
  Offense: 0,
  Defense: 1
};

class PlayType {
  constructor(side, ...results) {
    this.side = side;
    this.results = results;
  }
}

const PlayTypes = {
  'Serve': new PlayType(Side.Offense, 'Ace', 'OOS', 'Error', 'Other'),
  'Hit': new PlayType(Side.Offense, 'Kill', 'OOS', 'Error', 'Other'),
  'Set': new PlayType(Side.Offense, 'Hittable', 'Error', 'Other'),
  'Serve Receive': new PlayType(Side.Defense, 'Settable', 'Error', 'Other'),
  'Block': new PlayType(Side.Defense, 'Kill', 'Error', 'Missed', 'Other'),
  'Dig': new PlayType(Side.Defense, 'Settable', 'Error', 'Missed', 'Other'),
  'Pass': new PlayType(Side.Defense, 'Settable', 'Error', 'Other')
};


export default PlayTypes;

