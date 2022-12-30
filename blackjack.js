// BLACKJACK GAME - BBC TECH ASSESSMENT

/*
- create deck of 52 cards
- allocate hand of cards to dealer and player
- select a random card
- give option to hit or stand
- if hit then add card
- if stand then let dealer play
- determine a winner
- deal next hand

1 - createDeck fills deckArray from values & suits array
2 - randomCard creates new random cards when newCard() called
3 - dealCards deals 2 cards each to played and dealer
4 - initialHandValue calculates sum for each first 2 cards - will iterate over each card in array hand that's passed in & value evaluated to determine score/how to play on - when function called
5 - hitPlayer gives player new card when hit button pressed (addEventListener for hitPlayer function)
6 - hitDealer func called when stand button is clicked - evaluates and adds a card accordingly
7 - decideWinner is called if alert hasn't already given msg such as gone bust or have 21.
8 - removeCards - removes however many cards from both hands
9 - playGame - restarts game by invoking removeCards() and dealCards().
*/

const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const suits = ["♠", "♥", "♣", "♦"];

const cardModel = document.createElement("div");
cardModel.classList.add("card");

const player = document.getElementById("player");
const dealer = document.getElementById("dealer");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const nextHand = document.getElementById("next-hand");

let dealerHandArray = [];
let playerHandArray = [];
let deckArray = [];

const createDeck = () => {
  values.forEach((value) => {
    suits.forEach((suit) => {
      const card = value + suit;
      deckArray.push(card);
    });
  });
  return deckArray;
};

const randomCard = () => {
  const randomIndexNum = Math.floor(Math.random() * deckArray.length);
  const randomCard = deckArray[randomIndexNum];
  deckArray.splice(randomIndexNum, 1);
  return randomCard;
};

const dealCards = () => {
  dealerHandArray = [randomCard(), randomCard()];
  dealerHandArray.forEach((card) => {
    const setCards = cardModel.cloneNode(true);
    setCards.innerHTML = card;
    dealer.append(setCards);
  });

  playerHandArray = [randomCard(), randomCard()];
  playerHandArray.forEach((card) => {
    const setCards = cardModel.cloneNode(true);
    setCards.innerHTML = card;
    player.append(setCards);
  });
};

const initialHandValue = (handArray) => {
  let value = 0;
  let hasAce = 0;
  handArray.forEach((card) => {
    let cardValue =
      card.length === 2 ? card.substring(0, 1) : card.substring(0, 2);
    if (cardValue === "A") hasAce += 1;
    else if (cardValue === "J" || cardValue === "Q" || cardValue === "K")
      value += 10;
    else value += Number(cardValue);
  });
  if (hasAce > 0) value + 11 > 21 ? (value += 1) : (value += 11);
  if (hasAce > 1) {
    value += hasAce - 1;
  }
  return value;
};

const hitPlayer = () => {
  const card = randomCard();
  playerHandArray.push(card);
  let handValue = initialHandValue(playerHandArray);
  const addCard = cardModel.cloneNode(true);
  addCard.innerHTML = card;
  player.append(addCard);
  if (handValue > 21) {
    alert(`You've BUST with a score of ${handValue}.`);
  }
};

const hitDealer = async () => {
  const card = await randomCard();
  dealerHandArray.push(card);
  const addCard = cardModel.cloneNode(true);
  addCard.innerHTML = card;
  dealer.append(addCard);
  let handValue = await initialHandValue(dealerHandArray);
  if (handValue < 16) {
    hitDealer();
  } else if (handValue === 21) {
    alert(`Dealer WINS with 21!`);
  } else if (handValue > 21) {
    alert(`Dealer has BUST with a score of ${handValue}, so you WIN!`);
  } else {
    decideWinner();
  }
};

const decideWinner = async () => {
  let dealerValue = await initialHandValue(dealerHandArray);
  let playerValue = await initialHandValue(playerHandArray);
  let msg = `Dealer has ${dealerValue}. You have ${playerValue}.`;

  if (dealerValue >= playerValue) {
    alert(`${msg} So the dealer WINS!`);
  } else if (playerValue === 21) {
    alert(`${msg} So you WIN with a score of 21! 🥳🥳🥳`);
  } else {
    alert(`${msg} So you WIN! 🥳`);
  }
};

const removeCards = () => {
  while (dealer.children.length > 0) {
    dealer.children[0].remove();
  }
  while (player.children.length > 0) {
    player.children[0].remove();
  }
  return true;
};

const playGame = () => {
  removeCards();
  dealCards();
};

hit.addEventListener("click", hitPlayer);
stand.addEventListener("click", hitDealer);
nextHand.addEventListener("click", playGame);

createDeck();
playGame();

// module.exports = {
//   createDeck,
//   randomCard,
//   dealCards,
//   initialHandValue,
//   hitPlayer,
//   hitDealer,
//   decideWinner,
//   removeCards,
//   playGame,
// };

/*
  Notes:
  
  Error stumbled across trying to test was 'document not defined' with a suggestion of considering using the "jsdom" test environment so installed jsdom & jquery dependencies
  
  Error dev tools console msg: newBlackjack.js:253 Uncaught (in promise) TypeError: Cannot destructure property 'dealerHandArray' of '(intermediate value)' as it is undefined.
  at play
  
  async/await with alert()
  */
