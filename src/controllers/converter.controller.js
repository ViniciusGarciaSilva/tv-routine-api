const translator = require('../services/translator.service')
const interpreter = require('../services/interpreter.service')
const routineData = require('../data/routine.data')
const papa = require('papaparse')

// basically for test
exports.translate = async function (req, res, next) {
  console.log('Translating')
  const commands = papa.parse(req.body).data
  const commandsTranslated = translator.translate(commands)
  res.status(200).send({
    data: commandsTranslated
  })
}

// basically for test
exports.interpretate = async function (req, res, next) {
  console.log('Interpretating')
  const commands = papa.parse(req.body).data
  const commandsTranslated = translator.translate(commands)
  const commandsInterpretated = interpreter.interpretate(commandsTranslated)
  res.status(200).send({
    data: commandsInterpretated
  })
}

exports.convert = async function (req, res, next) {
  const commands = papa.parse(req.body).data
  const start = new Date(commands[0][0])
  const finish = new Date(commands[0][1])
  commands.shift()
  const commandsTranslated = translator.translate(commands)
  const commandsInterpretated = interpreter.interpretate(commandsTranslated)
  const commandsFilled = interpreter.fill(commandsInterpretated, start, finish)
  const status = await routineData.set(commandsFilled)
  console.log(status)
  res.status(200).send({
    start: start,
    finish: finish,
    status: status,
    data: commandsFilled
  })
}
