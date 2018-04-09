var MatchGame = {};

var numOfCards = 16; // This the the total number of cards on the page

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

$(document).ready(function() {
  var cardValues = MatchGame.generateCardValues();
  var $game = $('#game');
  MatchGame.renderCards(cardValues, $game);
});

MatchGame.generateCardValues = function () {
  var orderedArray = [];
  var randomArray = [];

  for (i = 1; i <= 8; ++i) {
  	orderedArray.push(i);
  	orderedArray.push(i);
  }

  while (orderedArray.length > 0) {
  	var randomIndex = Math.floor(Math.random() * Math.floor(orderedArray.length));
  	var randomNum = orderedArray[randomIndex];
  	randomArray.push(randomNum);
  	orderedArray.splice(randomIndex, 1);
  }
  return randomArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

// cardValues is an array of card values
MatchGame.renderCards = function(cardValues, $game) {
  // which cards have been flipped
  $game.data('flippedCards', []); // this is only for two cards
  $game.data('cardsInGrey', []); // 
  // here is the background color in hsl for cards
  var cardColors = [
  'hsl(25, 85%, 65%)',
  'hsl(55, 85%, 65%)',
  'hsl(90, 85%, 65%)',
  'hsl(160, 85%, 65%)',
  'hsl(220, 85%, 65%)',
  'hsl(265, 85%, 65%)',
  'hsl(310, 85%, 65%)',
  'hsl(360, 85%, 65%)'];

  $game.empty(); // empty $game object's HTML

  var arrayLength = cardValues.length;
  for (i = 0; i < arrayLength; ++i) {
    var $card = $('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 card"></div>'); // this is the card with new values
    $card.data('value', cardValues[i]);
    $card.data('isFilpped', false);
    $card.data('color', cardColors[cardValues[i] - 1]);
    $game.append($card);
  }

  var $card = $('.card');
  $card.click(function(){
    // if the card is clicked, call the function
    MatchGame.flipCard($(this), $game)

  });


  var $button = $('.btn');
  $button.click(function() {
    MatchGame.restartGame($game);
  })
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  // check if the card is flipped or not
  if ($card.data('isFilpped')) {
    return;
  }
  // if the card is not flipped, we have to render it.

  $card.data('isFilpped', true);
  $card.css('background-color', $card.data('color'));
  $card.text($card.data('value'));
  $game.data('flippedCards').push($card);
  // change the status of the card: isFlipped
  // change the background-color of the card

  // now check if the game has two flipped cards
  var flippedCards = $game.data('flippedCards');

  if (flippedCards.length === 2) {
    // check if two flipped cards have the same value
    var $card1 = flippedCards[0];
    var $card2 = flippedCards[1];
    if ($card1.data('value') === $card2.data('value')) {
      // we have to change the background color and text color if 
      // they have the same value
      $card1.css('background-color', 'rgb(153,153,153)');
      $card1.css('color', 'rgb(204,204,204)');
      $card2.css('background-color', 'rgb(153,153,153)');
      $card2.css('color', 'rgb(204,204,204)');
      $game.data('cardsInGrey').push($card1);
      $game.data('cardsInGrey').push($card2);

      // if all cards are in grey, that means the player has won the game
      if (($game.data('cardsInGrey')).length === numOfCards) { 
        var $successMsg = $('<span class="successMsg">YOU WIN!<span>');
        $game.append($successMsg);
      }

    } else {
    // if two cards do not have the same value
    // flip them back over
    window.setTimeout(function(){
    $card1.css('background-color', 'rgb(32, 64, 86)');
    $card1.text('');
    $card1.data('isFilpped', false);
    $card2.css('background-color', 'rgb(32, 64, 86)');
    $card2.text('');
    $card2.data('isFilpped', false);
    }, 400);
    }

    // set the flippedCards array to be empty
    $game.data('flippedCards', []);
  }
};

MatchGame.restartGame = function($game) {
  // recall renderCards to restart the game
  var cardValues = MatchGame.generateCardValues();
  MatchGame.renderCards(cardValues, $game);
}
