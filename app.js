//Player class
class Player {
  constructor(cardsInHeand, score, turn, result) {
    this.cardsInHeand = cardsInHeand;
    this.score = score;
    this.turn = turn;
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
const cardType = ["C", "D", "H", "S"];
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
  if (card === 11) {
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
//Buttons
const drawCardBtn = document.getElementById("player-draw-card");
const startGameBtn = document.getElementById("start-game");
//Tables
const playersTable = document.getElementById("players-table");
const computersTable = document.getElementById("computers-table");
//Players
const player = new Player();
const computer = new Player();
//Start Game
startGameBtn.addEventListener("click", function (e) {
  //Create a player and a computer both have two cards in the begining
  player.cardsInHeand = getCard(cards, 2);
  computer.cardsInHeand = getCard(cards, 2);
  //Draw cards on the table
  playersTable.append(createCard(player.cardsInHeand[0], cardType));
  playersTable.append(createCard(player.cardsInHeand[1], cardType));
  computersTable.append(createCard(computer.cardsInHeand[0], cardType));

  //Sum both cards and save the result
  player.score = player.sumOfCards;
  computer.score = computer.sumOfCards;
  console.log(player);
  console.log(computer);
});

//Check if we have a winner

//Player draw a card
drawCardBtn.addEventListener("click", function (e) {
  player.cardsInHeand.push(getCard(cards, 1));
  player.score = player.sumOfCards;
  console.log(player);
  console.log(computer);
});
