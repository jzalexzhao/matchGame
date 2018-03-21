var MatchGame = {};

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



};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
