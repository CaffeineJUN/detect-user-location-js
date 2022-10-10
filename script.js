const button = document.querySelector('button')

button.addEventListener('click', () => {
    console.log(navigator.geolocation)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        button.innerText = 'Your browser not support'
    }
})

function onSuccess(position) {
    console.log(position)
}

function onError(error) {
    if (error.code == 1) {
        button.innerText = 'You denied the request'
    } else if (error.code == 2) {
        button.innerText = 'Location not available'
    } else {
        button.innerText = 'something went wrong'
    }
}
