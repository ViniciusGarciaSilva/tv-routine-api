function interpretate (data) {
  console.log('Interpretating')
  let isFinished = true
  let lastChannel = 500
  let channel = 500
  let nextChannel = 500
  let isMenu = false
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    switch (data[i].button) {
      // CHANNEL
      case 'NET_ONE':
        nextChannel = parseChannel(nextChannel, 1)
        break
      case 'NET_TWO':
        nextChannel = parseChannel(nextChannel, 2)
        break
      case 'NET_THREE':
        nextChannel = parseChannel(nextChannel, 3)
        break
      case 'NET_FOUR':
        nextChannel = parseChannel(nextChannel, 4)
        break
      case 'NET_FIVE':
        nextChannel = parseChannel(nextChannel, 5)
        break
      case 'NET_SIX':
        nextChannel = parseChannel(nextChannel, 6)
        break
      case 'NET_SEVEN':
        nextChannel = parseChannel(nextChannel, 7)
        break
      case 'NET_EIGHT':
        nextChannel = parseChannel(nextChannel, 8)
        break
      case 'NET_NINE':
        nextChannel = parseChannel(nextChannel, 9)
        break
      case 'NET_ZERO':
        nextChannel = parseChannel(nextChannel, 0)
        break

      // USEFUL BUTTONS
      case 'NET_CHANNELUP':
        nextChannel++ // missing logic of the last channel
        break
      case 'NET_CHANNELDOWN':
        nextChannel--
        isFinished = true // todo: delay? Change the channel everytime
        break
      case 'NET_BACK':
        if (!isMenu) {
          channel = lastChannel
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
    if (data[i + 1] && (data[i + 1].date.getTime() - data[i].date.getTime()) > 3000) {
      lastChannel = channel
      channel = nextChannel
      nextChannel = 0
      console.log('Modificando. Last Channel: ' + lastChannel + ' Channel: ' + channel + ' NextChannel: ' + nextChannel)
    }
  }
}
exports.interpretate = interpretate

// if channel has 3 digits and receive another digit, it means a wrong channel and the next channel will be the new digit
// if channel has less than 3 digits, the new digit will be added to the next channel
function parseChannel (nextChannel, number) {
  if (nextChannel > 100) {
    return number
  } else {
    return (nextChannel * 10) + number
  }
}
