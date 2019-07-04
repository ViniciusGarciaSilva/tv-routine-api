function interpretate (command) {
  console.log('Interpretating')
  let isFinished // Command is finished?
  let start = command[0].date // start of the watch period
  let finish = 0 // end of the watch period
  let lastChannel = 500
  let channel = 500
  let nextChannel = 500
  let isMenu = false
  let routine = []
  let isPowerOn = true // tv state when the module was turned on
  for (let i = 0; i < command.length; i++) {
    switch (command[i].button) {
      // CHANNEL
      case 'NET_ONE':
        console.log('\n\rCommand: 1')
        nextChannel = composeChannel(nextChannel, 1)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true // next Button != number ????
        break
      case 'NET_TWO':
        console.log('\n\rCommand: 2')
        nextChannel = composeChannel(nextChannel, 2)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_THREE':
        console.log('\n\rCommand: 3')
        nextChannel = composeChannel(nextChannel, 3)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_FOUR':
        console.log('\n\rCommand: 4')
        nextChannel = composeChannel(nextChannel, 4)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_FIVE':
        console.log('\n\rCommand: 5')
        nextChannel = composeChannel(nextChannel, 5)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_SIX':
        console.log('\n\rCommand: 6')
        nextChannel = composeChannel(nextChannel, 6)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_SEVEN':
        console.log('\n\rCommand: 7')
        nextChannel = composeChannel(nextChannel, 7)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_EIGHT':
        console.log('\n\rCommand: 8')
        nextChannel = composeChannel(nextChannel, 8)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_NINE':
        console.log('\n\rCommand: 9')
        nextChannel = composeChannel(nextChannel, 9)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_ZERO':
        console.log('\n\rCommand: 0')
        nextChannel = composeChannel(nextChannel, 0)
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break

      // USEFUL BUTTONS
      case 'NET_CHANNELUP':
        console.log('\n\rCommand: Ch +')
        nextChannel = channel + 1
        isFinished = true // todo: delay? Change the channel everytime?
        break
      case 'NET_CHANNELDOWN':
        console.log('\n\rCommand: CH -')
        nextChannel = channel - 1
        isFinished = true // todo: delay? Change the channel everytime?
        break
      case 'NET_BACK':
        console.log('\n\rCommand: back')
        if (!isMenu) {
          nextChannel = lastChannel
          isFinished = true
        }
        break
      case 'NET_UP':
        console.log('\n\rCommand: up')
        if (!isMenu) {
          if (nextChannel === 0) {
            nextChannel = channel + 1
          } else {
            nextChannel++
          }
        }
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'NET_DOWN':
        console.log('\n\rCommand: down')
        if (!isMenu) {
          if (nextChannel === 0) {
            nextChannel = channel - 1
          } else {
            nextChannel--
          }
        }
        isFinished = command[i + 1] ? checkFinished(command[i].date.getTime(), command[i + 1].date.getTime()) : true
        break
      case 'SAM_POWER':
        console.log('\n\rCommand: power')
        isPowerOn = !isPowerOn
        start = command[i].date
        console.log('PowerOn: ' + isPowerOn)
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
        break
      // RECORD
      case 'NET_PLAY':
      case 'NET_FORWARD':
      case 'NET_REPLAY':
      case 'NET_STOP':
      case 'NET_REC':
      case 'NET_REVERSE':
        break
    }
    if ((isFinished && nextChannel !== channel && nextChannel !== 0)) {
      finish = command[i].date
      if (isPowerOn) {
        routine.push({
          channel: channel,
          start: start,
          finish: finish,
          time: finish - start
        })
        console.log(routine[routine.length - 1])
      }
      lastChannel = channel
      channel = nextChannel
      nextChannel = 0
      isFinished = false
      start = command[i].date
      isMenu = false
      console.log('Last Channel: ' + lastChannel + ' Channel: ' + channel)
    }
  }
  return routine
}
exports.interpretate = interpretate

// if channel has 3 digits and receive another digit, it means a wrong channel and the next channel will be the new digit
// if channel has less than 3 digits, the new digit will be added to the next channel
function composeChannel (nextChannel, number) {
  if (nextChannel > 100) {
    return number
  } else {
    return (nextChannel * 10) + number
  }
}

// 3000 miliseconds delay between a command and another command
function checkFinished (time1, time2) {
  return time2 - time1 > 3000
}
