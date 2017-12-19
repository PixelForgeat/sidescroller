function Gameobject(shape="rect",x=0,y=0,width = 50,height = 50,cohlor = {r:0,g:0,b:0,a:255},options = { collider:false,rigidbody:false }/* options ist ein Objekt das optional mit Zusätlichen optionalen Einzeilinformationen gefüllt werden kann */){
    this.pos=new createVector(x,y); //positionvector
    this.rigidbody= options.rigidbody; // rigidbody bool
    this.collider= options.collider; //Collider bool
    this.shape=shape; //Shapestring
    this.color=cohlor; //Colorobject
    this.size=new createVector(width,height); // Sizevector

    this.show = function(){ // Gameobject Renderfunction
        noStroke();
        fill(this.color.r,this.color.g,this.color.b,this.color.a);
        if(shape=="rect")
        {
            rect(this.pos.x-(this.size.x/2),this.pos.y-(this.size.y/2),this.size.x,this.size.y);
        }
        if(shape=="ellipse")
        {
            ellipse(this.pos.x,this.pos.y,this.size.x,this.size.y);
        }
    }
    this.addrigidbody = function() {//Rigidbody hinzufügen
        if(this.rigidbody)
            {
                console.log(this);
                console.log("wurde bereits ein Rigidbody zugewiesen")
            }else{
                this.rigidbody=true;
                gameobjects[1].push(this);
                gameobjects[0].splice(this,1);
            }
    }
    this.removerigidbody = function() {//Rigidbody entfernen
        if(this.rigidbody)
            {
                this.rigidbody=false;
                gameobjects[0].push(this);
                gameobjects[1].splice(this,1);
            }else{
                console.log(this);
                console.log("wurde noch kein Rigidbody zugewiesen");
            }
    }
    this.addcollider = function() {//Collider hinzufügen
        if(this.collider)
            {
                console.log(this);
                console.log("wurde bereits ein Collider zugewiesen");
            }else{
                this.collider=true;
                gameobjects[2].push(this);
            }
    }
    this.removecollider = function() {//Collider entfernen
        if(!this.collider)
            {
                console.log(this);
                console.log("wurde noch kein Rigidbody zugewiesen");
            }else{
                this.collider=true;
                gameobjects[2].splice(this,1);
            }
    }

    if(!this.rigidbody){            // Schiebt das Object in die richtige Arrayreihe je nach übergebenen Optionen bzw standartwerten
        gameobjects[0].push(this);  // Statisches Object(Ohne Rigidbody)
    }else{
        gameobjects[1].push(this);  // Object auf das Physics wirken(mit Rigidbody)
    }
    if(this.collider){
        gameobjects[2].push(this);  // Object mit Hitbox(mit Collider) 
    }
}

let gameobjects = []; //Object Sammlung 1ROW Rigidbody 2ROW ohne Rigidbody 3ROW Pointer auf Objects mit Collider 

for(let i = 0;i < 3;i++)
{
    gameobjects[i] = []; //2Dimensionales Array initialisieren 
}