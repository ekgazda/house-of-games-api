const app = require('./app')

const { port = 8888 } = process.env

app.listen(port, () => {
  console.log(`listening for games on ${port}...`)
})
