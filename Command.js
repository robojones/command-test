const BetterEvents = require('better-events')
const { StringDecoder } = require('string_decoder')
const { spawn } = require('child_process')

const defaultConfig = {
  stdio: 'pipe',
  shell: true
}

/**
 * Class representing a command.
 * @class
 */
class Command extends BetterEvents {
  /**
   * Create a new command.
   * @param {string} command - The name of the command.
   * @param {string[]} args - Arguments for the command.
   * @param {{string: *}} opts - Options for the command.
   */
  constructor(command, args = [], opts = {}) {
    super()

    this.command = command

    const c = Object.assign({}, defaultConfig, opts)
    const child = spawn(command, args, c)

    this.collect('error', child)

    // save stderr

    this.err = ''
    this.stderr = child.stderr
    const errDecoder = new StringDecoder('utf8')

    child.stderr.on('data', chunk => {
      this.err += errDecoder.write(chunk)
    })

    child.stderr.on('close', () => {
      this.err += errDecoder.end()
    })

    // save stdout

    this.out = ''
    this.stdout = child.stdout
    const outDecoder = new StringDecoder('utf8')

    child.stdout.on('data', chunk => {
      this.out += outDecoder.write(chunk)
    })

    child.stdout.on('close', () => {
      this.out += outDecoder.end()
    })

    // wait for process to exit

    child.on('exit', code => {
      this.code = code

      this.emit('done')
    })
  }
}

module.exports = Command
