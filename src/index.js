const reduxish = require('./lib/reduxish')

const renderers = [
  require('./header/render'),
  require('./game/render')
  //require('./footer/render')
]

const reducers = [
  require('./game/reduce')
]

module.exports = () => {
  reduxish({
    defaultModel: {
      funds: 10,
      lastWin: null,
      timesPlayed: 0,
      version: 0 // data model version
    },
    storageName: 'state',
    rootElementId: 'content',
    renderers: renderers,
    reducers: reducers
  })
}

// Run immediately. Remove line if lazy run is needed.
module.exports()
