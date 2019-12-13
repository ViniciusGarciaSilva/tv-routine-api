function transformDate (commands, date, start, finish) {
  const newCommands = commands.map(command => {
    let newCommand = command
    let oldTimestamp = new Date(command[0] * 1000)
    let newTimestamp = new Date((date.getTime() + oldTimestamp.getTime() - start.getTime())).getTime() / 1000
    console.log('old:   ', oldTimestamp, '\nnew:   ', newTimestamp * 1000, '\ndate:  ', date.getTime(), '\nstart: ', start.getTime())
    newCommand[0] = newTimestamp.toString()
    return newCommand
  })
  return newCommands
}
exports.transformDate = transformDate
