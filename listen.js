const app = require('./app')

const { PORT = 8888 } = process.env

app.listen(PORT, () => {
  console.log(`listening for games on ${PORT}...`)
})
