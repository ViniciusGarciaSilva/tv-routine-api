const parser = require('../services/parser.service')
const interpreter = require('../services/interpreting.service')

exports.post = async function (req, res, next) {
  const input = req.body
  const parsed = parser.parse(input)
  console.log('Parsed: ', parsed)
  const interpreted = interpreter.interpretate(parsed)
  res.status(200).send({
    data: interpreted
  })
  // res.status(400).send({
  //  Erro: `${error}`
  // })
}
