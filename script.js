function getFullName() {
  const sdiInput = document.getElementById('sdiInput');
  const fullNameResult = document.getElementById('fullNameResult');
  const sdi = sdiInput.value.trim().toLowerCase();
  if (!sdi) {
    return;
  }
  fetch('./data.txt')
    .then(response => response.text())
    .then(data => {
      const parsedData = parseData(data);
      const matchingData = parsedData.find(item => item.sdi.toLowerCase() === sdi);
      if (matchingData) {
        fullNameResult.innerHTML = `<p>Full Name: ${matchingData.fullName}</p>`;
      } else {
        fullNameResult.innerHTML = `<p>Error: SDI not found</p>`;
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
