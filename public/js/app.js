const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherPic = document.querySelector('#weatherpic')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    weatherPic.src = ''
    

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        
        if (data.Error) {
            console.log(data.Error)
            messageOne.textContent = data.Error            
        } else {            
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            weatherPic.src = data.weatherImg
            
        }
        
    })
})
})