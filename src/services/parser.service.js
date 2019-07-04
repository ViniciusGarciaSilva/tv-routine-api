const buttons = require('../model/buttons.model')
const papa = require('papaparse')

function parse (input) {
  let commands = cleanInput(papa.parse(input).data)
  commands.sort(compareDate)
  console.log(commands)
  return commands
}
exports.parse = parse

function compareDate (command1, command2) {
  if (command1.date.getTime() < command2.date.getTime()) {
    return -1
  }
  if (command1.date.getTime() > command2.date.getTime()) {
    return 1
  }
  return 0
}

// Check if the command is a Infrared command and if is a valid button. Returns an array with DATE and BUTTON attributes
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

function checkButton (button) {
  if (buttons.SAMSUNG_FREQ.hasOwnProperty(button)) {
    return buttons.SAMSUNG_FREQ[button]
  } else if (buttons.NET_FREQ.hasOwnProperty(button)) {
    return buttons.NET_FREQ[button]
  } else if (buttons.SAMSUNG.hasOwnProperty(button)) {
    return buttons.SAMSUNG[button]
  } else if (buttons.NET.hasOwnProperty(button)) {
    return buttons.NET[button]
  } else {
    console.log('Invalid button!', button)
    return false
  }
}
