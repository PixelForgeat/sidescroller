function Gameobject(shape="rect",x=0,y=0,width,height,collider=false,){
    this.pos=new createVector(x,y);
    this.rigidbody=false;
    this.collider=collider;
    this.shape=shape;
    this.size=new createVector(width,height);
    this.show = function(){
        if(shape=="rect")
        {
            rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
        }
        if(shape=="ellipse")
        {
            ellipse(this.pos.x,this.pos.y,this.size.x,this.size.y);
        }
    }
    this.addrigidbody = function() {
        this.rigidbody=true;
    }
    this.removerigidbody = function() {
        this.rigidbody=false;
    }








    if(this.static){
        gameobjects[0].push(new this);
    }
}

let gameobjects = []; //Object Sammlung 1Dim Rigidbody 2Dim ohne Rigidbody 3Dim Pointer auf Objects mit Collider 

for(let i = 0;i < 3;i++)
{
    gameobjects[i] = [];
}

function centermode(){
    rectMode(CENTER);
}

centermode();