const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars view engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ash'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Ash'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Some useful help message goes here',
        name: 'Ash'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }


    geocode(address, (error, {latitude,longitude,location} = {}) => {
        
        if (error) {
           return res.send({
               Error:  error
            })
        }
       
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    Error:  error
                 })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address
            })
            
          })
        })


    
})

app.get( '/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please enter search value'
        })
    }
    console.log(req.query)
    res.send ({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: 'Opps something went wrong!',
        message: 'Help article not found',
        name: 'Ash',
        link: '/help'
    })
    
})

app.get('*',(req, res) => {
    res.render('404', {
        title: 'Opps something went wrong!',
        message: 'Page not found',
        name: 'Ash',
        link: '/'
    })
})


app.listen(3000, () => {
    console.log('Server started on port 3000.')
})