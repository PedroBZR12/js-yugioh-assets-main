const state ={
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points")
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },
    button: document.getElementById("next-duel"),

};

const playerSides ={
    player1: "player-cards",
    computer: "computer-cards"
}
const pathImages = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: "Blue-Eyes White Dragon",
        type: "Papel",
        avatar: pathImages + "dragon.png",
        WinOf: [1],
        LoseOf: [2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        avatar: pathImages + "magician.png",
        WinOf: [2],
        LoseOf: [0]
    },
    {
        id: 2,
        name: "Blue-Eyes White Dragon",
        type: "Scissors",
        avatar: pathImages + "exodia.png",
        WinOf: [0],
        LoseOf: [1]
    }
];


async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");


    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", () =>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
        cardImage.addEventListener("mouseover", () =>{
            drawSelectCard(IdCard);
        });
    }


    document.getElementById(fieldSide).appendChild(cardImage);
    return cardImage;
}

async function setCardsField(IdCard){
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[IdCard].avatar;
    state.fieldCards.computer.src = cardData[computerCardId].avatar;

    let duelResult = await checkDuelResults(IdCard, computerCardId);

    await updateScore();
    await drawButton(duelResult)
}


async function drawButton(text){
    state.button.innerText = text;
    state.button.style.display = "block";
}

async function updateScore(){
    state.score.playerScore = playerScore;
    state.score.computerScore = computerScore;
    state.score.scoreBox.innerText = `Jogador: ${state.score.playerScore} - Computador: ${state.score.computerScore}`;
}

async function checkDuelResults(){
    let duelResult = "Empate";
    let playerCard = cardData[IdCard];
    let computerCard = cardData[computerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResult = "Ganhou";
        playerScore++;
    } else if (playerCard.LoseOf.includes(computerCardId)) {
        duelResult = "Perdeu";
        computerScore++;
    }

    return duelResult;
}

async function removeAllCardsImages() {
    let cards = document.querySelectorAll("#computer-cards");
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach(img => img.remove());

    cards = document.querySelectorAll("#player-cards");
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach(img => img.remove());
}

async function drawSelectCard(IdCard){
    state.cardSprites.avatar.src = cardData[IdCard].avatar;
    state.cardSprites.name.innerText = cardData[IdCard].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[IdCard].type;
}


async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}


function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}




init();
