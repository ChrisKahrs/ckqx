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
}