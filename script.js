let playerScore = 0;
let computerScore = 0;

/*Här skriver användaren in sitt namn o namnet ändras.
tagit bort funktionen på dom andra knapparna så spelet 
startar inte förrän spelaren skrivit sitt namn.
*/
const btn = document.querySelector("#btn");
let playerName = document.querySelector("#names");

disableButtons(".optionsContainer button");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let player = document.querySelector("input").value;

  playerName.innerText = player;

  disableButtons("form button");
  enableButtons(".optionsContainer button");
});

/*Här ska spelaren välja sten,sax eller påse och datorn slumpar ett val.
sen ändras texten till vad dom valde*/
const spela = ["sten", "sax", "påse"];
let playButton = document.querySelector("#option");
playButton.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const computerChoice = Math.floor(Math.random() * spela.length);

    document.querySelector(".playerText").innerText =
      "Du valde " + spela[event.target.id];
    document.querySelector(".computerText").innerText =
      "Datorn valde " + spela[computerChoice];

    /*Här jämför jag först om valen blir lika i if-satsen,sen i else if så
    jämför jag när alternativen blir att spelaren vinner, och i else så blir
    alla andra fall att datorn vinner.
     */

    if (event.target.id == computerChoice) {
      console.log(event.target.id, computerChoice);
      console.log("LIKA");
      document.querySelectorAll(".score")[0].innerText = "Det blev lika";
      document.querySelectorAll(".score")[1].innerText = "Det blev lika";
    } else if (
      (event.target.id == 0 && computerChoice == 1) ||
      (event.target.id == 1 && computerChoice == 2) ||
      (event.target.id == 2 && computerChoice == 0)
    ) {
      console.log("spelaren vinner");
      document.querySelectorAll(".score")[0].innerText = "Du vinner";
      document.querySelectorAll(".score")[1].innerText = "Datorn förlorar";
      playerScore++;
      console.log(playerScore);
      document.querySelector(".playerCount").innerText =
        "Dina poäng: " + playerScore;
      if (playerScore == 3) {
        document.querySelector(".winner").innerText =
          "Vinnaren är:\n" + playerName.textContent;

        disableButtons(".optionsContainer button");
        promptRestart();
      }
    } else {
      console.log("datorn vinner");
      document.querySelectorAll(".score")[0].innerText = "Du förlorar";
      document.querySelectorAll(".score")[1].innerText = "Datorn vinner";
      computerScore++;
      document.querySelector(".computerCount").innerText =
        "Datorns poäng: " + computerScore;
      if (computerScore == 3) {
        document.querySelector(".winner").innerText = "Vinnaren är:\n Datorn";
        disableButtons(".optionsContainer button");
        promptRestart();
      }
    }
  }
});

//När någon av spelarna har fått 3 poäng så slutar knapparna att funka
function disableButtons(selector) {
  const buttons = document.querySelectorAll(selector);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute("disabled", "true");
  }
}

function enableButtons(selector) {
  const buttons = document.querySelectorAll(selector);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled");
  }
}

/*När någan av spelarna vunnit så skapas det en knapp där spelaren väljer 
spelaren om den vill spela igen och spelet startar om
*/
function promptRestart() {
  const playAgain = document.createElement("button");
  document.querySelector(".scoreWrapper").appendChild(playAgain);
  playAgain.innerText = "Spela igen!";
  playAgain.addEventListener("click", () => {
    location.reload();
  });
}
