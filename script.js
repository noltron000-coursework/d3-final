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

const addTextToEl = (el, text) => {
	el.textContent = text
}

// Learned to apply optional parameters from these sources:
// https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6
// https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
const populateEls = ({
	yearText = '',
	numCountriesText = '',
} = {}) => {
	const elYear = document.getElementById('data-year')
	addTextToEl(elYear, yearText)
	const elNumCountries = document.getElementById('data-num-countries')
	addTextToEl(elNumCountries, numCountriesText)
}

const StudyHappiness = (year) => {
	const file = `./data/${year}.json`

	loadJSON(file, (response) => {
		// Parse JSON string into object.
		const actualJSON = JSON.parse(response)

		// Do Stuff

		// Populate elements from earlier construction.
		populateEls({
			'yearText': year,
			'numCountriesText': numCountries,
		})
	})
}

// testing HappinessStudy
StudyHappiness('2019')
