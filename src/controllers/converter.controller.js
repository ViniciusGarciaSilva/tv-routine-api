const translator = require('../services/translator.service')
const interpreter = require('../services/interpreter.service')
const simulation = require('../services/simulation.service')
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

exports.transform = async function (req, res, next) {
  const data = papa.parse(req.body).data
  console.log(data)
  const start = new Date(data[0][0])
  const finish = new Date(data[0][1])
  const simulationDate = new Date(data[1][0])
  const commands = data.slice(2)
  const newCommands = simulation.transformDate(commands, simulationDate, start, finish)
  console.log('oldCommands: ', commands)
  console.log('newCommands: ', newCommands)
  const newDataCSV = papa.unparse(newCommands)
  console.log('CSV: ', newDataCSV)
  res.status(200).send({
    data: newDataCSV
  })
}

exports.convertSimulation = async function (req, res, next) {
  const commands = papa.parse(req.body).data
  const fakeStart = new Date(commands[0][0])
  const fakeFinish = new Date(commands[0][1])
  const simulationDate = new Date(commands[1][0])
  const start = new Date(commands[2][0])
  const finish = new Date(commands[3][1])
  console.log('start:     ', start, ' finish:     ', finish, ' date:', simulationDate)
  console.log('fakestart: ', fakeStart, ' fakefinish: ', fakeFinish)
  commands.shift()
  commands.shift()
  commands.shift()
  console.log('Commands: ', commands)
  const newCommands = commands.map(command => {
    let newLog = command
    let oldTimestamp = new Date(command[0] * 1000).getTime() // timestamp(string) => date => timestramp (int)
    let newTimestamp = new Date((simulationDate.getTime() + oldTimestamp - start.getTime())).getTime() / 1000
    console.log('simulationDate: ', simulationDate.getTime())
    console.log('oldTimeStamp:   ', oldTimestamp)
    console.log('start:          ', start.getTime())
    console.log('newTimeStamp:   ', newTimestamp, '\n')
    newLog[0] = newTimestamp.toString()
    return newLog
  })
  console.log('New Commands: ', newCommands)
  const commandsTranslated = translator.translate(newCommands)
  const commandsInterpretated = interpreter.interpretate(commandsTranslated)
  const commandsFilled = interpreter.fill(commandsInterpretated, fakeStart, fakeFinish)
  const status = await routineData.set(commandsFilled)
  console.log(status)
  res.status(200).send({
    start: start.toString(),
    finish: finish.toString(),
    status: status.toString(),
    data: commandsFilled
  })
}

exports.convert = async function (req, res, next) {
  const commands = papa.parse(req.body).data
  const start = new Date(commands[0][0])
  const finish = new Date(commands[0][1])
  commands.shift()
  console.log('Commands: ', commands)
  const commandsTranslated = translator.translate(commands)
  console.log('Commands translated: ', commandsTranslated)
  const commandsInterpretated = interpreter.interpretate(commandsTranslated)
  console.log('Commands interpretated: ', commandsInterpretated)
  const commandsFilled = interpreter.fill(commandsInterpretated, start, finish)
  const status = await routineData.set(commandsFilled)
  console.log(status)
  res.status(200).send({
    start: start.toString(),
    finish: finish.toString(),
    status: status.toString(),
    data: commandsFilled
  })
}
