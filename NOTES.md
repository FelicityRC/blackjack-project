## Task Planning

Below outlines the functionality needed in order to achieve gameplay:

1. Create a deck of 52 cards.
2. Allocate a hand of 2 random cards each to the dealer and player.
3. Add options to 'hit' or 'stand'.
4. If 'hit' is clicked then add new random card to the player's hand.
5. If 'stand' is clicked then player can no longer draw new cards and new random cards are added to the dealer's hand.
6. Determine a winner.
7. Deal next hand by restarting from .

## Thoughts and Predictions...

Game Creation:

1. createDeck()

   - My original thought was to _not_ incorporate any suits and either make a large array of 52 cards or set a maximum of 4 x eachCardValue but decided to create two arrays (values and suits) to combine together to make the deck, which would also allow for a better visual outcome.

   - This function iterates over the arrays with nested forEach loops to assign each combination together to a *card* variable which then pushes each *card* combination into the deckArray before returning.

2. randomCard()

   - I needed to create a function which could be called each time I wanted to generate a new random card. I utilised the Math object with methods to provide random numbers from the length of my deckArray.

   - My next thought was that I needed to replicate how if it was a real game, the dealt cards are *not* placed back in the deck to be reused, but discarded. To remove the dealt cards from the array, I accessed the card's index with bracket notation and used the array.splice() method.

   - To ensure cards were removed from the deck, I used console.log(deckArray) after invoking randomCard(), to check that the deckArray *no longer* contained all 52 cards.

3. dealCards()

   - I created two global variables to hold the player and dealer's array of cards so they could be accessed from anywhere in the game. The arrays are assigned **_two_** random cards in this function.

   - To display both sets of data, I modified the DOM by using document.createElement() and gave each card created, the same styling by adding the class of "card" to each element created.

   - Inside this function I needed to create a copy of the variable that holds document.createElement so I could *set* the innerHTML to contain the two randomly generated card data and append them to each the player and dealer elements.

4. initialHandValue()

   - Calculates sum for each hand array passed in. I altered this after writing unit tests as I originally set *let hasAce = false* rather than *let hasAce = 0*. I changed it because of the instance of a hand containing more than one ace, I needed to account for only one point to be added for each additional ace added to a hand *after* the first (which has the logic to check whether adding 11 to the hand would make the hand go bust or not).

   - I checked the length of the cards, as _10_ needed to be considered with it being longer in length than all the other values. The suits are ignored as they don't alter the outcome.

5. hitPlayer()

   - This function is the second argument for the *hit* event and is called when *hit* (button) is clicked and triggered, and only then gives the player a new random card added into their array. The hit variable holds the value of element on the HTML document. 
   
   - I used similar logic for appending another card the the player's hand. handValue holds initialHandValue(newArrayToBePassedIn) and uses displayCards (createElement) to add new card to screen (player element). Can't play on if bust with an if statement to handle this immediately.

6. hitDealer()

   - This function is similar to hitPlayer() as it's the second argument for the *stand* event and is called when *stand* (button) is clicked. It pauses execution of the code (e.g incase already bust). Adds a card accordingly and calls initialHandValue to evaluate score. Bust or win handled here for immediate result with a call the the displayResults function only if required.

7. displayResults()

   - I added this function towards the end as I originally displayed the score using the alert() method. I decided that from a user's perspective, it wasn't as efficient or convenient as a message popping up to inform you and then automatically disappearing when you click on *deal next hand*.

8. decideWinner()

   - This function needs to *wait* for other functionality to run prior so I used async and await to control the execution. It handles the remaining outcome of the game and is only called if hitDealer() or hitPlayer() hasn't already dealt with the result.

9. removeCards()

   - While loop executed when this function is called to remove the results message by setting the string to "" and remove all children elements (cards) from both hands.

10. playGame()

    - Restarts the game by invoking removeCards() - to reset both hands, createDeck() - generated to deckArray and dealCards() to display the initial data on the document.

## Further Thoughts

- When testing the game afterwards in my local browser, _after_ clicking *stand*, and receiving the determined score displayed, it was _still_ possible to continue clicking *hit* and *stand* which caused more cards to be display, altering the result of that original hand which made for a bad user experience.

- To solve this, I added *element*.setAttribute("disabled", true) and *element*.removeAttribute("disabled") in all required places in my code, so that now once *stand* has been clicked on **_or_** the dealer has won, the player only has the option to view the results and deal the next hand which is what the user would expect. This avoids any confusion for the user if they accidently click on available buttons that alter the traditional game.

## Learning Opportunities

1. When running my initial tests, I stumbled upon an error in my terminal which was that the 'document wasn't defined' with a suggestion of using the jsdom test environment so I installed jsdom & jquery dependencies but then received a TypeError that couldn't read my event listeners.

2. I abstracted out utils function from my blackjack.js file that I needed to run unit tests, (to check the card value logic) into a separate utils.js file, which I had no issues with when running as nothing interacted with or impacted the HTML DOM, just synchronous code that runs when code is imported.

3. After reading some documentation, I learned that I needed to give Jest a way of mocking the DOM - so I placed the contents of < main > < main /> from my HTML file, prior to the tests in blackjack.test.js file so the code could read the DOM structure before executing, which prevent the errors I was getting and so I was able to continue with some further testing.
