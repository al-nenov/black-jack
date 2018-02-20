//deck of cards
card = Object.assign(document.createElement("div"), {
    className: "card back",
    style: "position:absolute; "
});
const deck = document.getElementById("deck"),
dealerCards = document.getElementById("dealerCards"),
cards = document.getElementsByClassName("card");

//Deal the deck of cards
let index = 1,
speed = 10;
var dealTheDeck = setInterval(function () {
    let newCard = card.cloneNode(true);
    newCard.style.left = -(index);
    newCard.style.top = -(index);

    deck.appendChild(newCard);
    index += 1;
    if (index > 52) {
        clearInterval(dealTheDeck);
        dealCards();
    }
}, speed);

function dealCards(){
    dealerCards.append(cards[cards.length-1])
}


const cardCont = document.getElementById("cardContainer");
setTimeout(() => {
    cardCont.classList += " hover";
}, 2000);
