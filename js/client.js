"use strict";

// todo single player
// * two white die play || ((window.game.wd1.num + window.game.wd2.num) == boxnum), then a "use white die option?" if activePlayer = currentPlayer (pointers to same object?)
// * game endings
// * final score in status
// * when one locks take away the dice option
// * webpack
// * npm server starts?
// * not current player (double white logic)


function setup() {
    window.p1 = new Player();
    window.game = new Game();
    window.game.activePlayer = p1;
    window.scoreTable = [0,1,3,6,10,15,21,28,36,45,55,55,78];
}

function randomizeList(myList) {    
    let l = myList.length, temp, index;  
    while (l > 0) {  
       index = Math.floor(Math.random() * l);  
       l--;  
       temp = myList[l];          
       myList[l] = myList[index];          
       myList[index] = temp;      
    }    
}

function selectBox(me) {
    let controller = me.id.substring(0,1);
    let selectOk = false;
    if (p1.openw2Yes|| p1.openSelection) {
        switch(controller){
            case "r": {
                if(p1.isValidChoiceAll(me, p1.redOptions, p1.redSelected, window.game.rd)) {
                    selectOk = true;
                }
                break;
            }
            case "b": {
                if(p1.isValidChoiceAll(me, p1.blueOptions, p1.blueSelected, window.game.bd)) {
                    selectOk = true;
                }
                break;
            }
            case "y": {
                if(p1.isValidChoiceAll(me, p1.yellowOptions, p1.yellowSelected, window.game.yd)) {
                    selectOk = true;
                }
                break;
            }
            case "g": {
                if(p1.isValidChoiceAll(me, p1.greenOptions, p1.greenSelected, window.game.gd)) {
                    selectOk = true;
                }
                break;
            }
            case "w": {
                p1.negScore -= 5;
                selectOk = true;
                break;
            }
        }
    }
    if(selectOk){
        document.getElementById(me.id).style.borderRadius = "50%";
        document.getElementById(me.id).style.textDecoration = "line-through";
        document.getElementById(me.id).disabled = true;
        let r = window.scoreTable[p1.redSelected.length];   
        let y = window.scoreTable[p1.yellowSelected.length];
        let g = window.scoreTable[p1.greenSelected.length]; 
        let b = window.scoreTable[p1.blueSelected.length];  
        window.scoreTable[p1.blueSelected.length];  
        document.getElementById("rs").innerHTML = r; 
        document.getElementById("ys").innerHTML = y;  
        document.getElementById("gs").innerHTML = g;   
        document.getElementById("bs").innerHTML = b; 
        document.getElementById("total").innerHTML = "Total: " + (r + y + g + b + p1.negScore);   
        if (p1.openw2Yes) {
            p1.openw2Yes = false;
            window.game.w2NoClick();
        } else {
            document.getElementById("dice").disabled = false;
            p1.openSelection = false;
            document.getElementById("status").innerHTML = "Roll Away!";
        }
    } else {
        document.getElementById("status").innerHTML = "Sorry, please pick another cell, that one isn't legal!";
    }
}

class Player {
    constructor() {
        this.redOptions = ["r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","rlock"];
        this.yellowOptions = ["y2","y3","y4","y5","y6","y7","y8","y9","y10","y11","y12","ylock"];
        this.greenOptions = ["g12","g11","g10","g9","g8","g7","g6","g5","g4","g3","g2","glock"];
        this.blueOptions = ["b12","b11","b10","b9","b8","b7","b6","b5","b4","b3","b2","block"];

        this.redSelected = [];
        this.yellowSelected = [];
        this.greenSelected = [];
        this.blueSelected = [];
        this.negScore = 0;
        this.openSelection = false;
        this.openw2Yes = false;
        this.madeAChoiceThisRound = false;
    }

    isValidChoiceAll(me, colorOption, spotSelected, colorDie){
        let isit = false;
        if(colorOption.includes(me.id)){
            let boxnum = me.id.substring(1);
  
            if( ((colorDie.num + window.game.wd1.num) == boxnum) || ((colorDie.num + window.game.wd2.num) == boxnum) && !p1.openw2Yes){
                isit = true;
            }

            if( p1.openw2Yes ){
                if((window.game.wd2.num + window.game.wd1.num) == boxnum){
                    isit = true;
                    p1.openw2Yes = false;
                }
            }
            if(isit){
                let i = colorOption.indexOf(me.id);
                for(let j = 0; j < i; j++){
                    document.getElementById(colorOption[j]).disabled = true;
                }
                colorOption.splice(0,i);
                spotSelected.push(me.id);
                if(spotSelected.length >= 2){
                    let controller = me.id.substring(0,1);
                    if(controller=="r" || controller=="y"){
                        document.getElementById(controller + "12").disabled = false;
                    } else {
                        document.getElementById(controller + "2").disabled = false;
                    }
                    document.getElementById(controller + "lock").disabled = false;
                }
            }
        }
        return isit;
    }
}

class Game{
    constructor(){
        this.rd = new Die("red");
        this.bd = new Die("blue");
        this.yd = new Die("yellow");
        this.gd = new Die("green");
        this.wd1 = new Die("white");
        this.wd2 = new Die("white");

        this.diceOrder = ["d1","d2","d3","d4","d5","d6"];
        this.diceColors = ["white","white","red","green","blue","yellow"];
        this.diceValues = [];

        this.activePlayer = null;
        this.playerOrder = [];
        this.lastTurn = false;
        this.roundCounter = 0;
    }

    w2YesClick() {
        p1.openw2Yes = true;
        document.getElementById("w2Yes").hidden = true;
        document.getElementById("w2No").hidden = true;
        this.madeAChoiceThisRound = true;
    }

    w2NoClick() {
        document.getElementById("status").innerHTML = "Ok, would you like to a color and a white dice?";
        document.getElementById("w2Yes").hidden = true;
        document.getElementById("w2No").hidden = true;
        document.getElementById("colorYes").hidden = false;
        document.getElementById("colorNo").hidden = false;
    }
    
    colorYesClick() {
        p1.openSelection = true;
        document.getElementById("colorYes").hidden = true;
        document.getElementById("colorNo").hidden = true;
        this.madeAChoiceThisRound = true;
    }

    colorNoClick() {
        if (!this.madeAChoiceThisRound) {
            document.getElementById("status").innerHTML = "You MUST choose a color since you didn't choose 2 white dice.  Sorry.";
            document.getElementById("colorNo").hidden = true;
        } else {
            document.getElementById("dice").disabled = false;
            p1.openSelection = false;
            document.getElementById("status").innerHTML = "Roll Away!";
            document.getElementById("colorYes").hidden = true;
            document.getElementById("colorNo").hidden = true;
        }
    }

    rollDice() {
        this.madeAChoiceThisRound = false;
        this.roundCounter += 1;
        // reset status so it is clear
        document.getElementById("status").innerHTML = "Good Luck! Roll# " + this.roundCounter;
        // randomize dice values
        for(var i = 0; i < 6; i++){
            this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
        }
        // randomize dice colors 
        randomizeList(this.diceColors);
        // randomize  dice order
        randomizeList(this.diceOrder);
        // put in dice boxes
        this.wd1.num = 0; // to ensure we know which white hit first
        for(var k = 0; k < 6;k++){
            switch(this.diceColors[k]) {
                        case "white":
                            if (this.wd1.num == 0){
                                this.wd1.num = this.diceValues[k];
                                this.wd1.pos = this.diceOrder[k];
                            } else {
                                this.wd2.num = this.diceValues[k];
                                this.wd2.pos = this.diceOrder[k];
                            };
                            break;
                        case "red":
                            this.rd.num = this.diceValues[k];
                            this.rd.pos = this.diceOrder[k];
                            break;
                        case "yellow":
                            this.yd.num = this.diceValues[k];
                            this.yd.pos = this.diceOrder[k];
                            break;
                        case "green":
                            this.gd.num = this.diceValues[k];
                            this.gd.pos = this.diceOrder[k];
                            break;
                        case "blue":
                            this.bd.num = this.diceValues[k];
                            this.bd.pos = this.diceOrder[k];
                            break;
                    }
                } 
        for(var i = 0; i < 6; i++){
            document.getElementById("d" + (i+1)).innerHTML = this.diceValues[i];
            document.getElementById("d" + (i+1)).style.backgroundColor = this.diceColors[i];
        }
        document.getElementById("dice").disabled = true;
        document.getElementById("w2Yes").hidden = false;
        document.getElementById("w2No").hidden = false;
        document.getElementById("status").innerHTML = "Do you want to use the two white dice?";
    }
}

class Die {
    constructor(incomingColor){
        this.color =  incomingColor;
        this.num = 0;
        this.pos = 0;
    }
}

