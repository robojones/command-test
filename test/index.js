const assert = require('assert')

describe('command-test', function () {
  const command = require('..')

  const validCommand = 'node -e \'console.log("hi")\''
  const invalidCommand = 'node -e \'throw new Error("WROONG!!!")\''

  describe('command(cmd, exitCode)', function () {
    it('should always resolve to a command object', async function () {
      await command(validCommand)
      await command(invalidCommand)
    })
  })

  describe('command.works(cmd)', function () {
    it('should not throw if the command exits with exit code == 0', async function () {
      await command.works(validCommand)
    })

    it('should throw if the command exits with an exit code != 0', async function () {
      try {
        await command.works(invalidCommand)
      } catch (err) {
        return
      }

      throw new Error('No error was thrown.')
    })
  })

  describe('command.fails(cmd)', function () {
    it('should not throw if the command exits with exit code != 0', async function () {
      await command.fails(invalidCommand)
    })

    it('should throw if the command exits with an exit code == 0', async function () {
      try {
        await command.fails(validCommand)
      } catch (err) {
        return
      }

      throw new Error('No error was thrown.')
    })
  })
})
