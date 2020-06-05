const { AsyncSeriesWaterfallHook } = require("tapable");
const { isMainThread } = require("worker_threads");

function setup() {
    window.p1 = new Player();
    window.game = new Game();
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
    // verify they can?
    if(p1.isValidChoice(me)) {
        let i = p1.redOptions.indexOf(me.id);
        p1.redOptions.splice(0,i);
        p1.redSelected.push(me.id);
        document.getElementById(me.id).style.borderRadius = "50%";
        document.getElementById(me.id).style.textDecoration = "line-through";
        document.getElementById(me.id).disabled = true;
    } else {
        alert("Invalid choice, please try another!")
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
    }

    getRS(){
        return this.redListSelected.length;
    }

    isValidChoice(me){
        let isit = false;
        if(this.redOptions.includes(me.id)){
            let boxnum = me.id.substring(1);
            if(((window.game.rd + window.game.wd1) == boxnum)|| ((window.game.rd + window.game.wd2 == boxnum)){
                isit = true;
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

        this.playerOrder = [];
        this.lastTurn = false;
    }

    verifyState() {
        return true;
    }

   
    rollDice() {
        // randomize dice values
        for(var i = 0; i < 6; i++){
            this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
        }
        // randomize dice colors 
        randomizeList(this.diceColors);
        // randomize  dice order
        randomizeList(this.diceOrder);
        // put in dice boxes
        this.wd1 = 0; // to ensure we know which white hit first
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
    }
}

class Die {
    constructor(incomingColor){
        this.color =  incomingColor;
        this.num = 0;
        this.pos = 0;
    }
}