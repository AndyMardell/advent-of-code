const fs = require('fs')
const path = require('path')

const buffer = fs.readFileSync(path.join(__dirname, '/input.txt'))
const values = buffer.toString().split(',').map(value => parseInt(value))

values[1] = 12
values[2] = 2

let opcodePosition = 0
let finished = false

function runOpcode (opcode) {
  if (opcode.type === 1) {
    values[opcode.storage] = values[opcode.val1] + values[opcode.val2]
  }

  if (opcode.type === 2) {
    values[opcode.storage] = values[opcode.val1] * values[opcode.val2]
  }
}

function runProgram () {
  const opcode = {
    type: values[opcodePosition],
    val1: values[opcodePosition + 1],
    val2: values[opcodePosition + 2],
    storage: values[opcodePosition + 3]
  }

  if (typeof opcode.type === 'undefined') {
    throw new Error('Something went wrong')
  }

  if (opcode.type === 99) {
    return true // Program finished
  }

  runOpcode(opcode)

  opcodePosition = opcodePosition + 4
  return false // Program not finished
}

while (!finished) {
  finished = runProgram()
}

console.log('Program finished', values[0]) // 4023471
