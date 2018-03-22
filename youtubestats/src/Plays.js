
const Side = {
  Offense: 0,
  Defense: 1
};

class PlayType {
  constructor(value, side) {
    this.value = value;
    this.side = side;
  }
}

const PlayTypes = {
  'Serve': new PlayType(0, Side.Offense),
  'Hit': new PlayType(1, Side.Offense),
  'Set': new PlayType(2, Side.Offense),
  'Serve Receive': new PlayType(3, Side.Defense),
  'Block': new PlayType(4, Side.Defense),
  'Dig': new PlayType(5, Side.Defense),
  'Pass': new PlayType(6, Side.Defense)
};

// const Plays = {

// }

// Service Ace
// Service OOS
// Service Error
// Other

// Hit Kill
// Hit OOS
// Hit Error
// Other

// Set Hittable
// Set Error
// Other

// Serve Receive Settable
// Serve Receive Error
// Other

// Block Kills
// Blocking Error
// Missed Blocks
// Other

// Dig Settable
// Dig Error
// Missed Digs
// Other

// Pass Settable
// Pass Error
// Other
