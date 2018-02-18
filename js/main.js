// Create one full deck of cards and shuffle it
const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'D', 'K', 'A'];
const colors = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
let deck = [];

function makeDeck() {
    for (color of colors) {
        joinCards(color)
    }
    function joinCards(color) {
        for (card of cards) {
            deck.push(card + ' of ' + color);
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

// Players

class Player {
    
    constructor(numOfCards,name) {
        this.numOfCards = numOfCards;
        this.name = name;
    }

    dealCards() {
        for (let i = 1; i <= this.numOfCards; i += 1) {
            let currentCard = 'card' + i;
            this[currentCard] = deck[0];
            this.drawCards(this[currentCard],this[name]);
            deck.splice(0, 1);
            //alert(toString(this))
        }
    }

    drawCards(activeCard, placeholder) {
        //TODO refactor for more sense
        let position = document.getElementById(placeholder);
        const card = document.createElement('div');
        if(!!position){
            position.appendChild(card);
        }else{
           const newSeating =  document.createElement('div');
            newSeating.id = placeholder;
            document.body.appendChild(newSeating);
            newSeating.appendChild(card);

        }
      
        card.innerHTML = activeCard
    }

}

let dealer = new Player(3,"Dealer");
let player = new Player(2,"Player1");



dealer.dealCards();
player.dealCards();

//
const deckTable = document.getElementById('deck');
const dealerTable = document.getElementById('dealer');
const playerTable = document.getElementById('player');

deckTable.innerHTML = deck.length;

