// create a table element
const table = document.createElement("table");

// create table header
const headerRow = table.insertRow();
const nameHeader = headerRow.insertCell();
nameHeader.textContent = "Player Name";
const winsHeader = headerRow.insertCell();
winsHeader.textContent = "Wins";

const options = {
    method: 'GET'
}

// fetch the data from the "players" route
fetch("/players", options)
  .then(response => response.json())
  .then(data => {
    // sort the data by number of wins in descending order
    data.sort((a, b) => b.numWins - a.numWins);
    
    // loop through the data and create table rows
    for (let i = 0; i < Math.min(data.length, 5); i++) {
      const row = table.insertRow();
      const nameCell = row.insertCell();
      nameCell.textContent = data[i].player;
      const winsCell = row.insertCell();
      winsCell.textContent = data[i].numWins;
    }
    
    // add the table to the HTML document
    document.body.appendChild(table);
  })
  .catch(error => {
    console.error(error);
  });

document.getElementById("Results").onclick = function () {
    location.href = "/WinnerScreen";
};
