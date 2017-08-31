# command-test
The easy way to test commands.

[![Build Status](https://travis-ci.org/robojones/command-test.svg?branch=master)](https://travis-ci.org/robojones/command-test)
[![Test Coverage](https://codeclimate.com/github/robojones/command-test/badges/coverage.svg)](https://codeclimate.com/github/robojones/command-test/coverage)

[![bitHound Code](https://www.bithound.io/github/robojones/command-test/badges/code.svg)](https://www.bithound.io/github/robojones/command-test)
[![bitHound Overall Score](https://www.bithound.io/github/robojones/command-test/badges/score.svg)](https://www.bithound.io/github/robojones/command-test)
[![bitHound Dependencies](https://www.bithound.io/github/robojones/command-test/badges/dependencies.svg)](https://www.bithound.io/github/robojones/command-test/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/robojones/command-test/badges/devDependencies.svg)](https://www.bithound.io/github/robojones/command-test/master/dependencies/npm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```
npm i command-test --save
```

## Docs

### command(cmd)

This function runs the given command.

__Returns__ a `<Promise>` that resolves to a [Command](#class-command) object.

```javascript
const command = require('command-test')

async function example() {
  const cmd = await command('node -v')

  cmd.code // 0
  cmd.out // "v8.1.4"
  cmd.err // ""
}

example()
```

### command.works(cmd)
This function runs the given command. If the command's exit code __is not 0__, an error gets thrown.

__Returns__ a `<Promise>` that resolves to a [Command](#class-command) object.

```javascript
const command = require('command-test')

async function example() {
  const cmd = await command.works('node -v')
  command.code // 0
  command.out // "v8.1.4"
  command.err // ""

  await command.fails('non-existent-command')
  // Throws an error because the command has an exit code 1
}

example()
```

### command.fails(cmd)
This function runs the given command. If the command's exit code __is 0__, an error gets thrown.

__Returns__ a `<Promise>` that resolves to a [Command](#class-command) object.

```javascript
const command = require('command-test')

async function example() {
  const cmd = await command.fails('non-existent-command')
  cmd.code // 1
  cmd.err // "/bin/sh: 1: huhn: not found\n"
  cmd.out // ""

  await command.fails('node -v')
  // Throws an error because the command has an exit code 0
}

example()
```

### Class: Command

Represents a command.

This class extends [BetterEvents](https://npmjs.com/package/better-events).
Therefore you can await events if you don't pass a listener to the `.once()` method.

#### Example
```javascript
const { Command } = require('command-test')

async function example() {
  const command = new Command('node -v')

  await command.once('done')

  command.code // 0
  command.out // "v8.1.4"
  command.err // ""
}

example()
```

#### Event: "done"
This event is emitted as soon as the command exits.

```javascript
await command.once('done')

// or
command.once('done', () => {

})

// or
command.on('done', () => {

})
```

#### Property: out
This property is a `<string>` that stores everything that the command has written to the stdout stream.

#### Property: err

This property is a `<string>` that stores everything that the command has written to the __stderr__ stream.

#### Property: code
This property stores the __exit code__ `<number>` of the command.

#### Property: stdout
This property is a reference to the stdout of the command's child_process

#### Property: stderr
This property is a reference to the stderr of the command's child_process