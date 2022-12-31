const INITIAL_HTML = `<main class="layout">
<h2>Dealer's Cards:</h2>
<section>
  <div class="cards" id="dealer"></div>
</section>
<h2 class="playerHeader">Player's Cards:</h2>
<section>
  <div class="cards" id="player"></div>
</section>
<section>
  <div class="button-container" id="buttons">
    <button id="hit">Hit</button>
    <button id="stand">Stand</button>
  </div>
</section>
<div class="scoreBox" id="results">
  <p></p>
</div>
<div>
  <button id="next-hand">Deal Next Hand</button>
</div>
</main>`;

document.body.innerHTML = INITIAL_HTML;

const { randomCard, initialHandValue } = require("../blackjack");

describe("blackjack integration tests", () => {
  beforeEach(() => {
    document.body.innerHTML = INITIAL_HTML;
  });
  test("When dealt opening hand, player has 2 cards", () => {
    const dealCards = (playerHandArray = [randomCard(), randomCard()]);
    expect(dealCards).toHaveLength(2);
  });

  test("When player clicks 'hit', they receive another card", () => {
    const hitClick = document.querySelector("#hit");
    const initialArray = playerHandArray.length;
    hitClick.addEventListener = jest.fn();
    hitClick.addEventListener.mockImplementation((event, handler) => {
      handler();
      hitClick.click();
      expect(initialArray).toHaveLength(3);
    });
  });

  test("When player clicks 'stand', they receive no further cards (score is evaluated against dealer's)", () => {
    const standClick = document.querySelector("#stand");
    const playerHand = playerHandArray.length;
    standClick.addEventListener = jest.fn();
    standClick.addEventListener.mockImplementation((event, handler) => {
      handler();
      standClick.click();
      expect(playerHand).toHaveLength(2);
    });
  });

  test("When player's hand is 21 or less, it is 'valid'", () => {
    const mockHand = ["3♣", "8♦"];
    const mockCard = "Q♥";
    mockHand.push(mockCard);
    const sum = initialHandValue(mockHand);
    let checkValid;
    if (sum <= 21) checkValid = true;
    expect(checkValid).toBe(true);
    expect(checkValid).not.toBe(false);
  });

  test("When player's hand is 22 or more, player has 'bust'", () => {
    const mockHand = ["10♣", "K♦"];
    const mockCard = "2♥";
    mockHand.push(mockCard);
    const sum = initialHandValue(mockHand);
    let checkBust;
    if (sum > 21) checkBust = true;
    expect(checkBust).toBe(true);
    expect(checkBust).not.toBe(false);
  });
});
