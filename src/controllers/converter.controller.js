const parser = require('../services/parser.service')
const interpreter = require('../services/interpreting.service')

exports.post = async function (req, res, next) {
  const commands = req.body
  const commandsParsed = parser.parse(commands)
  const commandsInterpreted = interpreter.interpretate(commandsParsed)
  res.status(200).send({
    data: commandsInterpreted
  })
  // res.status(400).send({
  //  Erro: `${error}`
  // })
}
