const template = require('./template.ejs')

module.exports = (model, dispatch) => {
  const root = document.createElement('div')
  root.innerHTML = template()
  return root
}
