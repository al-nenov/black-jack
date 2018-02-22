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
];
const colors = ["Spades", "Hearts", "Diamonds", "Clubs"];
let deck = [];

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
      this.drawCards(this[currentCard], this["name"]);
    }
  }

  drawCards(activeCard, placeholder) {
    let position = document.getElementById(placeholder);
    const card = document.createElement("div");
    if (!!position) {
      position.appendChild(card);
    }
    card.innerHTML = activeCard.suit;
  }
  
}
function clearPlayerCards() {
  fade(_cards[deck.length + 1]);
  fade(_cards[deck.length]);
}

function dealNewCard() {
  const firstCard = deck[0];
  if (firstCard === undefined) {
    alert("Deck is empty");
    return;
  }
  deck.splice(0, 1);
  return firstCard;
}

let dealer = new Player(3, "dealer");
let player = new Player(2, "player1");

/*dealer.dealCards();
player.dealCards();*/

//Deal two cards with hit of a button
let hitButton = document.getElementById("hit");
hitButton.addEventListener("click", function() {
  player.dealCards();
});

//remaining cards
/*const deckTable = document.getElementById("deck");
deckTable.innerHTML = deck.length;
*/

//Animate the deck

card = Object.assign(document.createElement("div"), {
  className: "flip-container card back",
  style: "position:absolute; ",
  innerHTML: `<div class="flipper">
  <div class="back">
      <!-- back content -->
      back
  </div>
  <div class="front">
      <!-- front content -->
     
      front
  </div>

</div>`
});
const pileOfCards = document.getElementById("playTable"),
  _cards = document.getElementsByClassName("card");
let index = 1,
  speed = 10;
var dealTheDeck = setInterval(function() {
  let newCard = card.cloneNode(true);
  newCard.style.left = -index + "px";
  newCard.style.top = -index + "px";
  pileOfCards.appendChild(newCard);
  index += 1;
  if (index > 52) {
    clearInterval(dealTheDeck);
    dealer.dealCards();
  }
}, speed);

//Deal card to dealer
function animatedDeal(index, player, itteration) {
  let dealerCardsPlaceholder = document.getElementsByClassName(
    "cardsPlaceholder"
  );
  let activePlayerCounter;
  if(player.name !=="dealer"){
    activePlayerCounter = 3;
  
  }else{
    activePlayerCounter = 0;
  }
  let topCard = _cards[index];
  if(activePlayerCounter){
   topCard.addEventListener("click", function(){
     fade(this)
   });
  }

  let offsets = {
    pile: {
      top: pileOfCards.offsetTop,
      left: pileOfCards.offsetLeft
    },
    card: {
      top: +topCard.style.top.split("px")[0],
      left: +topCard.style.left.split("px")[0]
    },
    placeholder: {
      top: dealerCardsPlaceholder[itteration -1 + activePlayerCounter].offsetTop,
      left: dealerCardsPlaceholder[itteration -1 + activePlayerCounter].offsetLeft
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


//Fade ous the cards
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
  }, 50);
}