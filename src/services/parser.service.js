const buttons = require('../model/buttons.model')

function parse (input) {
  let commands = cleanInput(input)
  commands.sort(compareDate)
  commands = cleanPower(commands)
  // console.log(commands)
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
// command[i] = [timeStamp, signalType, button code] or
// command[i] = [timeStamp, someMessage]
function cleanInput (commands) {
  let button
  let cleanCommands = []
  for (let i = 0; i < commands.length; i++) {
    button = commands[i][2] ? checkButton(commands[i][2]) : false
    if (commands[i][1] === 'IRRX' && button) {
      // console.log(commands[i][0], new Date(commands[i][0] * 1000))
      // console.log(commands[i][2], button)
      cleanCommands.push({
        date: new Date(commands[i][0] * 1000),
        button: button
      })
    } else {
      // console.log('Invalid input', commands[i])
    }
  }
  return cleanCommands
}

// Check if the IR code of the button or the name of the button is valid
function checkButton (button) {
  if (buttons.SAMSUNG_FREQ.hasOwnProperty(button)) {
    return buttons.SAMSUNG_FREQ[button]
  } else if (buttons.NET_FREQ.hasOwnProperty(button)) {
    return buttons.NET_FREQ[button]
  } else if (buttons.SAMSUNG.hasOwnProperty(button)) {
    return buttons.SAMSUNG[button]
  } else if (buttons.NET.hasOwnProperty(button)) {
    return buttons.NET[button]
  }
  return false
}

// I don't know why the fuck the power entries are duplicated
function cleanPower (commands) {
  for (let i = 0; i < commands.length; i++) {
    if (i !== commands.length - 1) {
      if (commands[i].button === commands[i + 1].button && commands[i].button === buttons.SAMSUNG.SAM_POWER) {
        // console.log('Indice: ' + i + ' SAM_POWER')
        if (commands[i].date.getTime() === commands[i + 1].date.getTime()) {
          commands.splice(i, 1)
          i--
          // console.log('REMOVING!' + commands[i] + commands[i + 1])
        }
      }
    }
  }
  return commands
}
