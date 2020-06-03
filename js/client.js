function clickfunc() {
    document.getElementById("r2").disabled=true;
}

function rollDice() {
    enableAll();
    clearChoice();
    var die1 = document.getElementById("die1");
    var die1 = document.getElementById("die1");
    var status = document.getElementById("status");
    var d1 = Math.floor(Math.random() *6) + 1 ; 
    var d2 = Math.floor(Math.random() *6) + 1 ; 
    var diceTotal = d1 + d2;
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    status.innerHTML = "You Rolled: " + diceTotal + "!";
    highlightRight(diceTotal);
}

function disableLeft(me) {
    var redList = ["r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","rlock"];
    redList = redList.reverse();
    i = redList.indexOf(me.id);
    document.getElementById(redList[i]).style.borderRadius = "50%";
    document.getElementById(redList[i]).style.textDecoration = "line-through";
    for(i; i<redList.length; i++){
        document.getElementById(redList[i]).disabled = true;
    }
}

function enableAll() {
    var redList = ["r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","rlock"];
    for(var i = 0; i<redList.length; i++){
        document.getElementById(redList[i]).disabled = false;
        document.getElementById(redList[i]).style.borderRadius = "0";
        document.getElementById(redList[i]).style.textDecoration = "none";
    }
}

function highlightRight (diceTotal) {
    var redList = ["r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","rlock"];
    var i = diceTotal - 2;
    for(i; i<redList.length; i++){
        document.getElementById(redList[i]).style.fontWeight = "bolder";
    }
}

function clearChoice() {
    var redList = ["r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","rlock"];
    for(var i = 0; i<redList.length; i++){
        document.getElementById(redList[i]).style.fontWeight = "normal";
}
}