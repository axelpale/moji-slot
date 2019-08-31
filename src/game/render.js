const displayTemplate = require('./display.ejs')

module.exports = (model, dispatch) => {
  const root = document.createElement('div')

  const disp = document.createElement('div')
  disp.innerHTML = displayTemplate({ model: model })
  root.appendChild(disp)

  const rollBtn = document.createElement('input')
  rollBtn.type = 'button'
  rollBtn.value = 'Roll'
  root.appendChild(rollBtn)

  // Events

  rollBtn.addEventListener('click', ev => {
    dispatch({
      type: 'ROLL'
    })
  })

  return root
}
