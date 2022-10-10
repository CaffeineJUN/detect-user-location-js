const button = document.querySelector('button')

button.addEventListener('click', () => {
    if (navigator.geolocation) {
        button.innerText = 'Allow to detect location'
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        button.innerText = 'Your browser not support'
    }
})

function onSuccess(position) {
    button.innerText = 'Detecting your location...'

    let {latitude, longitude} = position.coords
    // https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
        .then(res => res.json())
        .then(result => {
            let allDetails = result.results[0].components
            let {province, postcode, country} = allDetails
            button.innerText = `${province}, ${postcode}, ${country}`
            console.table(allDetails)
        })
        .catch(() => {
            button.innerText = 'something went wrong'
        })
}

function onError(error) {
    if (error.code == 1) {
        button.innerText = 'You denied the request'
    } else if (error.code == 2) {
        button.innerText = 'Location not available'
    } else {
        button.innerText = 'something went wrong'
    }

    button.setAttribute('disabled', 'true')
}
