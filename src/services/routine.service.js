const db = require('./db.service')

function checkRoutine (date) {
  let channels = []
  let routine = []
  let filtered = []
  let result = {
    date: date,
    ch: 0,
    powerOn: false
  }
  let newDate

  for (let i = 1; i <= 5; i++) {
    newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 7 * i)
    /**
    newDate.setMinutes(newDate.getMinutes() - 5) // start 5 minutes before the target date
    for ( let j=0; j<=10; j++) {
      newDate.setMinutes(newDate.getMinutes() + 1)
    }
    **/
    routine.push(db.get(newDate))
  }
  filtered = routine.filter(element => element.ch !== 0)
  channels = countChannels(filtered)
  if (filtered.length >= 3) {
    result.powerOn = true
  }
  for (let i = 0; i < channels.length; i++) {
    if (channels[i].counter >= 3) {
      result.ch = channels[i].channel
    }
  }
  return result
}
exports.checkRoutine = checkRoutine

function countChannels (channels) {
  let result = []
  let index
  for (let i = 0; i < channels.length; i++) {
    index = result.findIndex(element => element.channel === channels[i].ch)
    if (index === -1) {
      console.log('1')
      result.push({
        channel: channels[i].ch,
        counter: 1
      })
    } else {
      console.log('2')
      result[index].counter++
    }
  }
  return result
}
