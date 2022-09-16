//Player class
class Player {
  constructor(cardsInHeand, score, result) {
    this.cardsInHeand = cardsInHeand;
    this.score = score;
    this.result = result;
  }
  get sumOfCards() {
    return this.sumHeand();
  }
  sumHeand() {
    let { cardsInHeand } = this;
    return cardsInHeand.reduce((a, b) => a + b, 0);
  }
}
//Deck of cards
const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
//const cards = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];
//type of cards
const cardType = ["C", "D", "H", "S"];
//functions
//Randomly pick one card from the deck
const getCard = (cards, numberOfCards = 1) => {
  if (numberOfCards === 1) {
    return pickRandomFromArray(cards);
  }
  return [pickRandomFromArray(cards), pickRandomFromArray(cards)];
};
const createCard = (card, cardType) => {
  //Multiple options when we get 10 King, Queen, Johnny or Ten
  const ten = ["0", "K", "Q", "J"];
  //11 is Ace
  if (card === 11 || card === 1) {
    card = "A";
    //if ten we randomly pick
  } else if (card === 10) {
    card = pickRandomFromArray(ten);
  }
  //create link fot our card
  const link = `https://www.deckofcardsapi.com/static/img/${
    card + pickRandomFromArray(cardType)
  }.png`;
  //create HTML element, append class and src
  let image = document.createElement("img");
  image.classList.add("card");
  image.src = link;
  return image;
};
const pickRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const checkScore = (score, desiredScore = 21) => {
  if (score === 21) {
    return "blackjack";
  } else if (score <= desiredScore) {
    return "under";
  }
  return "over";
};
const callWinner = (winner) => {
  drawCardBtn.disabled = true;
  endGameBtn.disabled = true;
  if (winner === "player") {
    h2Player.innerText = `${h2Player.innerText} - WINNER! ${player.score}`;
    h2Computer.innerText = `${h2Computer.innerText} - LOSER! ${computer.score}`;
  } else {
    h2Player.innerText = `${h2Player.innerText} - LOSER! ${player.score}`;
    h2Computer.innerText = `${h2Computer.innerText} - WINNER! ${computer.score}`;
  }
};
const replaceAce = (player) => {
  let index = player.cardsInHeand.indexOf(11);
  if (index !== -1) {
    player.cardsInHeand[index] = 1;
    player.score = player.sumOfCards;
  }
};
//Buttons
const drawCardBtn = document.getElementById("player-draw-card");
const endGameBtn = document.getElementById("end-game");
const RestartGameBtn = document.getElementById("restart-game");
//Tables
const playersTable = document.getElementById("players-table");
const computersTable = document.getElementById("computers-table");
//h2
const h2Player = document.getElementById("player");
const h2Computer = document.getElementById("computer");
//Players
const player = new Player();
const computer = new Player();
//Create a player and a computer both have two cards in the beginning
player.cardsInHeand = getCard(cards, 2);
computer.cardsInHeand = getCard(cards, 2);
//Draw cards on the table
playersTable.append(createCard(player.cardsInHeand[0], cardType));
playersTable.append(createCard(player.cardsInHeand[1], cardType));
computersTable.append(createCard(computer.cardsInHeand[0], cardType));
//Sum both cards and save the result
player.score = player.sumOfCards;
computer.score = computer.sumOfCards;
//Check for blackjack
if (checkScore(player.score) == "blackjack") callWinner("player");
if (checkScore(player.score) == "over") {
  replaceAce(player);
}
//Player draw a card
drawCardBtn.addEventListener("click", function (e) {
  player.cardsInHeand.push(getCard(cards));
  player.score = player.sumOfCards;
  //Draw cards on the table
  playersTable.append(createCard(player.cardsInHeand.at(-1), cardType));
  //Check for blackjack
  if (checkScore(player.score) == "blackjack") {
    callWinner("player");
  } else if (checkScore(player.score) == "over") {
    let index = player.cardsInHeand.indexOf(11);
    if (index !== -1) {
      player.cardsInHeand[index] = 1;
      player.score = player.sumOfCards;
    } else {
      callWinner("computer");
    }
  }
});
//Restart game (reloads the page)
RestartGameBtn.addEventListener("click", function (e) {
  window.location.reload();
});
//End Game (player ends game)
endGameBtn.addEventListener("click", function (e) {
  //Draw cards as long as computers score is less or equal 16
  while (computer.score <= 16) {
    computer.cardsInHeand.push(getCard(cards));
    computer.score = computer.sumOfCards;
    if (checkScore(computer.score) == "over") {
      replaceAce(computer);
    }
  }
  //Draw all computer cards on table
  for (let i = 1; i < computer.cardsInHeand.length; i++) {
    computersTable.append(createCard(computer.cardsInHeand[i], cardType));
  }
  //Check the scores!
  if (computer.score > 21) {
    callWinner("player");
  } else if (computer.score >= player.score) {
    callWinner("computer");
  } else {
    callWinner("player");
  }
});
