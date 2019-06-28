const converter = require('../data/converter.data')

exports.post = async function (req, res, next) {
  const input = req.body
  const output = converter.convert(input)
  res.status(200).send({
    data: output
  })
  // res.status(400).send({
  //  Erro: `${error}`
  // })
}
