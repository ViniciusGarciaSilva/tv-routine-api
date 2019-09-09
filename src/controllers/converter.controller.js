const parser = require('../services/parser.service')
const interpreter = require('../services/interpreting.service')
const interpreterIA = require('../services/interpreting-ia.service')
const papa = require('papaparse')

exports.convert = async function (req, res, next) {
  const commandsInterpreted = parseAndInterpreting(req.body)
  res.status(200).send({
    data: commandsInterpreted
  })
}

exports.convertIA = async function (req, res, next) {
  const commands = papa.parse(req.body).data
  const start = new Date(commands[0][0])
  const finish = new Date(commands[0][1])
  commands.shift()
  const commandsInterpreted = parseAndInterpreting(commands)
  const commandsInterpretedIA = interpreterIA.parse(commandsInterpreted, start, finish)
  res.status(200).send({
    data: papa.unparse(commandsInterpretedIA)
  })
}

function parseAndInterpreting (data) {
  const parsed = parser.parse(data)
  return interpreter.interpretate(parsed)
}
