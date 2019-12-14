const variables = require('../variables.js')

// Read the command and interpretate it as a:
// - Channel Button
// - Useful Button
// - Extra Menu Navigation Button
// - Useless Button
// After that, the command is consumed. The isFinished variable indicates if the command was ended.
// When is ended, the variables are updated and the information about what and how long time a channel was watched are added to the routine array
function interpretate (startInput, finishInput, command) {
  const minimumTime = variables.minimumTime
  const delay = variables.buttonDelay // delay between some button and another button
  let isFinished = false // Command is finished?
  let start = command[0] ? command[0].date : null // start of the watch period
  let finish = 0 // end of the watch period
  let lastChannel = 0
  let channel = 0 // default channel of this user
  let nextChannel = 0
  let isMenu = false
  let routine = []
  let isPowerOn = false // tv state when the module was turned on
  let changePower = false
  for (let i = 0; i < command.length; i++) {
    if (command[i].date < startInput) {
      continue
    }
    // console.log(' Command: ' + command[i].button)
    switch (command[i].button) {
      // CHANNEL
      case 'NET_ONE':
        nextChannel = composeChannel(nextChannel, 1)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true // next Button != number ????
        break
      case 'NET_TWO':
        nextChannel = composeChannel(nextChannel, 2)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_THREE':
        nextChannel = composeChannel(nextChannel, 3)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_FOUR':
        nextChannel = composeChannel(nextChannel, 4)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_FIVE':
        nextChannel = composeChannel(nextChannel, 5)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_SIX':
        nextChannel = composeChannel(nextChannel, 6)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_SEVEN':
        nextChannel = composeChannel(nextChannel, 7)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_EIGHT':
        nextChannel = composeChannel(nextChannel, 8)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_NINE':
        nextChannel = composeChannel(nextChannel, 9)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_ZERO':
        nextChannel = composeChannel(nextChannel, 0)
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break

      // USEFUL BUTTONS
      case 'NET_CHANNELUP':
        nextChannel = channel + 1
        isFinished = true // todo: delay? Change the channel everytime?
        break
      case 'NET_CHANNELDOWN':
        nextChannel = channel - 1
        isFinished = true // todo: delay? Change the channel everytime?
        break
      case 'NET_BACK':
        if (!isMenu) {
          nextChannel = lastChannel
          isFinished = true
        }
        break
      case 'NET_UP':
        if (!isMenu) {
          if (nextChannel === 0) {
            nextChannel = channel + 1
          } else {
            nextChannel++
          }
        }
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'NET_DOWN':
        if (!isMenu) {
          if (nextChannel === 0) {
            nextChannel = channel - 1
          } else {
            nextChannel--
          }
        }
        isFinished = command[i + 1] ? command[i + 1].date.getTime() - command[i].date.getTime() > delay : true
        break
      case 'SAM_POWER':
        changePower = true
        if (isPowerOn) {
          isFinished = true
        } else {
          start = command[i].date
        }
        // console.log('PowerOn: ' + isPowerOn)
        break

      // EXTRA MENU NAVIGATION
      case 'NET_LEFT':
      case 'NET_RIGHT':
      case 'NET_PORTAL':
      case 'NET_MOSAIC':
      case 'NET_NETTV':
      case 'NET_ITV':
      case 'NET_MESSAGES':
      case 'NET_RIGHTNOW':
      case 'NET_MENU':
      case 'NET_EXIT':
      case 'NET_FAVORITE':
      case 'NET_PAYPERVIEW':
      case 'NET_NOW':
      case 'NET_MUSIC':
      case 'SAM_UP':
      case 'SAM_DOWN':
      case 'SAM_LEFT':
      case 'SAM_RIGHT':
      case 'SAM_CENTER':
      case 'SAM_RETURN':
      case 'SAM_HOME':
        break

      // USELESS BUTTONS
      case 'NET_VOLUMEUP':
      case 'NET_VOLUMEDOWN':
      case 'NET_NET':
      case 'SAM_VOLUME':
      case 'SAM_CHANNEL':
      case 'NET_INFO':
      case 'NET_MUTE':
      case 'NET_AUDIO':
      case 'NET_SUBTITLE':
      case 'SAM_NUMBERS':
      case 'SAM_DOTS':
      case 'SAM_PLAYPAUSE':
      case 'SAM_VOLUMEUP':
      case 'SAM_VOLUMEDOWN':
      case 'SAM_CHANNELUP':
      case 'SAM_CHANNELDOWN':
      case 'NET_PLAY':
      case 'NET_FORWARD':
      case 'NET_REPLAY':
      case 'NET_STOP':
      case 'NET_REC':
      case 'NET_REVERSE':
        break
    }
    // console.log('power: ' + isPowerOn + '   command: ' + command[i].button + '    lastChannel: ' + lastChannel + '   channel: ' + channel + '    nextChannel: ' + nextChannel + '    isFinished: ' + isFinished)
    // console.log('start: ' + start + '     finish: ' + finish + '\n')
    if ((isFinished && nextChannel !== channel)) {
      finish = command[i].date
      if (isPowerOn && channel !== 0 && (finish - start) > minimumTime) {
        routine.push({
          channel: channel,
          start: start,
          finish: finish,
          time: finish - start
        })
        // console.log(routine[routine.length - 1])
      }
      lastChannel = channel
      channel = nextChannel
      nextChannel = 0
      isFinished = false
      start = command[i].date
      isMenu = false
      // console.log('Last Channel: ' + lastChannel + ' Channel: ' + channel)
    }
    if (changePower) {
      isPowerOn = !isPowerOn
      changePower = false
    }
  }
  return routine
}
exports.interpretate = interpretate

function fill (data, startInput, finishInput) {
  let result = []
  let i = 0
  let channel = 0
  console.log('Entrada do fill: ', startInput, finishInput)
  // sort data by date
  data.sort(function (a, b) {
    return new Date(a.start) - new Date(b.start)
  })

  for (let time = new Date(startInput); time.getTime() <= finishInput.getTime(); time.setSeconds(time.getSeconds() + 10)) {
    // console.log(data[i])
    // console.log('time: ', time)
    if (!data[i]) {
      channel = 0
    } else {
      if (time.getTime() > data[i].finish.getTime()) {
        i++
        time.setSeconds(time.getSeconds() - 10)
        channel = 0
      } else {
        if (time.getTime() < data[i].start.getTime()) {
          channel = 0
        }
        if (time.getTime() >= data[i].start.getTime() && time.getTime() <= data[i].finish.getTime()) {
          channel = data[i].channel
        }
      }
    }
    if (channel !== 0) {
      result.push({
        date: time.toString(),
        channel: channel
      })
    }
    // console.log(result[result.length - 1])
  }
  console.log(result)
  return result
}
exports.fill = fill

// if channel has 3 digits and receive another digit, it means a wrong channel and the next channel will be the new digit
// if channel has less than 3 digits, the new digit will be added to the next channel
function composeChannel (nextChannel, number) {
  if (nextChannel > 100) {
    return number
  } else {
    return (nextChannel * 10) + number
  }
}
