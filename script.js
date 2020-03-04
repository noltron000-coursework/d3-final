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
		const data = JSON.parse(response)

		// Get a set of all unique countries.
		// Start by initializing aforementioned set.
		const countries = new Set()
		// Reducer gets ran recursively for each entry
		// in the data array, which is called with reduce.
		const reducer = (accumulator, entry) => {
			accumulator.add(entry['Country or region'])
			return accumulator
		}
		// Countries is the default start-value for the
		// accumulator, which gets modified/filled.
		data.reduce(reducer, countries)

		// Populate elements from earlier construction.
		populateEls({
			'yearText': year,
			'numCountriesText': countries.size,
		})
	})
}

// testing HappinessStudy
StudyHappiness('2019')
