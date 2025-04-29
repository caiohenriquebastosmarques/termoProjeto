const tiles = document.querySelector(".tile-container");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");
const backspaceAndKeyboardRow = document.querySelector("#backspaceAndKeyboardRow");

const keysFirstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keysSecondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keysThirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const rows = 6;
const column = 5;
let currentRow = 0;
let currentTile = 0;
let word = "";
const targetWord = "mundo".slice(0, 5).toUpperCase();

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");

  for (let columnIndex = 0; columnIndex < column; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", `row${rowIndex}column${columnIndex}`);
    tileColumn.setAttribute("class", "tile-column");
    tileRow.append(tileColumn);
  }

  tiles.append(tileRow);
}

const createKeyboardRow = (keys, container) => {
  keys.forEach((key) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyPress(key));
    container.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);


const enterKey = document.createElement("button");
enterKey.textContent = "ENTER";
enterKey.addEventListener("click", checkWord);
backspaceAndKeayboardRow.append(enterKey);

const backspaceKey = document.createElement("button");
backspaceKey.textContent = "⌫";
backspaceKey.addEventListener("click", deleteLetter);
backspaceAndKeayboardRow.append(backspaceKey);


function handleKeyPress(key) {
  if (currentTile < column && currentRow < rows) {
    const tile = document.getElementById(`row${currentRow}column${currentTile}`);
    tile.textContent = key;
    word += key;
    currentTile++;
  }
}

function deleteLetter() {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(`row${currentRow}column${currentTile}`);
    tile.textContent = "";
    word = word.slice(0, -1);
  }
}

function checkWord() {
    if (word.length < column) {
      alert("Digite 5 letras");
      return;
    }
  
    const guess = word.toUpperCase();
    let remainingLetters = targetWord.split(""); 

    for (let i = 0; i < column; i++) {
      const tile = document.getElementById(`row${currentRow}column${i}`);
      const letter = guess[i];
  
      if (letter === targetWord[i]) {
        tile.style.backgroundColor = "green";
        remainingLetters[i] = null; 
      }
    }

    for (let i = 0; i < column; i++) {
      const tile = document.getElementById(`row${currentRow}column${i}`);
      const letter = guess[i];
  
      if (remainingLetters.includes(letter) && tile.style.backgroundColor !== "green") {
        tile.style.backgroundColor = "gold";
        remainingLetters[remainingLetters.indexOf(letter)] = null;
      } else if (tile.style.backgroundColor !== "green") {
        tile.style.backgroundColor = "gray";
      }
    }
  if (guess === targetWord) {
    setTimeout(() => alert("Parabéns! Você acertou! Reinicie a tela para jogar novamente!"), 200);
  } else if (currentRow === 5) {
    setTimeout(() => alert("Fim de jogo! A palavra era: " + targetWord+"! Reinicie a tela para jogar novamente!"), 200);
  }

  currentRow++;
  currentTile = 0;
  word = "";
}
