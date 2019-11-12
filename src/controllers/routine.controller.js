const routineService = require('../services/routine.service')
const papa = require('papaparse')

exports.routine = async function (req, res, next) {
  console.log('here, routine', req.body)
  const period = papa.parse(req.body.period).data
  console.log('period: ', period)
  const start = new Date(period[0][0])
  const finish = new Date(period[0][1])
  let dates = []
  for (let time = new Date(start); time.getTime() <= finish.getTime(); time.setMinutes(time.getMinutes() + 1)) {
    dates.push(time.toString())
  }
  let result = []
  for (let i = 0; i < dates.length; i++) {
    console.log('Checking routine from ', dates[i])
    result.push(await routineService.checkRoutine(dates[i]))
  }
  res.status(200).send({
    data: result
  })
}
