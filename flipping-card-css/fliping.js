

//Animate the deck

card = Object.assign(document.createElement("div"), {
    className: "card back",
    style: "position:absolute; "
});
const deck = document.getElementById("deck"),
cards = document.getElementsByClassName("card");
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
         deal(51);
         deal(50);
         deal(49);
    }
}, speed);


//Deal card to dealer
function deal(index){
    let dealerCardsPlaceholder = document.getElementsByClassName('cardsPlaceholder');
    let topCard = cards[index];
    let offsets = {
        deck:{
            top:deck.offsetTop,
            left:deck.offsetLeft
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

    
    topCard.style.left =  offsets.card.left - (offsets.deck.left - (offsets.card.left * -1) - offsets.placeholder.left);
    topCard.style.top = offsets.card.top - (offsets.deck.top - (offsets.card.top * -1) - offsets.placeholder.top);
    
}

/*const cardCont = document.getElementById("cardContainer");
setTimeout(() => {
    cardCont.classList += " hover";
}, 2000);
*/