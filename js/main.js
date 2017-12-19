let player = [];
function setup(){
    createCanvas(500,500);
    for(let i = 0; i < 10;i++)
        {
            player[i] = new Gameobject("ellipse",random(100,400),random(100,400),random(5,200),random(5,200),{r:random(0,255),g:random(0,255),b:random(0,255),a:150});
        }
}

function draw(){
    background("yellow");





    renderer();//immer als letztes ausführen
}