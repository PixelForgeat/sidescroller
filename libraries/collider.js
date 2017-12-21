function collider()
{
    for(let i00;i<gameobjects[2].length,i++;){
        this.x=gameobjects[2][i].x;
        this.y=gameobjects[2][i].y;
        this.size=gameobjects[2][i].size;
        this.vx=gameobjects[2][i].vx;
        this.vy=gameobjects[2][i].vy;
        for(let j=0;;j++){
            if(j==i)
            {
                continue;
            }
            //Rechts an other Collider Hit 
            if(this.x<=gameobjects[2][j].x+gameobjects[2][j].size.x  &&  this.x+this.size.x>=gameobjects[2][j].x+gameobjects[2][j].size.x  &&  this.y>=gameobjects[2][j].y+gameobjects[2][j].size.y  &&  this.y+this.size.y>=gameobjects[2][j].y){
                this.vx=0
            }
            //Links an other Collider Hit
            if(this.x<=gameobjects[2][j].x  &&  this.x+this.size.x>=gameobjects[2][j].x  &&  this.y>=gameobjects[2][j].y+gameobjects[2][j].size.y  &&  this.y+this.size.y>=gameobjects[2][j].y){
                this.vx=0
            }
            //Oben an other Collider Hit
            if(this.x<=gameobjects[2][j].x+gameobjects[2][j].size.x  &&  this.x+this.size.x<=gameobjects[2][j].x  &&  this.y+this.size.y>=gameobjects[2][j].y  && this.y<=gameobjects[2][j].y)
            {
                this.vy=0
            }
            //Unten an other Collider Hit
            if(this.x<=gameobjects[2][j].x+gameobjects[2][j].size.x  &&  this.x+this.size.x<=gameobjects[2][j].x  &&  this.y<=gameobjects[2][j].y+gameobjects[2][j].size.y  && this.y+this.size.y>=gameobjects[2][j].y+gameobjects[2][j].size.y)
            {
                this.vy=0
            }
        }
    }
}