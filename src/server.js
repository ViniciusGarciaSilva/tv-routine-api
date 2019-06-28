// Load HTTP module
const hostname = 'localhost'
const port = 8000

const app = require('./app')

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
