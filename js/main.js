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
let dealer = {
    numOfCards:3
}
let player = {
    numOfCards:2
}


function dealCards(user){
    for(i=1; i<=user.numOfCards; i+=1){
        let currentCard = 'card'+i;
        user[currentCard] = deck[0];
        deck.splice(0,1);
    }
}
dealCards(dealer);
dealCards(player);
console.log(dealer);
console.log(player);