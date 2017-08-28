const Command = require('./Command')

/**
 * Executes a command.
 * @param {string} cmd - The command.
 * @returns {Promise.<Command>} 
 */
async function command(cmd) {
  const command = new Command(cmd)

  await command.once('done')

  return command
}

/**
 * Executes a command. Throws an error if the exit code is not 0.
 * @param {string} cmd - The command.
 * @returns {Promise.<Command>}
 */
async function works(cmd) {
  const command = new Command(cmd)

  await command.once('done')

  if (command.code) {
    throw new Error(`Command "${cmd}" exited with code ${command.code}.\n${command.err}`)
  }

  return command
}

/**
 * Executes a command. Throws an error if the exit code is 0.
 * @param {string} cmd - The command.
 * @returns {Promise.<Command>} 
 */
async function fails(cmd) {
  const command = new Command(cmd)

  await command.once('done')

  if (!command.code) {
    throw new Error(`Command "${cmd}" exited with code 0.\n${command.out}`)
  }

  return command
}

command.works = works
command.fails = fails
command.Command = Command

module.exports = command
