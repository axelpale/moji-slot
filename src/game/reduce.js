const game = require('./game')

module.exports = (model, ev) => {
  switch (ev.type) {
    case 'ROLL': {
      const BET = 1
      const win = game.sample()
      return Object.assign({}, model, {
        bet: BET,
        lastWin: win,
        funds: model.funds - BET + win
      })
    }

    default:
      return model
  }
}
