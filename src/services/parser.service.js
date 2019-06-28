const buttons = require('../model/buttons.model')
const papa = require('papaparse')

function parse (input) {
  let data = cleanInput(papa.parse(input).data)
  console.log(data)
  return data
}
exports.parse = parse

function checkButton (button) {
  if (buttons.SAMSUNG_FREQ.hasOwnProperty(button)) {
    console.log('SAMSUNG FREQUENCY BUTTON: ', buttons.SAMSUNG_FREQ[button])
    return buttons.SAMSUNG_FREQ[button]
  } else if (buttons.NET_FREQ.hasOwnProperty(button)) {
    console.log('NET FREQUENCY BUTTON: ', buttons.NET_FREQ[button])
    return buttons.NET_FREQ[button]
  } else if (buttons.SAMSUNG.hasOwnProperty(button)) {
    console.log('SAMSUNG BUTTON: ', buttons.SAMSUNG[button])
    return buttons.SAMSUNG[button]
  } else if (buttons.NET.hasOwnProperty(button)) {
    console.log('NET BUTTON: ', buttons.NET[button])
    return buttons.NET[button]
  } else {
    console.log('Invalid button!', button)
    return false
  }
}

function cleanInput (data) {
  let button
  for (let i = 0; i < data.length; i++) {
    if (!data[i][1] || data[i][1] !== 'IRRX') {
      console.log('Removing : ', data[i])
      data.splice(i, 1)
      i--
    } else {
      data[i].splice(1, 1)
      button = checkButton(data[i][1])
      if (button) {
        data[i][1] = button
      } else {
        console.log('Removing : ', data[i])
        data.splice(i, 1)
        i--
      }
    }
  }
  return data.map(entry => {
    return {
      date: new Date(entry[0] * 1000),
      button: entry[1]
    }
  })
}
