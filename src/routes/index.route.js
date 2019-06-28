'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod }
}

Object.defineProperty(exports, '__esModule', { value: true })
var express1 = __importDefault(require('express'))
var router = express1.default.Router()
router.get('/', function (req, res, next) {
  res.status(200).send({
    title: 'Tv-Routine-Data Server',
    version: '1.0.1'
  })
})
module.exports = router
