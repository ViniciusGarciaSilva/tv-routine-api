const parser = require('../services/parser.service')

exports.post = async function (req, res, next) {
  const input = req.body
  const output = parser.parse(input)
  res.status(200).send({
    data: output
  })
  // res.status(400).send({
  //  Erro: `${error}`
  // })
}
