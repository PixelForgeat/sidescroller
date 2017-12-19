let gaben = [];

let player = new Pfusch();

function setup(){
    //player.jud();
}

function Pfusch()
{
    this.baum=true;
    this.Wald=false;
    gaben.push(this);
    this.jud = function(){
        gaben.splice(this,1);
    }
}

function draw(){

}