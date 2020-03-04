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

// Learned to apply optional parameters from these sources:
// https://simonsmith.io/destructuring-objects-as-function-parameters-in-es6
// https://stackoverflow.com/questions/11796093/is-there-a-way-to-provide-named-parameters-in-a-function-call-in-javascript
const populateEls = ({
	yearText = '',
	numCountriesText = '',
} = {}) => {
	const elYear = document.getElementById('data-year')
	const elNumCountries = document.getElementById('data-num-countries')
	elYear.textContent = yearText
	elNumCountries.textContent = numCountriesText
}

const createFullTable = (data, sortBy = 'Generosity') => {
	// filter data by category
	data = data
	.filter(entry => sortBy in entry)
	.sort((left, right) => right[sortBy] - left[sortBy])
	.slice(0, 10)

	// create a list of unique categories
	const categories = [...getUniqueCategories(data)]

	// get items
	const elTableHead = createTableHead(categories)
	const elTableBody = createTableBody(categories, data)
	const elTable = document.getElementById('data-table')

	// add items to table
	elTable.appendChild(elTableHead)
	elTable.appendChild(elTableBody)
}

const createTableHead = (categories) => {
	// Entry is a dictionary item.
	// Categories is an array.
	const elTableHead = document.createElement('thead')
	const elTableRow = document.createElement('tr')
	categories.forEach((category) => {
		// Create element.
		const elTableEntry = document.createElement('th')
		// Add text content to element.
		console.log(category)
		elTableEntry.textContent = String(category)
		// Append data as child to table row.
		elTableRow.appendChild(elTableEntry)
	})
	// the table row is full; use it in the head.
	elTableHead.appendChild(elTableRow)
	// the head is complete; return it.
	return elTableHead
}

// Data is the data list from json.
// Categories is an array.
const createTableBody = (categories, data) => {
	// Create the empty body.
	const elTableBody = document.createElement('tbody')
	// Add each entry as a row to the body.
	data.forEach((entry) => {
		// Create a fully populated table-row element.
		// This uses another helper function.
		const elTableRow = createTableRow(entry, categories)
		// Append row as child to table body.
		elTableBody.appendChild(elTableRow)
	})
	// the body is complete; return it.
	return elTableBody
}

// Entry is a dictionary item.
// Categories is an array.
const createTableRow = (entry, categories) => {
	const elTableRow = document.createElement('tr')
	categories.forEach((category) => {
		// Create element.
		const elTableData = document.createElement('td')
		// Add text content to element.
		let text = ''
		if (category in entry) {
			text = `${entry[category]}`
		}
		elTableData.textContent = text
		// Append data as child to table row.
		elTableRow.appendChild(elTableData)
	})
	// the table row is full; return it.
	return elTableRow
}

// Returns a set of unique countries.
const getUniqueCountries = (data) => {
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
	return countries
}

// Returns a set of unique categories.
const getUniqueCategories = (data) => {
	// Start by initializing aforementioned set.
	const categories = new Set()
	// Reducer gets ran recursively for each entry
	// in the data array, which is called with reduce.
	const reducer = (accumulator, entry) => {
		// We need to ensure every key is covered here.
		for (const category in entry) {
			accumulator.add(category)
		}
		return accumulator
	}
	// Categories is the default start-value for the
	// accumulator, which gets modified/filled.
	data.reduce(reducer, categories)
	return categories
}

const StudyHappiness = (year) => {
	// Find file from input year.
	const file = `./data/${year}.json`

	loadJSON(file, (response) => {
		// Parse JSON string into object.
		const data = JSON.parse(response)

		// Gather data from helper functions.
		const countries = getUniqueCountries(data)

		// Populate elements from earlier construction.
		populateEls({
			'yearText': year,
			'numCountriesText': countries.size,
		})

		createFullTable(data)
	})
}

// testing HappinessStudy
StudyHappiness('2019')
