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
      deck.push(card + " of " + color);
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

class Player {
  constructor(numOfCards, name) {
    this.numOfCards = numOfCards;
    this.name = name;
  }

  dealCards() {
  this.clearCards();    
    for (let i = 1; i <= this.numOfCards; i += 1) {
      let currentCard = "card" + i;
      this[currentCard] = dealNewCard();
      this.drawCards(this[currentCard], this["name"]);
    }
  }

  drawCards(activeCard, placeholder) {
    let position = document.getElementById(placeholder);
    const card = document.createElement("div");
    if (!!position) {
      position.appendChild(card);
    }
    card.innerHTML = activeCard;
  }
  clearCards(){
      let position =document.getElementById(this.name)
      if(!!position){
        position.innerHTML = "";
      }
  }
}

function dealNewCard() {
  const firstCard = deck[0];
  if(firstCard === undefined){
      alert("Deck is empty");
      return;
  }
  deck.splice(0, 1);
  return firstCard;
}

let dealer = new Player(3, "dealer");
let player = new Player(2, "player1");

dealer.dealCards();
player.dealCards();


//Deal two cards with hit of a button
let hitButton = document.getElementById("hit");
hitButton.addEventListener("click",function(){
    player.dealCards();
})


//remaining cards
/*const deckTable = document.getElementById("deck");
deckTable.innerHTML = deck.length;
*/



//Animate the deck

card = Object.assign(document.createElement("div"), {
  className: "card back",
  style: "position:absolute; "
});
const pileOfCards = document.getElementById("playTable"),
_cards = document.getElementsByClassName("card");
let index = 1,
speed = 10;
var dealTheDeck = setInterval(function () {
  let newCard = card.cloneNode(true);
  newCard.style.left = -(index) + "px";
  newCard.style.top = -(index) + "px";
  pileOfCards.appendChild(newCard);
  index += 1;
  if (index > 52) {
      clearInterval(dealTheDeck);
       deal(51);
       deal(50);
       deal(49);
  }
}, speed);


//Deal card to dealer
function deal(index){
  let dealerCardsPlaceholder = document.getElementsByClassName('cardsPlaceholder');
  let topCard = _cards[index];
  let offsets = {
      pile:{
          top:pileOfCards.offsetTop,
          left:pileOfCards.offsetLeft
      },
      card:{
          top:+topCard.style.top.split("px")[0],
          left:+topCard.style.left.split("px")[0]
      },
      placeholder:{
          top:dealerCardsPlaceholder[51 - index].offsetTop,
          left:dealerCardsPlaceholder[51 - index].offsetLeft
      }
  }

  
  topCard.style.left =  offsets.card.left - (offsets.pile.left - (offsets.card.left * -1) - offsets.placeholder.left) +"px";
  topCard.style.top = offsets.card.top - (offsets.pile.top - (offsets.card.top * -1) - offsets.placeholder.top) + "px";
  
}

