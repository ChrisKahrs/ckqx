function setup() {
    window.redList = ["r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","rlock"];
    window.yellowList = ["y2","y3","y4","y5","y6","y7","y8","y9","y10","y11","y12","ylock"];
    window.greenList = ["g12","g11","g10","g9","g8","g7","g6","g5","g4","g3","g2","glock"];
    window.blueList = ["b12","b11","b10","b9","b8","b7","b6","b5","b4","b3","b2","block"];
    window.diceList = ["d1","d2","d3","d4","d5","d6"];
    window.diceColors = ["white","white","red","green","blue","yellow"];
    window.rd0 = 0;
    window.bd0 = 0;
    window.yd0 = 0;
    window.gd0 = 0;
    window.wd1 = 0;
    window.wd2 = 0;
    window.rs = 0;
    window.ys = 0;
    window.gs = 0;
    window.bs = 0;
    window.ws1 = 0;
    window.ws2 = 0;
    window.ws3 = 0;
    window.ws4 = 0;
    window.total = 0;
}


function randomizeList(myArr) {    
    let l = myArr.length, temp, index;  
    while (l > 0) {  
       index = Math.floor(Math.random() * l);  
       l--;  
       temp = myArr[l];          
       myArr[l] = myArr[index];          
       myArr[index] = temp;      
    }    
 }

function rollDice() {
    let diceLister = randDice(6);
    randomizeList(window.diceColors);
    displayDice(diceLister);
    // loadValidOptions();

}

function displayDice(diceLister){
    window.rd0 = 0;
    window.bd0 = 0;
    window.yd0 = 0;
    window.gd0 = 0;
    window.wd1 = 0;
    window.wd2 = 0;
    for(var i = 0; i < diceLister.length; i++){
        document.getElementById("d" + (i+1)).innerHTML = diceLister[i];
        document.getElementById("d" + (i+1)).style.backgroundColor = window.diceColors[i];
        switch(window.diceColors[i]){
            case "white":
                if (window.wd1 == 0){
                    window.wd1 = diceLister[i];
                } else {
                    window.wd2 = diceLister[i];
                };
                break;
            case "red":
                window.rd0 = diceLister[i];
                break;
            case "yellow":
                window.yd0 = diceLister[i];
                break;
            case "green":
                window.gd0 = diceLister[i];
                break;
            case "blue":
                window.bd0 = diceLister[i];
                break;
        }
    } 
}

function randDice (numDice) {
    let dList = [];
    for(var i = 0; i < numDice; i++){
        dList[i] = Math.floor(Math.random() * 6) + 1;
    }
    return dList;
}

function selectBox(me) {
    let i = redList.indexOf(me.id);
    document.getElementById(redList[i]).style.borderRadius = "50%";
    document.getElementById(redList[i]).style.textDecoration = "line-through";
    // updateScore();
    window.rs += 1;
    document.getElementById("rs").innerHTML = window.rs;


}

function resetAll() {
    for(var i = 0; i<redList.length; i++){
        document.getElementById(redList[i]).disabled = false;
        document.getElementById(redList[i]).style.borderRadius = "0";
        document.getElementById(redList[i]).style.textDecoration = "none";
        document.getElementById(redList[i]).style.fontWeight = "normal";
        setup();
    }
}