// const db = require('./db.service')
const db = require('../data/routine.data')

async function checkRoutine (date) {
  return new Promise((resolve, reject) => {
    let channels = []
    let lastWeeksWatched
    let result = {
      date: date,
      ch: 0,
      powerOn: false
    }
    getLastWeeks(date)
      .then(lastWeeks => {
        lastWeeksWatched = lastWeeks.filter(element => element.channel !== '0')
        console.log('lastWeeks: ', lastWeeksWatched)
        channels = countChannels(lastWeeksWatched)
        console.log('Channels: ', channels)
        if (lastWeeksWatched.length >= 2) {
          result.powerOn = true
        }
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].counter >= 2) {
            result.ch = channels[i].channel
          }
        }
        if (result.ch !== 0) {
          console.log('Returning: ', result)
          resolve(result)
        } else {
          resolve(null)
        }
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}
exports.checkRoutine = checkRoutine

async function getLastWeeks (date) {
  let newDate
  let lastWeek = []
  let result = []

  return new Promise(async (resolve, reject) => {
    for (let i = 1; i <= 2; i++) {
      newDate = new Date(date)
      newDate.setDate(newDate.getDate() - 7 * i)
      lastWeek.push(newDate)
    }
    console.log('Routine.service - getLastWeeks - lasweek: ', lastWeek)
    for (const lastWeekDay of lastWeek) {
      await db.get(lastWeekDay)
        .then(response => {
          console.log('Searching for date: ', date)
          console.log('Result: ', response)
          if (response !== null) {
            result.push(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    }
    resolve(result)
  })
}

function countChannels (channels) {
  let result = []
  let index
  if (channels.length === 0) {
    return result
  }
  result.push({
    channel: channels[0].channel,
    counter: 1
  })
  for (let i = 1; i < channels.length; i++) {
    index = result.findIndex(element => element.channel === channels[i].channel)
    if (index === -1) {
      result.push({
        channel: channels[i].channel,
        counter: 1
      })
    } else {
      result[index].counter++
    }
  }
  return result
}
