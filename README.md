# ♠ ♥ BLACKJACK ♣ ♦

## _Task Breakdown_

Write code that simulates a hand of blackjack cards. The goal of the game is to get a hand that's worth as close to 21 points as possible. If the player's hand goes over 21 points then they have lost.

The player is initially dealt two cards. They may to choose to 'hit' (draw a card) or 'stand' (stop drawing cards). If they 'hit' then the new card's value is added to the initial hand of cards. If the total hand exceeds 21 then the player has 'bust' and loses.

A full description of the game can be found _[here.](https://en.wikipedia.org/wiki/Blackjack)_


## _Scenarios_

- When dealt opening hand, player has 2 cards.
- When player clicks **_hit_** they receive another card.
- When player clicks **_stand_** they receive no further cards and score is evaluated against the dealer's score.
- When player's hand is 21 or less then it is **_valid_**.
- When player's hand is 22 or more then player is **_bust_**.
- When player has a **_king_** and an **_ace_**, their score is 21.
- When player has a **_king_**, **_queen_** and an **_ace_**, their score is 21.
- When player has a **_nine_**, an **_ace_** and another **_ace_**, their score is 21.


## _To Run Locally_

- fork then clone this reposoitory

- run npm i

- locate HTML file to open in local browser

- run npm t

## _Initial Steps Taken_

- [x] Read through task outline, example scenarios and blackjack rules.
- [x] Create new GitHub repo for the tech assessment.
- [x] Initialise with a README.md, package.json and .gitignore file.
- [x] Plan layout and styling for user interface.
- [x] Link relevant file sources to HTML skeleton.
- [x] Summarise necessary functionality for basic game play.



I chose to create this game without a framework and thoroughly enjoyed utilizing my DOM manipulation skills with Vanilla JS, HTML, CSS and Jest. Please see game-images folder for UI examples and NOTES.md file for further breakdown of planning, thoughts and predictions.