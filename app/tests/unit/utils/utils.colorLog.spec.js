const chalk = require('chalk')
import {inspect} from 'util'
import { log, colorLog } from '@/utils/colorLog'

// jest.mock('chalk')
// mocking chalk throws error when it tries to run that
// not needing to test that it uses the correct color anyway
jest.mock('util')
const originalConsole = console
// originalConsole.log(chalk)
const logMock = jest.fn()
console = {}
console.log = logMock
describe('utils.colorLog', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
  describe('utils.colorLog.log', () => {
    it('runs a call to inspect to ensure circular object print', () => {
      const color = 'blue'
      const message = 'test'
      log(color, message)
      expect(inspect).toHaveBeenCalledWith(message)
    })
  })
  describe('utils.colorLog.colorLog', () => {
    it('runs a call to console.log using a given color', () => {
      const color = 'blue'
      const message = 'test'
      colorLog(message, color)
      expect(console.log).toHaveBeenCalledWith(`%c` + `${message}`, `color:` + `${color}`)
      // expect(console.log).toHaveBeenCalledWith(message)
    })
    it('runs a call to console.log using a given color and background color', () => {
      const message = 'test'
      const color = 'blue'
      const background = 'green'
      colorLog(message, color, background)
      expect(console.log).toHaveBeenCalledWith(`%c` + `${message}`, `color:` + `${color};background:${background}`)
      // expect(console.log).toHaveBeenCalledWith(message)
    })
    it('runs a call to console.log defaulting to black when no color used', () => {
      const message = 'test'
      const color = 'black'
      colorLog(message)
      expect(console.log).toHaveBeenCalledWith(`%c` + `${message}`, `color:` + `${color}`)
      // expect(console.log).toHaveBeenCalledWith(message)
    })
  })
})