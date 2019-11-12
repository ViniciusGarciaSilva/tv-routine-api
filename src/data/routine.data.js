const axios = require('axios')

function get (date) {
  return new Promise((resolve, reject) => {
    // axios.get(`https://tv-routine-db.herokuapp.com/routine/${date.toString()}`)
    axios.get(`http://localhost:8000/routine/${date.toString()}`)
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

function set (data) {
  return new Promise((resolve, reject) => {
    // console.log('data: ', data)
    // axios.post(`https://tv-routine-db.herokuapp.com/routine`, { data: data })
    axios.post('http://localhost:8000/routine', { data: data })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
        reject(error)
      })
  })
}
exports.set = set
