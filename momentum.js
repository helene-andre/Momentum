//================================== clock ==========================================//
function timeupdateHours () {
	let today = new Date()
	let hours = today.getHours()<10 ? "0" + today.getHours() : today.getHours()
	greetingMessage(hours)
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

//================================== clock ==========================================//
function greetingMessage (currentHour) {
	if (currentHour >= 5 && currentHour < 12) {
		$(".greeting").html('Good Morning')
	}
	if (currentHour > 12) {
		$(".greeting").html('Good Afternoon')
	}
	if (currentHour >= 18 || currentHour < 5) {
		$(".greeting").html('Good Evening')
	}
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

//===================================================================================//

//================================== Get local weather ==============================//

// Get weather of the day from https://www.apixu.com/ and https://ipinfo.io
function getUserLocation () {
	$.get("https://ipinfo.io", function(location) {
		let loc = location.ip;
		getWeather(loc);

		let countryCodes = {
			AF: 'Afghanistan', AX: 'Aland Islands', AL: 'Albania', DZ: 'Algeria', AS: 'American Samoa', AD: 'Andorra', AO: 'Angola', AI: 'Anguilla', AQ: 'Antarctica', AG: 'Antigua And Barbuda', AR: 'Argentina', AM: 'Armenia', AW: 'Aruba', AU: 'Australia', AT: 'Austria', AZ: 'Azerbaijan', BS: 'Bahamas', BH: 'Bahrain', BD: 'Bangladesh', BB: 'Barbados', BY: 'Belarus', BE: 'Belgium', BZ: 'Belize', BJ: 'Benin', BM: 'Bermuda', BT: 'Bhutan', BO: 'Bolivia', BA: 'Bosnia And Herzegovina', BW: 'Botswana', BV: 'Bouvet Island', BR: 'Brazil', IO: 'British Indian Ocean Territory', BN: 'Brunei Darussalam', BG: 'Bulgaria', BF: 'Burkina Faso', BI: 'Burundi', KH: 'Cambodia', CM: 'Cameroon', CA: 'Canada', CV: 'Cape Verde', KY: 'Cayman Islands', CF: 'Central African Republic', TD: 'Chad', CL: 'Chile', CN: 'China', CX: 'Christmas Island', CC: 'Cocos (Keeling) Islands', CO: 'Colombia', KM: 'Comoros', CG: 'Congo', CD: 'Congo, Democratic Republic', CK: 'Cook Islands', CR: 'Costa Rica', CI: 'Cote D\'Ivoire', HR: 'Croatia', CU: 'Cuba', CY: 'Cyprus', CZ: 'Czech Republic', DK: 'Denmark', DJ: 'Djibouti', DM: 'Dominica', DO: 'Dominican Republic', EC: 'Ecuador', EG: 'Egypt', SV: 'El Salvador', GQ: 'Equatorial Guinea', ER: 'Eritrea', EE: 'Estonia', ET: 'Ethiopia', FK: 'Falkland Islands (Malvinas)', FO: 'Faroe Islands', FJ: 'Fiji', FI: 'Finland', FR: 'France', GF: 'French Guiana', PF: 'French Polynesia', TF: 'French Southern Territories', GA: 'Gabon', GM: 'Gambia', GE: 'Georgia', DE: 'Germany', GH: 'Ghana', GI: 'Gibraltar', GR: 'Greece', GL: 'Greenland', GD: 'Grenada', GP: 'Guadeloupe', GU: 'Guam', GT: 'Guatemala', GG: 'Guernsey', GN: 'Guinea', GW: 'Guinea-Bissau', GY: 'Guyana', HT: 'Haiti', HM: 'Heard Island & Mcdonald Islands', VA: 'Holy See (Vatican City State)', HN: 'Honduras', HK: 'Hong Kong', HU: 'Hungary', IS: 'Iceland', IN: 'India', ID: 'Indonesia', IR: 'Iran, Islamic Republic Of', IQ: 'Iraq', IE: 'Ireland', IM: 'Isle Of Man', IL: 'Israel', IT: 'Italy', JM: 'Jamaica', JP: 'Japan', JE: 'Jersey', JO: 'Jordan', KZ: 'Kazakhstan', KE: 'Kenya', KI: 'Kiribati', KR: 'Korea', KW: 'Kuwait', KG: 'Kyrgyzstan', LA: 'Lao People\'s Democratic Republic', LV: 'Latvia', LB: 'Lebanon', LS: 'Lesotho', LR: 'Liberia', LY: 'Libyan Arab Jamahiriya', LI: 'Liechtenstein', LT: 'Lithuania', LU: 'Luxembourg', MO: 'Macao', MK: 'Macedonia', MG: 'Madagascar', MW: 'Malawi', MY: 'Malaysia', MV: 'Maldives', ML: 'Mali', MT: 'Malta', MH: 'Marshall Islands', MQ: 'Martinique', MR: 'Mauritania', MU: 'Mauritius', YT: 'Mayotte', MX: 'Mexico', FM: 'Micronesia, Federated States Of', MD: 'Moldova', MC: 'Monaco', MN: 'Mongolia', ME: 'Montenegro', MS: 'Montserrat', MA: 'Morocco', MZ: 'Mozambique', MM: 'Myanmar', NA: 'Namibia', NR: 'Nauru', NP: 'Nepal', NL: 'Netherlands', AN: 'Netherlands Antilles', NC: 'New Caledonia', NZ: 'New Zealand', NI: 'Nicaragua', NE: 'Niger', NG: 'Nigeria', NU: 'Niue', NF: 'Norfolk Island', MP: 'Northern Mariana Islands', NO: 'Norway', OM: 'Oman', PK: 'Pakistan', PW: 'Palau', PS: 'Palestinian Territory, Occupied', PA: 'Panama', PG: 'Papua New Guinea', PY: 'Paraguay', PE: 'Peru', PH: 'Philippines', PN: 'Pitcairn', PL: 'Poland', PT: 'Portugal', PR: 'Puerto Rico', QA: 'Qatar', RE: 'Reunion', RO: 'Romania', RU: 'Russian Federation', RW: 'Rwanda', BL: 'Saint Barthelemy', SH: 'Saint Helena', KN: 'Saint Kitts And Nevis', LC: 'Saint Lucia', MF: 'Saint Martin', PM: 'Saint Pierre And Miquelon', VC: 'Saint Vincent And Grenadines', WS: 'Samoa', SM: 'San Marino', ST: 'Sao Tome And Principe', SA: 'Saudi Arabia', SN: 'Senegal', RS: 'Serbia', SC: 'Seychelles', SL: 'Sierra Leone', SG: 'Singapore', SK: 'Slovakia', SI: 'Slovenia', SB: 'Solomon Islands', SO: 'Somalia', ZA: 'South Africa', GS: 'South Georgia And Sandwich Isl.', ES: 'Spain', LK: 'Sri Lanka', SD: 'Sudan', SR: 'Suriname', SJ: 'Svalbard And Jan Mayen', SZ: 'Swaziland', SE: 'Sweden', CH: 'Switzerland', SY: 'Syrian Arab Republic', TW: 'Taiwan', TJ: 'Tajikistan', TZ: 'Tanzania', TH: 'Thailand', TL: 'Timor-Leste', TG: 'Togo', TK: 'Tokelau', TO: 'Tonga', TT: 'Trinidad And Tobago', TN: 'Tunisia', TR: 'Turkey', TM: 'Turkmenistan', TC: 'Turks And Caicos Islands', TV: 'Tuvalu', UG: 'Uganda', UA: 'Ukraine', AE: 'United Arab Emirates', GB: 'United Kingdom', US: 'United States', UM: 'United States Outlying Islands', UY: 'Uruguay', UZ: 'Uzbekistan', VU: 'Vanuatu', VE: 'Venezuela', VN: 'Viet Nam', VG: 'Virgin Islands, British', VI: 'Virgin Islands, U.S.', WF: 'Wallis And Futuna', EH: 'Western Sahara', YE: 'Yemen', ZM: 'Zambia', ZW: 'Zimbabwe'
		}
		let country =  countryCodes[location.country]
		$(".location__city").html(location.city);
		$(".location__country").html(country);
	}, "jsonp");
}

function getWeather (loc) {
	let whatsTheWeather = "https://api.apixu.com/v1/current.json?key=9a5fe910c4104e7eb2d11925172205&q="+loc;
	$.getJSON(whatsTheWeather, function(weather) {
		let tempFeelsLike = weather.current.feelslike_c
		let tempCurrent = weather.current.temp_c

		$(".temperature__current").html(tempCurrent + " °C");
		$(".temperature__feels-like").html(tempFeelsLike + " °C");
		$(".weather-icon").attr("src", `http:${weather.current.condition.icon}`);
		$(".description__text").html(weather.current.condition.text);
	});
}
//===================================================================================//

//=============================== Get quote of the day ===============================//
// Get quote of the day from https://quotes.rest/qod .
function getQuoteOfTheDay () {
	$.get('https://quotes.rest/qod', function(test) {
		let quote = test.contents.quotes[0].quote
		let author = test.contents.quotes[0].author
		if (quote) {
			$(".quote").html("“" + quote + "”");
			$(".author").html(author);
		}
		else {
			$(".quote").html('“Those who dare to fail miserably can achieve greatly.”');
			$(".author").html('John F. Kennedy');
		}
	});
}
//===================================================================================//

//============================== window onload ======================================//
$(document).ready(function($) {
	getUserLocation("metric")
	getQuoteOfTheDay()
})

window.onload = function () {
	showtime()
	setInterval(showtime, 60000)
	greetingMessage()
}