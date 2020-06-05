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

    randomizeList(myList) {    
        let l = myList.length, temp, index;  
        while (l > 0) {  
           index = Math.floor(Math.random() * l);  
           l--;  
           temp = myList[l];          
           myList[l] = myList[index];          
           myList[index] = temp;      
        }    
     }
    
    rollDice() {
        // randomize dice values
        for(var i = 0; i < 6; i++){
            this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
        }
        // randomize dice colors 
        randomizeList(this.diceColors);
        // randomize  dice order
        ramdomizeList(this.diceOrder);
        // put in dice boxes
        wd1 = 0; // to ensure we know which white hit first
        for(var k = 0; k < 6;k++){
            switch(diceColors[k]) {
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
            }

        }
        for(var i = 0; i < 6; i++){
            document.getElementById("d" + (i+1)).innerHTML = this.diceValues[i];
            document.getElementById("d" + (i+1)).style.backgroundColor = this.diceColors[i];
    }
}