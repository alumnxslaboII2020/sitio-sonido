const timeRegex = /(\d{2}):(\d{2})/g

// works with time values below an hour in this format nn:nn
function timeParser(time) {
  const [, minutes, seconds] = timeRegex.exec(time)
  timeRegex.lastIndex = 0
  return Number(Number(minutes) * 60 + Number(seconds))
}

export default timeParser
