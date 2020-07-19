function pathOr(fallbackValue = undefined, path = [], object = {}) {
  if (!Array.isArray(path)) throw new Error("path variable must be an array")
  if (path.length === 0) return fallbackValue
  const [key, ...rest] = path
  return path.length === 1
    ? object[key] || fallbackValue
    : pathOr(fallbackValue, rest, object[key])
}

export default pathOr
