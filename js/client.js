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
    let [d1,d2,d3,d4,d5,d6] = diceLister;
    randomizeList(window.diceColors);
    displayDice(diceLister);
    // lightUpOptions();  TODO
    var diceTotal = d1 + d2;
    var status = buildStatus(diceLister);
    highlightChoice(diceTotal);
}

function buildStatus(par){
    document.getElementById("status").innerHTML = 
    "Red options: " + (window.rd0 + window.wd1) + " or " + (window.rd0 + window.wd2)  + "<br> " 
    + "Yellow: " + (window.yd0 + window.wd1) + " or " + (window.yd0 + window.wd2) + "<br> " 
    + "gd0: " + window.gd0 + "<br> " 
    + "bd0: " + window.bd0 + "<br> " 
    + "wd1: " + window.wd1 + "<br> " 
    + "wd2: " + window.wd2 + "<br> " ;
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
    let revRedList = JSON.parse(JSON.stringify(redList));
    revRedList.reverse();
    let i = revRedList.indexOf(me.id);
    document.getElementById(revRedList[i]).style.borderRadius = "50%";
    document.getElementById(revRedList[i]).style.textDecoration = "line-through";
    for(i; i<revRedList.length; i++){
        document.getElementById(revRedList[i]).disabled = true;
    }
}

function resetAll() {
    for(var i = 0; i<redList.length; i++){
        document.getElementById(redList[i]).disabled = true;
        document.getElementById(redList[i]).style.borderRadius = "0";
        document.getElementById(redList[i]).style.textDecoration = "none";
        document.getElementById(redList[i]).style.fontWeight = "normal"
    }
}

function highlightChoice (diceTotal) {
    var i = diceTotal - 2;
    document.getElementById(redList[i]).style.fontWeight = "bolder";
}

function clearChoice() {

}