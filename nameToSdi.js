function getSdiByFullName() {
  const nameInput = document.getElementById('nameInput');
  const sdiResult = document.getElementById('sdiResult');
  const name = nameInput.value.trim().toLowerCase();
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
