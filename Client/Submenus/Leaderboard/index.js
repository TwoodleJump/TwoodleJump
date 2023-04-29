const player1Name = sessionStorage.getItem("player1Name");
const player2Name = sessionStorage.getItem("player2Name");

// create a table element
const table = document.createElement("table");

// create table header
const headerRow = table.insertRow();
const posHeader = headerRow.insertCell();
posHeader.textContent = "Rank";
const nameHeader = headerRow.insertCell();
nameHeader.textContent = "Player";
const winsHeader = headerRow.insertCell();
winsHeader.textContent = "Wins";

const options = {
  method: "GET",
};

// fetch the data from the "players" route
fetch("/players", options)
  .then((response) => response.json())
  .then((data) => {
    // sort the data by number of wins in descending order
    data.sort((a, b) => b.numWins - a.numWins);
    let p1rank = 0;
    let p2rank = 0;
    let p1wins = 0;
    let p2wins = 0;
    // loop through the data and create table rows
    for (let i = 0; i < data.length; i++) {
      if (i < Math.min(data.length, 10)) {
        const row = table.insertRow();
        const numCell = row.insertCell();
        numCell.textContent = i + 1;
        const nameCell = row.insertCell();
        nameCell.textContent = data[i].player;
        const winsCell = row.insertCell();
        winsCell.textContent = data[i].numWins;
      }
      // match current player to player in database to get wins and rank
      if (data[i].player == player1Name) {
        p1rank = i + 1;
        p1wins = data[i].numWins;
      } else if (data[i].player == player2Name) {
        p2rank = i + 1;
        p2wins = data[i].numWins;
      }
    }
    const botRow1 = table.insertRow();
    const botNumCell = botRow1.insertCell();
    botNumCell.textContent = p1rank ? p1rank : "-";
    const nameCell = botRow1.insertCell();
    nameCell.textContent = player1Name;
    const winsCell = botRow1.insertCell();
    winsCell.textContent = p1wins;

    const botRow2 = table.insertRow();
    const bot2NumCell = botRow2.insertCell();
    bot2NumCell.textContent = p2rank ? p2rank : "-";
    const name2Cell = botRow2.insertCell();
    name2Cell.textContent = player2Name;
    const wins2Cell = botRow2.insertCell();
    wins2Cell.textContent = p2wins;

    // add the table to the HTML document
    document.body.appendChild(table);
  })
  .catch((error) => {
    console.error(error);
  });

document.getElementById("Results").onclick = function () {
  location.href = "/WinnerScreen";
};
