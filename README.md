# ♠ ♥ BLACKJACK ♣ ♦

## _Scenarios_

- When dealt opening hand, player has 2 cards.
- When played clicks **_hit_** they receive another card.
- When played clicks **_stand_** they receive no further cards and score is evaluated against the dealer's score.
- When player's hand is 21 or less then it is **_valid_**.
- When player's hand is 22 or more then player is **_bust_**.
- When player has a _king_ and an _ace_, their score is 21.
- When player has a _king_, _queen_ and an _ace_, their score is 21.
- When player has a _nine_, an _ace_ and another _ace_, their score is 21.

---

### _Install the Following to Setup_

- npm init --yes

- npm i -g npm

---

### _Host Locally in my Browser_

- file://wsl.localhost/Ubuntu/home/felicityc/my-projects/blackjack-project/blackjack.html

---

### _To Run Tests_

- npm i jest -D

- npm t blackjack.test.js
