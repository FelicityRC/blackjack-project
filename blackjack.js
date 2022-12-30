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
  const cardToRemove = deckArray[randomIndexNum];
  console.log(cardToRemove);
  deckArray.splice(randomIndexNum, 1);
  return cardToRemove;
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

/*

My Notes:
- create deck of 52 cards
- allocate hand of 2 cards each to dealer and player
- options to hit or stand
- if hit then add new random card
- if stand then let dealer play on
- determine a winner
- deal next hand

1 - createDeck fills deckArray from value & suit arrays (nested forEach to iterate over and push into new deckArray).

2 - randomCard creates new random cards when newCard() invoked. randomIndexNum holds value of random and rounded down num between 1 - 52 (array's index: 0 - 51). Removes random cards that've been used in hands by splicing(from, howMany) accessed by bracket notation: deckArray[indexOfEl].

3 - dealCards deals 2 cards each to played and dealer by using cardModel to create new elements on page.

4 - initialHandValue calculates sum for each hand - iterates over each card in array that's passed in & value evaluated and returned - based on length of string & number on card (ignores the suit).

5 - hitPlayer gives player new card when hit "clicked" - addEventListener with hitPlayer as second argument & hit variable to hold value of element on html doc. handValue holds initialHandValue func(withNewCardPassedIn) and uses cardModel (createElement) to add new card to screen (player element) which displays hand. Can't play on if bust.

6 - hitDealer func called when stand button is clicked - pauses execution of code e.g incase already bust. Adds a card accordingly and calls initialHandValue func to evalute score. Bust or win handled here for immediate result.

7 - decideWinner is called if alert hasn't already given msg such as gone bust or have 21 and utilizes async/await for promise fulfilment.

8 - removeCards - while loop executed when func called to remove all cards (children elements) from dealer's and player's hands.

9 - playGame - restarts game by invoking removeCards() and dealCards().
*/

/*
  Notes:
  
  Error stumbled across trying to test was 'document not defined' with a suggestion of considering using the "jsdom" test environment so installed jsdom & jquery dependencies
  
  Error dev tools console msg: newBlackjack.js:253 Uncaught (in promise) TypeError: Cannot destructure property 'dealerHandArray' of '(intermediate value)' as it is undefined.
  at play
  
  async/await with alert()
  */
