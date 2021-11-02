exports.convertStrValueToNum = (obj, key) => {
  let convertedObj = { ...obj }
  convertedObj[key] = parseInt(convertedObj[key])
  console.log(convertedObj)
  return convertedObj
}
