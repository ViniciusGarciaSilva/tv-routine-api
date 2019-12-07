'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod }
}

Object.defineProperty(exports, '__esModule', { value: true })
var express1 = __importDefault(require('express'))
var router = express1.default.Router()
var converterController = require('../controllers/converter.controller')
router.post('/translate', converterController.translate)
router.post('/interpretate', converterController.interpretate)
router.post('/convert', converterController.convert)
module.exports = router
