const fs = require('fs')
const path = require('path')

function getMasses () {
  const buffer = fs.readFileSync(path.join(__dirname, '/input.txt'))

  if (!buffer) {
    return []
  }

  return buffer.toString().split('\n')
}

function fuelRequired (input) {
  if (!input) return 0
  const fuelRequired = Math.floor(input / 3) - 2
  if (fuelRequired < 0) return 0
  return fuelRequired
}

function totalFuelRequired () {
  let fuels = []
  getMasses().map(mass => {
    let fuel = mass
    while (fuel > 0) {
      fuel = fuelRequired(fuel)
      fuels = [
        ...fuels,
        fuel
      ]
    }
  })
  return fuels.reduce((fuelTotal, fuel) => fuelTotal + fuel, 0)
}

console.log(totalFuelRequired()) // 5020494
