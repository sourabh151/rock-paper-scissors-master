// ELEMENTS
var rules = document.querySelector(".rules");
var rulePanel = document.querySelector(".rule-panel");
var cancel = document.querySelector(".cancel");
var b1 = document.querySelector(".button1-container");
var b2 = document.querySelector(".button2-container");
var b3 = document.querySelector(".button3-container");
var buttons = document.querySelectorAll(".button-containers");
var game = document.querySelector(".container");
var heading1 = document.querySelector(".button1-container h2");
var heading2 = document.querySelector(".button2-container h2");
var bgCircle = document.querySelector(".button2-container .bg-circle");
var button2 = document.querySelector("#b2");
var score = document.querySelector(".score");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var draw = document.querySelector(".draw");
var playAgainAll = document.querySelectorAll(".play-again");
var scoreValue = 0;


var pc = [];
var cc = [];
var list = ["paper", "scissor", "rock"];
// GET AND RECORD CLASSES
for (var i = 0; i < 3; i++) {
    pc.push(buttons[i].children[0].className.split(' '));
    cc.push(buttons[i].children[0].children[0].className.split(' '));
}


// LISTEN BUTTON CLICKS
for (var i = 0; i < 3; i++) {
    buttons[i].addEventListener("click", clicked, true);
}

function clicked(event) {
    var parentClasses = event.currentTarget.children[0].className

    var childClasses = event.currentTarget.children[0].children[0].className;

    event.stopImmediatePropagation();

    //B1 CLASSES EXCHANGE
    changeClasses(b1, parentClasses, childClasses);
    for (var i = 0; i < 3; i++) {
        buttons[i].style.pointerEvents = "none";
    }
    start();

}

// FUNCTION START
function start() {
    game.classList.remove("gameBG");
    b3.style.display = "none";
    heading1.style.display = "block";
    heading2.style.display = "block";
    button2.style.display = "none";
    bgCircle.style.display = "block";
    var random = getRandomButton();
    setTimeout(() => {
        changeClasses(b2, pc[random].toString().replace(",", " "), cc[random].toString().replace(",", " "));
        bgCircle.style.display = "none";
        button2.style.display = "flex";
        setTimeout(() => {
            var won = checkWin();
            if (won == 0) {
                //LOSE
                b2.classList.add("shadows");
                lose.style.display = "block";
            } else if (won == 1) {
                //WIN
                b1.classList.add("shadows");
                incrementScore();
                win.style.display = "block";
            } else {
                //DRAW
                draw.style.display = "block";
            }
        }, 500);
    }, 1000);
}

//FUNCTION PLAYAGAIN EVENT LISTENER
for (var i = 0; i < 3; i++) {
    playAgainAll[i].addEventListener("click", () => {
        heading1.style.display = "none";
        heading2.style.display = "none";
        b3.style.display = "flex";
        game.classList.add("gameBG");
        b1.classList.remove("shadows");
        b2.classList.remove("shadows");

        // game.style.background = "url('chrome-extension://lkfkkhfhhdkiemehlpkgjeojomhpccnh/rps/images/bg-triangle.svg') no-repeat center";
        changeClasses(b1, pc[0].toString().replace(",", " "), cc[0].toString().replace(",", " "));
        changeClasses(b2, pc[1].toString().replace(",", " "), cc[1].toString().replace(",", " "));

        for (var i = 0; i < 3; i++) {
            buttons[i].style.pointerEvents = "auto";
        }



        win.style.display = "none";
        lose.style.display = "none";
        draw.style.display = "none";
    });
}

// FUNCTION RANDOM BUTTON
function getRandomButton() {
    return Math.floor(Math.random() * 3);
}

// FUNCTION CHECKWIN
function checkWin() {
    var select = b1.children[0].children[0].classList[1];
    var houseSelect = b2.children[0].children[0].classList[1];
    var posSelect = list.indexOf(select);
    var posHouseSelect = list.indexOf(houseSelect);

    if (posSelect == 0) {
        if (posHouseSelect == 0) {
            return 2;
        }
        if (posHouseSelect == 1) {
            return 0;
        }
        if (posHouseSelect == 2) {
            return 1;
        }
    } else if (posSelect == 1) {
        if (posHouseSelect == 0) {
            return 1;
        }
        if (posHouseSelect == 1) {
            return 2;
        }
        if (posHouseSelect == 2) {
            return 0;
        }
    } else {
        if (posHouseSelect == 0) {
            return 0;
        }
        if (posHouseSelect == 1) {
            return 1;
        }
        if (posHouseSelect == 2) {
            return 2;
        }
    }

}

// FUNCTION INCREMENT SCORE
function incrementScore() {
    var scoreString;
    if (++scoreValue < 10) {
        scoreString = "0" + scoreValue;
    } else {
        scoreString = scoreValue;
    }
    score.innerText = scoreString;
}

//FUNCTION CHANGECLASSES
function changeClasses(target, pc, cc) {
    //SAVE ATTRIBUTES
    var left = target.getAttribute("left");
    var right = target.getAttribute("right");
    var top = target.getAttribute("top");
    var bottom = target.getAttribute("bottom");


    target.children[0].classList.remove(...(target.children[0].className.split(' ')));

    target.children[0].classList.add(...(pc.split(' ')));

    target.children[0].children[0].classList.remove(...(target.children[0].children[0].className.split(' ')));

    target.children[0].children[0].classList.add(...(cc.split(' ')));

    target.setAttribute("left", left);
    target.setAttribute("right", right);
    target.setAttribute("top", top);
    target.setAttribute("bottom", bottom);



}




// RULES VIEW AND HIDE
rules.addEventListener("click", () => {
    rulePanel.style.display = "flex";
});

cancel.addEventListener("click", () => {
    rulePanel.style.display = "none";
});