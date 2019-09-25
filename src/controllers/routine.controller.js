const routineService = require('../services/routine.service')

exports.routine = async function (req, res, next) {
  const data = req.body.data
  let result = []
  for (let i = 0; i < data.length; i++) {
    console.log('Checking routine from ', data[i].date)
    result.push(routineService.checkRoutine(data[i].date))
  }
  res.status(200).send({
    data: result
  })
}
