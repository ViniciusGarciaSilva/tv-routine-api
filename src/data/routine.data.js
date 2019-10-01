const axios = require('axios')

function get (date) {
  return new Promise((resolve, reject) => {
    axios.get(`https://tv-routine-db.herokuapp.com/routine/${date.toISOString()}`)
      .then(function (response) {
        if (response.data.length === 0) {
          resolve('No result')
        } else {
          resolve(response.data[0])
        }
      })
      .catch(function (error) {
        console.log(error)
        reject(error)
      })
  })
}
exports.get = get
