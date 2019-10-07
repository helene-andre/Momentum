//================================== clock ==========================================//
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

//========================== change background image ================================//
let backgroundImages = []
let currentImageIndex = 0

function initBackgroundRotation () {
	backgroundImages = document.getElementsByClassName('background-images')[0].children
	currentImageIndex = backgroundImages.length - 1
	backgroundImages[currentImageIndex].className = 'active'
}

function changeBackground () {
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
//===================================================================================//

//======================close popup when clicked outside ============================//
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

//====================== show whole background on mouseover =========================//
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
//============================== window onload ======================================//
window.onload = function () {
	showtime()
	setInterval(showtime, 60000)
	initBackgroundRotation()
	setInterval(changeBackground, 8000)
}