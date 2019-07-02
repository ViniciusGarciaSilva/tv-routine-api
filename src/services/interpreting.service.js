function interpretate (data) {
  for (let i = 0; i < data.length; i++) {
    switch (data) {
      // CHANNEL
      case 'NET_ONE':
      case 'NET_TWO':
      case 'NET_THREE':
      case 'NET_FOUR':
      case 'NET_FIVE':
      case 'NET_SIX':
      case 'NET_SEVEN':
      case 'NET_EIGHT':
      case 'NET_NINE':
      case 'NET_ZERO':
        break
      // USEFUL BUTTONS
      case 'NET_CHANNELUP':
      case 'NET_CHANNELDOWN':
      case 'NET_BACK':
      case 'NET_UP':
      case 'NET_DOWN':
      case 'NET_LEFT':
      case 'NET_RIGHT':
      case 'SAM_POWER':
        break
      // EXTRA MENU NAVIGATION
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
  }
}
exports.interpretate = interpretate
