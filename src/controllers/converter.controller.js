const parser = require('../services/parser.service')
const interpreter = require('../services/interpreting.service')
const interpreterIA = require('../services/interpreting-ia.service')
const routineData = require('../data/routine.data')
const papa = require('papaparse')

exports.convert = async function (req, res, next) {
  const commands = papa.parse(req.body).data
  const commandsInterpreted = parseAndInterpreting(commands)
  // console.log(commandsInterpreted)
  res.status(200).send({
    data: commandsInterpreted
  })
}

exports.convertIA = async function (req, res, next) {
  const commands = papa.parse(req.body).data
  const start = new Date(commands[0][0])
  const finish = new Date(commands[0][1])
  console.log('Start: ', start.toString())
  console.log('Finish: ', finish.toString())
  commands.shift()
  const commandsInterpreted = parseAndInterpreting(commands)
  const commandsInterpretedIA = interpreterIA.parse(commandsInterpreted, start, finish)
  const status = await routineData.set(commandsInterpretedIA)
  console.log(status)
  res.status(200).send({
    status: status,
    data: commandsInterpretedIA
  })
}

function parseAndInterpreting (data) {
  const parsed = parser.parse(data)
  return interpreter.interpretate(parsed)
}
