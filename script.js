// Got json loader from the following source:
// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
const loadJSON = (path, callback) => {
	const xobj = new XMLHttpRequest()
	xobj.overrideMimeType('application/json')
	xobj.open('GET', path, true)
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == '200') {
			// Required use of an anonymous callback as
			// .open will NOT return a value but simply
			// returns undefined in asynchronous mode.
			callback(xobj.responseText)
		}
	}
	xobj.send(null)
}


class HappinessStudy {
	constructor (file) {
		loadJSON(file, (response) => {
			// Parse JSON string into object
			const actual_JSON = JSON.parse(response)
			console.log(actual_JSON[0])
		})

		this.year = null
		this.numCountries = null
	}
}


const elYear = document.getElementById('data-year')
const elNumCountries = document.getElementById('data-num-countries')
// testing HappinessStudy
const hello = new HappinessStudy('./data/2019.json')
