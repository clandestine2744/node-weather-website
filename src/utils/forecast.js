const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=404116a42314d3e161f3b9f2de2a7a51&query=' + latitude + ',' + longitude + '&units=m'

        
    request({url, json: true}, (error, {body}= {}) => {
        
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')  
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. Its currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees.' )
         }
    })
}

module.exports = forecast