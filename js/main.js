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
const deckTable = document.getElementById("deck");
deckTable.innerHTML = deck.length;
