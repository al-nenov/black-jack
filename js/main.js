// Create one full deck of cards and shuffle it
const cards = [
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
  "D",
  "K",
  "A"
],
colors = ["Spades", "Hearts", "Diamonds", "Clubs"];
let deck = [];
//Put together one whole deck
function makeDeck() {
  for (color of colors) {
    for (card of cards) {
      deck.push({
        rank: card,
        suit: color
      });
    }
  }
}
function randomize(arr) {
  arr.sort((a, b) => {
    return 0.5 - Math.random();
  });
}
makeDeck();
randomize(deck);

//Players

class Player {
  constructor(numOfCards, name) {
    this.numOfCards = numOfCards;
    this.name = name;
  }

  dealCards() {
    for (let i = 1; i <= this.numOfCards; i += 1) {
      let currentCard = "card" + i;
      this[currentCard] = dealNewCard();
      animatedDeal(deck.length, this, i);
    }
  }

}

//Remove cards from player slots
function clearPlayerCards() {
  fade(containingDeck[deck.length + 1]);
  fade(containingDeck[deck.length]);
}

//Return the top of the deck card
function dealNewCard() {
  const firstCard = deck[0];
  if (firstCard === undefined) {
    alert("Deck is empty");
    return;
  }
  deck.splice(0, 1);
  return firstCard;
}


//Create dealer and players
let dealer = new Player(3, "dealer");
let player = new Player(2, "player1");


//Deal cards to player with a hit of a button
let hitButton = document.getElementById("hit");
hitButton.addEventListener("click", function() {
  clearPlayerCards();
  player.dealCards();
});


//Div element representing a card
card = Object.assign(document.createElement("div"), {
  className: "flip-container card back",
  style: "position:absolute; ",
  innerHTML: `<div class="flipper"><div class="back"></div><div class="front"></div></div>`
});


//Create div elements for a whole deck of cards
const deckPlaceHolder = document.getElementById("playTable"),
containingDeck = document.getElementsByClassName("card");

let index = 1,
  speed = 10;
var dealTheDeck = setInterval(function() {
  let newCard = card.cloneNode(true);
  newCard.style.left = -index + "px";
  newCard.style.top = -index + "px";
  deckPlaceHolder.appendChild(newCard);
  index += 1;
  if (index > 52) {
    clearInterval(dealTheDeck);
    dealer.dealCards();
    player.dealCards();
  }
}, speed);


//Deal cards with animation
function animatedDeal(index, player, itteration) {
  let cardsPlaceholder = document.getElementsByClassName(
    "cardsPlaceholder"
  );
  let activePlayerCounter;
  if(player.name !=="dealer"){
    activePlayerCounter = 3;
  
  }else{
    activePlayerCounter = 0;
  }
  let topCard = containingDeck[index];
  if(activePlayerCounter){
   topCard.addEventListener("click", function(){
     fade(this)
   });
  }
  

  let offsets = {
    pile: {
      top: deckPlaceHolder.offsetTop,
      left: deckPlaceHolder.offsetLeft
    },
    card: {
      top: +topCard.style.top.split("px")[0],
      left: +topCard.style.left.split("px")[0]
    },
    placeholder: {
      top: cardsPlaceholder[itteration -1 + activePlayerCounter].offsetTop,
      left: cardsPlaceholder[itteration -1 + activePlayerCounter].offsetLeft
    }
  };
  let currentCard = player["card" + itteration];
  let frontOfCard =  topCard.querySelector(".front");
  frontOfCard.classList.add((currentCard.suit).toLowerCase());
  frontOfCard.classList.add("rank-" + (currentCard.rank).toLowerCase());
  frontOfCard.innerHTML = ` <div class="diams  rank-${currentCard.suit + " " + currentCard.rank}">
  <span class="rank">${currentCard.rank}</span>
  <span class="suit"></span>
</div>`;

  topCard.style.left =
    offsets.card.left -
    (offsets.pile.left - offsets.card.left * -1 - offsets.placeholder.left  -30) +
    "px";
  topCard.style.top =
    offsets.card.top -
    (offsets.pile.top - offsets.card.top * -1 - offsets.placeholder.top -10) +
    "px";

  topCard.classList.remove("back");
  topCard.classList.add("hover");
}


//Fade out the cards
function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      //element.style.opacity =  (op * 100);
      op -= op * 0.1;
  }, 20);
}
