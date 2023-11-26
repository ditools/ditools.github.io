function getSdiByFullName() {
	const nameInput = document.getElementById('nameInput');
	const sdiResult = document.getElementById('sdiResult');
	const name = nameInput.value.trim().toLowerCase();
	if (!name) {
		return; // Exit the function if the input is empty
	}
	fetch('./data.txt')
		.then(response => response.text())
		.then(data => {
			const parsedData = parseData(data);
			const matchingData = parsedData.filter(item => item.fullName.toLowerCase().includes(name));
			if (matchingData.length > 0) {
				const resultHTML = matchingData.map(item => `<p>SDI: ${item.sdi} | Full Name: ${item.fullName}</p>`).join('');
				sdiResult.innerHTML = resultHTML;
			} else {
				sdiResult.innerHTML = `<p>Error: Name not found</p>`;
			}
		})
		.catch(error => {
			console.error('Error:', error);
		});
}
function parseData(data) {
	const lines = data.split('\n');
	const parsedData = lines.map(line => {
		const parts = line.split(' ');
		const sdi = parts.shift();
		const fullName = parts.join(' ');
		return { sdi, fullName };
	});

	return parsedData;
}


fetch('data.txt')
	.then(response => response.text())
	.then(data => {
		// Split the data into lines and create an array of names
		const lines = data.split('\n');
		const names = lines.map(line => {
			const [phoneNumber, firstName, lastName] = line.split(' ');
			return `${firstName} ${lastName}`;
		});
		// Get the input field and results container
		const nameInput = document.getElementById('nameInput');
		const autocompleteResults = document.getElementById('autocomplete-results');

		// Event listener for input field changes
		nameInput.addEventListener('input', function () {
			const inputValue = this.value.toLowerCase();

			// Clear previous results
			autocompleteResults.innerHTML = '';

			const distances = names.map(name => ({
				name,
				distance: leven(inputValue, name.toLowerCase())
			}));
			// Sort names by least Levenshtein distance
			const sortedNames = distances.sort((a, b) => a.distance - b.distance);
			// Display the sorted names in the autocomplete results
			sortedNames.slice(0, 5).forEach(({ name }) => {
				const resultElement = document.createElement('div');
				resultElement.classList.add('result');
				resultElement.textContent = name;
	  
				// Event listener for selecting a name from the autocomplete results
				resultElement.addEventListener('click', function () {
				  nameInput.value = name;
				  autocompleteResults.innerHTML = '';
				});
	  
				autocompleteResults.appendChild(resultElement);
			  });
		});
	})
	.catch(error => console.error('Error reading data.txt:', error));