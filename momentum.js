//================================== clock ==========================================//
function getTime () {
  let today = new Date()
  let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours()
  let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
	$('#hours').html(hours)
	$('#minutes').html(minutes)
	greetingMessage(hours)
}
//===================================================================================//

//=============================== greeting ==========================================//
// Set a greeting message based on the hour.
function greetingMessage (currentHour) {
	let message = ''
	if (currentHour >= 5 && currentHour < 12) message = 'Good morning'
	else if (currentHour >= 12 && currentHour < 18) message = 'Good afternoon'
	else message = 'Good evening'
	$('.greeting__message').html(message + ',&nbsp;')
}

function checkUsername () {
	let $usernameInput = $('.greeting__username')
	if (localStorage.username) $usernameInput.html(localStorage.username)
	$usernameInput[localStorage.username ? 'removeClass' : 'addClass']('empty')

	$usernameInput
		.on('keyup', function (e) {
			localStorage.username = this.innerHTML
		})
		.on('keypress', function (e) {
			if (e.which === 13) $(this).blur()
		})
		.on('focus', function (e) {
			$usernameInput.addClass('focus highlight')
			setTimeout(function () {$usernameInput.removeClass('highlight')}, 300)
		})
		.on('blur', function (e) {
			localStorage.username = this.innerHTML
			$usernameInput.removeClass('focus')
			$usernameInput[localStorage.username ? 'removeClass' : 'addClass']('empty')

			$usernameInput.addClass('highlight')
			setTimeout(function () {$usernameInput.removeClass('highlight')}, 300)
		})
}
//===================================================================================//

//================== close popup window when clicked outside ========================//
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

	if (($(e.target).is('.meteo-btn') || $(e.target).is('.meteo-btn__item')) && !isMeteoPopupOpen) {
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

	if ($(e.target).is('#settings-label') && !isSettingsPopupOpen) {
		container.show()
		isSettingsPopupOpen = true
		$('#settings-label').addClass('rotate')
	}
	else if (!$(e.target).is(container) && !container.has(e.target).length) {
		container.hide()
		isSettingsPopupOpen = false
		$('#settings-label').removeClass('rotate')
	}
})
//===================================================================================//

//====================== show whole background on mouseover =========================//
window.addEventListener ('mouseover', function (event) {
	if (event.target === document.getElementById('geolocation-block') || event.target === document.getElementsByClassName('geolocation-author')[0] || event.target === document.getElementsByClassName('geolocation')[0]) {
		document.getElementsByClassName('toggle-off')[0].className = document.getElementsByClassName('toggle-off')[0].className.replace('toggle-off', 'toggle-on')
	}
})

window.addEventListener ('mouseout', function (event) {
	if (event.target === document.getElementById('geolocation-block') || event.target === document.getElementsByClassName('geolocation-author')[0] || event.target === document.getElementsByClassName('geolocation')[0]) {
		document.getElementsByClassName('toggle-on')[0].className = document.getElementsByClassName('toggle-on')[0].className.replace('toggle-on', 'toggle-off')
	}
})
//===================================================================================//

//============================== Weather & location =================================//
// Get location using https://ipinfo.io .
function getUserLocation () {
	$.get('https://ipinfo.io', function(location) {
		let loc = location.loc;
		getWeather(loc);

		let countryCodes = {
			AF: 'Afghanistan', AX: 'Aland Islands', AL: 'Albania', DZ: 'Algeria', AS: 'American Samoa', AD: 'Andorra', AO: 'Angola', AI: 'Anguilla', AQ: 'Antarctica', AG: 'Antigua And Barbuda', AR: 'Argentina', AM: 'Armenia', AW: 'Aruba', AU: 'Australia', AT: 'Austria', AZ: 'Azerbaijan', BS: 'Bahamas', BH: 'Bahrain', BD: 'Bangladesh', BB: 'Barbados', BY: 'Belarus', BE: 'Belgium', BZ: 'Belize', BJ: 'Benin', BM: 'Bermuda', BT: 'Bhutan', BO: 'Bolivia', BA: 'Bosnia And Herzegovina', BW: 'Botswana', BV: 'Bouvet Island', BR: 'Brazil', IO: 'British Indian Ocean Territory', BN: 'Brunei Darussalam', BG: 'Bulgaria', BF: 'Burkina Faso', BI: 'Burundi', KH: 'Cambodia', CM: 'Cameroon', CA: 'Canada', CV: 'Cape Verde', KY: 'Cayman Islands', CF: 'Central African Republic', TD: 'Chad', CL: 'Chile', CN: 'China', CX: 'Christmas Island', CC: 'Cocos (Keeling) Islands', CO: 'Colombia', KM: 'Comoros', CG: 'Congo', CD: 'Congo, Democratic Republic', CK: 'Cook Islands', CR: 'Costa Rica', CI: 'Cote D\'Ivoire', HR: 'Croatia', CU: 'Cuba', CY: 'Cyprus', CZ: 'Czech Republic', DK: 'Denmark', DJ: 'Djibouti', DM: 'Dominica', DO: 'Dominican Republic', EC: 'Ecuador', EG: 'Egypt', SV: 'El Salvador', GQ: 'Equatorial Guinea', ER: 'Eritrea', EE: 'Estonia', ET: 'Ethiopia', FK: 'Falkland Islands (Malvinas)', FO: 'Faroe Islands', FJ: 'Fiji', FI: 'Finland', FR: 'France', GF: 'French Guiana', PF: 'French Polynesia', TF: 'French Southern Territories', GA: 'Gabon', GM: 'Gambia', GE: 'Georgia', DE: 'Germany', GH: 'Ghana', GI: 'Gibraltar', GR: 'Greece', GL: 'Greenland', GD: 'Grenada', GP: 'Guadeloupe', GU: 'Guam', GT: 'Guatemala', GG: 'Guernsey', GN: 'Guinea', GW: 'Guinea-Bissau', GY: 'Guyana', HT: 'Haiti', HM: 'Heard Island & Mcdonald Islands', VA: 'Holy See (Vatican City State)', HN: 'Honduras', HK: 'Hong Kong', HU: 'Hungary', IS: 'Iceland', IN: 'India', ID: 'Indonesia', IR: 'Iran, Islamic Republic Of', IQ: 'Iraq', IE: 'Ireland', IM: 'Isle Of Man', IL: 'Israel', IT: 'Italy', JM: 'Jamaica', JP: 'Japan', JE: 'Jersey', JO: 'Jordan', KZ: 'Kazakhstan', KE: 'Kenya', KI: 'Kiribati', KR: 'Korea', KW: 'Kuwait', KG: 'Kyrgyzstan', LA: 'Lao People\'s Democratic Republic', LV: 'Latvia', LB: 'Lebanon', LS: 'Lesotho', LR: 'Liberia', LY: 'Libyan Arab Jamahiriya', LI: 'Liechtenstein', LT: 'Lithuania', LU: 'Luxembourg', MO: 'Macao', MK: 'Macedonia', MG: 'Madagascar', MW: 'Malawi', MY: 'Malaysia', MV: 'Maldives', ML: 'Mali', MT: 'Malta', MH: 'Marshall Islands', MQ: 'Martinique', MR: 'Mauritania', MU: 'Mauritius', YT: 'Mayotte', MX: 'Mexico', FM: 'Micronesia, Federated States Of', MD: 'Moldova', MC: 'Monaco', MN: 'Mongolia', ME: 'Montenegro', MS: 'Montserrat', MA: 'Morocco', MZ: 'Mozambique', MM: 'Myanmar', NA: 'Namibia', NR: 'Nauru', NP: 'Nepal', NL: 'Netherlands', AN: 'Netherlands Antilles', NC: 'New Caledonia', NZ: 'New Zealand', NI: 'Nicaragua', NE: 'Niger', NG: 'Nigeria', NU: 'Niue', NF: 'Norfolk Island', MP: 'Northern Mariana Islands', NO: 'Norway', OM: 'Oman', PK: 'Pakistan', PW: 'Palau', PS: 'Palestinian Territory, Occupied', PA: 'Panama', PG: 'Papua New Guinea', PY: 'Paraguay', PE: 'Peru', PH: 'Philippines', PN: 'Pitcairn', PL: 'Poland', PT: 'Portugal', PR: 'Puerto Rico', QA: 'Qatar', RE: 'Reunion', RO: 'Romania', RU: 'Russian Federation', RW: 'Rwanda', BL: 'Saint Barthelemy', SH: 'Saint Helena', KN: 'Saint Kitts And Nevis', LC: 'Saint Lucia', MF: 'Saint Martin', PM: 'Saint Pierre And Miquelon', VC: 'Saint Vincent And Grenadines', WS: 'Samoa', SM: 'San Marino', ST: 'Sao Tome And Principe', SA: 'Saudi Arabia', SN: 'Senegal', RS: 'Serbia', SC: 'Seychelles', SL: 'Sierra Leone', SG: 'Singapore', SK: 'Slovakia', SI: 'Slovenia', SB: 'Solomon Islands', SO: 'Somalia', ZA: 'South Africa', GS: 'South Georgia And Sandwich Isl.', ES: 'Spain', LK: 'Sri Lanka', SD: 'Sudan', SR: 'Suriname', SJ: 'Svalbard And Jan Mayen', SZ: 'Swaziland', SE: 'Sweden', CH: 'Switzerland', SY: 'Syrian Arab Republic', TW: 'Taiwan', TJ: 'Tajikistan', TZ: 'Tanzania', TH: 'Thailand', TL: 'Timor-Leste', TG: 'Togo', TK: 'Tokelau', TO: 'Tonga', TT: 'Trinidad And Tobago', TN: 'Tunisia', TR: 'Turkey', TM: 'Turkmenistan', TC: 'Turks And Caicos Islands', TV: 'Tuvalu', UG: 'Uganda', UA: 'Ukraine', AE: 'United Arab Emirates', GB: 'United Kingdom', US: 'United States', UM: 'United States Outlying Islands', UY: 'Uruguay', UZ: 'Uzbekistan', VU: 'Vanuatu', VE: 'Venezuela', VN: 'Viet Nam', VG: 'Virgin Islands, British', VI: 'Virgin Islands, U.S.', WF: 'Wallis And Futuna', EH: 'Western Sahara', YE: 'Yemen', ZM: 'Zambia', ZW: 'Zimbabwe'
		}
		let country =  countryCodes[location.country]
		$('.location__city').html(location.city);
		$('.location__country').html(country);
	}, 'jsonp');
}

// Get weather using https://dark-sky.p.rapidapi.com.
function getWeather (loc) {
	// Get local weather.
	const url = 'https://dark-sky.p.rapidapi.com/'+loc+'?lang=en&units=auto'
	const settings = {
		'async': true,
		'crossDomain': true,
		'url': url,
		'method': 'GET',
		'headers': {
			'x-rapidapi-host': 'dark-sky.p.rapidapi.com',
			'x-rapidapi-key': '75598e6402msha33bcd872cfc163p17c113jsn7df4ce859da5'
		}
	}

	$.ajax(settings).done(function(weather) {
		let tempFeelsLike = Math.round(weather.currently.apparentTemperature)
		let tempCurrent = Math.round(weather.currently.temperature)
		let weatherIcon = weather.currently.icon
		let weatherSummary = weather.currently.summary

		$('.temperature__current').html(tempCurrent + '°');
		$('.temperature__feels-like').html(tempFeelsLike + '°');
		$('.weather-icon').attr('id', `${weatherIcon}`);
		$('.description__text').html(weatherSummary);
		loadIcons()
	});

	// Get icon Canvas.
	function loadIcons() {
		let newSkycons = new Skycons({'color': '#fff'});
		let skycons1, skycons2, skycons3, skycons4, skycons5, skycons6, skycons7, skycons8, skycons9, skycons10
		let skycons = [skycons1, skycons2, skycons3, skycons4, skycons5, skycons6, skycons7, skycons8, skycons9, skycons10]
		let skyconsClasses = ['clear-day', 'clear-night', 'rain', 'snow', 'wind', 'sleet', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night']
		let skyconsIcons = [Skycons.CLEAR_DAY, Skycons.CLEAR_NIGHT, Skycons.RAIN, Skycons.SNOW, Skycons.WIND, Skycons.SLEET, Skycons.FOG, Skycons.CLOUDY, Skycons.PARTLY_CLOUDY_DAY, Skycons.PARTLY_CLOUDY_NIGHT]

		for (i = 0; i < 10; i++) skycons[i] = newSkycons
		for (j = 0; j < 10; j++) skycons[j].add(skyconsClasses[j], skyconsIcons[j])
		for (k = 0; k < 10; k++) skycons[k].play()
	 }
}
//===================================================================================//

//============================ Quote of the day =====================================//
// Get quote of the day from https://quotes.rest/qod .
function getQuoteOfTheDay () {
	$.get('https://quotes.rest/qod', function(test) {
		let quote = test.contents.quotes[0].quote
		let author = test.contents.quotes[0].author
		if (quote) {
			$('.quote').html('“' + quote + '”');
			$('.author').html(author);
		}
		else {
			$('.quote').html('“Those who dare to fail miserably can achieve greatly.”');
			$('.author').html('John F. Kennedy');
		}
	})
}
//===================================================================================//

//==================== Picture background, author and location ======================//
const backgrounds = [
	{
		author: 'Nick Cooper',
		location: 'Morskie Oko, Poland',
		src: 'css/image/background-image-0.jpg',
		href: 'https://unsplash.com/@cooper301'
	},
	{
		author: '',
		location: 'City of Bristol, United Kingdom',
		src: 'css/image/background-image-1.jpg',
		href: 'https://unsplash.com/@m_gatus'
	},
	{
		author: 'Gatis Marcinkevics',
		location: 'City of Bristol, United Kingdom',
		src: 'css/image/background-image-1.jpg',
		href: 'https://unsplash.com/@m_gatus'
	},
	{
		author: 'Claudio Testa',
		location: 'Haselschacher Buck, Vogtsburg, Germany',
		src: 'css/image/background-image-2.jpg',
		href: 'https://unsplash.com/@claudiotesta'
	},
	{
		author: 'Eberhard Grossgasteiger',
		location: 'Mühlwald, South Tyrol, Italy',
		src: 'css/image/background-image-3.jpg',
		href: 'https://unsplash.com/@eberhardgross'
	},
	{
		author: 'Zach Reiner',
		location: 'Driftwood Beach Trail, Jekyll Island, United States',
		src: 'css/image/background-image-4.jpg',
		href: 'https://unsplash.com/@_zachreiner_'
	}
]
function setBackground () {
	let randomNumber = Math.floor(Math.random() * backgrounds.length)

	document.getElementById('background-author').innerHTML = `Photo by ${backgrounds[randomNumber].author}`
	document.getElementById('background-author').href = backgrounds[randomNumber].href
	document.getElementById('background-location').innerHTML = backgrounds[randomNumber].location
	document.getElementById('background-src').src = backgrounds[randomNumber].src
}
//===================================================================================//

//===================== Call functions on document ready ============================//
$(document).ready(function($) {
	getUserLocation()
	getQuoteOfTheDay()
	getTime()
	setInterval(getTime, 60000)
	checkUsername()
	setBackground()
})
