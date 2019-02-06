//===================================clock===========================================//
function timeupdateHours () {
	let today = new Date()
	let hours = today.getHours()<10 ? "0" + today.getHours() : today.getHours()
	return hours
}

function timeupdateMinutes () {
	let today = new Date()
	let minutes = today.getMinutes()<10 ? "0" + today.getMinutes() : today.getMinutes()
	return minutes
}

function showtime () {
	document.getElementById("hours").innerHTML = timeupdateHours()
	document.getElementById("minutes").innerHTML = timeupdateMinutes()
}
//===================================================================================//

//================================ : blink ==========================================//
// function blinkTwoPoints () {	
// 	let current = document.getElementsByClassName("two-points")[0]
	
// 	if (current.className.indexOf('invisible') > -1) {
// 		current.className = current.className.replace(" invisible", "")
// 	}

// 	else {
// 		current.className += " invisible"
// 	}
// }
//===================================================================================//

//===========================change background image=================================//
let backgroundImages = []
let currentImageIndex = 0

function initBackgroundRotation () {
	backgroundImages = document.getElementsByClassName('background-images')[0].children
	currentImageIndex = backgroundImages.length - 1
	backgroundImages[currentImageIndex].className = 'active'
}

function changeBackground () {
	console.log(backgroundImages, currentImageIndex)
	let currentImage = backgroundImages[currentImageIndex]
	
	// Start fading out the current image.
	currentImage.className = 'active fade-out'

	// Next image becomes active.
	currentImageIndex = (backgroundImages.length + (currentImageIndex - 1)) % backgroundImages.length
	backgroundImages[currentImageIndex].className = 'active'
	
	// After 700ms, the current image loses the active class & the next image becomes active.
	setTimeout(function(){
		currentImage.className = ''
	}, 8000)
}



// let backgroundImages = ['url("image/backgroundImage1.jpg")', 'url("image/backgroundImage2.jpg")', 'url("image/backgroundImage3.jpg")', 'url("image/backgroundImage4.jpg")', 'url("image/backgroundImage5.jpg")', 'url("image/backgroundImage6.jpg")']

// function changeBackground () {
// 	let body = document.getElementsByTagName("body")[0]
// 	let currentImage = body.style.backgroundImage
// 	let currentImageIndex = 0
	
// 	for (let i=0; i<backgroundImages.length; i++) {
// 		if (currentImage === backgroundImages[i]) { 
// 			currentImageIndex = i
// 		}
// 	}

// 	currentImage = backgroundImages[(currentImageIndex + 1) % backgroundImages.length]
// }
//===================================================================================//

//======================close popup when clicked outside ============================//
// window.addEventListener ('mouseup', function (event) {

// let boxArray = [document.getElementById("links-popup-window"),document.getElementById("meteo-popup-window"),document.getElementById("settings-popup-window")]
// let labelArray = [document.getElementById("links"),document.getElementById("meteo"),document.getElementById("settings")]
// let checkboxArray = [document.getElementById("links-checkbox"),document.getElementById("meteo-checkbox"),document.getElementById("settings-checkbox")]

// 	for(let i=0; i < boxArray.length; i++){
// 		let label = labelArray[i]
// 		let box = boxArray[i]
// 		let checkbox = checkboxArray[i]

// 		if (event.target !== box && event.target !== label && event.target.parentNode != box) {
// 			checkbox.checked = false
// 		}
// 	}
// })


let isLinksPopupOpen = false

$(document).click(function (e) {
	let container = $('#links-popup-window')

	if ($(e.target).is('#links') && !isLinksPopupOpen) {
		container.show()
		isLinksPopupOpen = true
	}
	else if (!$(e.target).is(container) && !container.has(e.target).length) {
		container.hide()
		isLinksPopupOpen = false
	}
})

let isMeteoPopupOpen = false

$(document).click(function (e) {
	let container = $('#meteo-popup-window')

	if ($(e.target).is('.meteo-btn') && !isMeteoPopupOpen) {
		container.show()
		isMeteoPopupOpen = true
	}
	else if (!$(e.target).is(container) && !container.has(e.target).length) {
		container.hide()
		isMeteoPopupOpen = false
	}
})

let isSettingsPopupOpen = false

$(document).click(function (e) {
	let container = $('#settings-popup-window')

	if ($(e.target).is('#settings') && !isSettingsPopupOpen) {
		container.show()
		isSettingsPopupOpen = true
		$('#settings').addClass('rotate') 
	}
	else if (!$(e.target).is(container) && !container.has(e.target).length) {
		container.hide()
		isSettingsPopupOpen = false
		$('#settings').removeClass('rotate') 
	}
})
//===================================================================================//

//=======================show whole background on mouseover==========================//
window.addEventListener ('mouseover', function (event) {
	if (event.target === document.getElementById("geolocation-block") || event.target === document.getElementsByClassName("geolocation-author")[0] || event.target === document.getElementsByClassName("geolocation")[0]) {
		document.getElementsByClassName("toggle-off")[0].className = document.getElementsByClassName("toggle-off")[0].className.replace("toggle-off", "toggle-on")
	}
})

window.addEventListener ('mouseout', function (event) {
	if (event.target === document.getElementById("geolocation-block") || event.target === document.getElementsByClassName("geolocation-author")[0] || event.target === document.getElementsByClassName("geolocation")[0]) {
		document.getElementsByClassName("toggle-on")[0].className = document.getElementsByClassName("toggle-on")[0].className.replace("toggle-on", "toggle-off")
	}
})
//===============================window onload=======================================//
window.onload = function () {
	showtime()
	setInterval(showtime, 60000)
	initBackgroundRotation()
	setInterval(changeBackground, 8000)
	// setInterval(blinkTwoPoints, 1000)
}