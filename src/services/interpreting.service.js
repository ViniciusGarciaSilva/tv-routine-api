function interpretate (data) {
  console.log('Interpretating')
  let isFinished
  let start = data[0].date
  let finish = 0
  let lastChannel = 500
  let channel = 500
  let nextChannel = 500
  let isMenu = false
  let routine = []
  for (let i = 0; i < data.length; i++) {
    // console.log('\r\n', data[i])
    switch (data[i].button) {
      // CHANNEL
      case 'NET_ONE':
        nextChannel = composeChannel(nextChannel, 1)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_TWO':
        nextChannel = composeChannel(nextChannel, 2)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_THREE':
        nextChannel = composeChannel(nextChannel, 3)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_FOUR':
        nextChannel = composeChannel(nextChannel, 4)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_FIVE':
        nextChannel = composeChannel(nextChannel, 5)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_SIX':
        nextChannel = composeChannel(nextChannel, 6)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_SEVEN':
        nextChannel = composeChannel(nextChannel, 7)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_EIGHT':
        nextChannel = composeChannel(nextChannel, 8)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_NINE':
        nextChannel = composeChannel(nextChannel, 9)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break
      case 'NET_ZERO':
        nextChannel = composeChannel(nextChannel, 0)
        isFinished = data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000
        break

      // USEFUL BUTTONS
      case 'NET_CHANNELUP':
        nextChannel = channel + 1 // missing logic of the last channel
        isFinished = true
        break
      case 'NET_CHANNELDOWN':
        nextChannel = channel - 1
        isFinished = true // todo: delay? Change the channel everytime
        break
      case 'NET_BACK':
        if (!isMenu) {
          nextChannel = lastChannel
          isFinished = true
        }
        break
      case 'NET_UP':
        if (!isMenu) {
          nextChannel++
        }
        break
      case 'NET_DOWN':
      case 'SAM_POWER':
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
    console.log('Switch end. Last Channel: ' + lastChannel + ' Channel: ' + channel + ' NextChannel: ' + nextChannel)
    if ((isFinished && nextChannel !== channel && nextChannel !== 0)) {
      finish = data[i].date
      routine.push({
        channel: channel,
        start: start,
        finish: finish,
        time: finish - start
      })
      lastChannel = channel
      channel = nextChannel
      nextChannel = 0
      isFinished = false
      start = data[i].date
      // console.log('Modifying. Last Channel: ' + lastChannel + ' Channel: ' + channel + ' NextChannel: ' + nextChannel)
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
