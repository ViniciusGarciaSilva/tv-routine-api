const routineService = require('../services/routine.service')
const papa = require('papaparse')

exports.routine = async function (req, res, next) {
  console.log('\nCHECKING ROUTINE')
  const period = papa.parse(req.body.period).data
  const start = new Date(period[0][0])
  const finish = new Date(period[0][1])
  let dates = []
  for (let time = new Date(start); time.getTime() <= finish.getTime(); time.setSeconds(time.getSeconds() + 10)) {
    dates.push(time.toString())
  }
  let routines = []
  for (let i = 0; i < dates.length; i++) {
    console.log('\nChecking routine from ', dates[i])
    const result = await routineService.checkRoutine(dates[i])
    if (result !== null) {
      routines.push(result)
    }
  }
  console.log('\n\nfinishing routine: ', routines)
  res.status(200).send({
    data: routines
  })
}
