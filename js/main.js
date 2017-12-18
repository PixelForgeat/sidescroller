function setup()
{
    createCanvas(700*scaler,600*scaler);  
    initblock();
}
const electron = require('electron');
let wincountred = 1;
let wincountyellow = 1;
let redwins = 0;
let yellowwins = 0;
let ch=0;
let waitingforscale = true;
let test;
let scaler = 0;

let COL =7;
let ROW =6;
let game=true;

let blocks = [];

function draw()
{
        if(game)
        {
            if(scaler!=require('electron').remote.getGlobal('scaler'))
            {
                let xtemp=window.outerWidth-window.innerWidth;
                let ytemp=window.outerHeight-window.innerHeight;
                scaler = require('electron').remote.getGlobal('scaler');
                let element = document.getElementById("defaultCanvas0");
                element.parentNode.removeChild(element);
                createCanvas(700*scaler,600*scaler);
                require('electron').remote.getGlobal('mainWindow').setSize(700*scaler+xtemp,600*scaler+ytemp);
            }
            setbg();
            let wincheckenable = true;
            for(let i = 0; i<ROW ; i++ )
            {
                for(let j = 0; j<COL;j++)
                {
                    if(blocks[i][j])
                    {
                        ch++;
                        if(blocks[i][j].falling>0)
                            {
                                wincheckenable=false;
                                blocks[i][j].falling-=15;
                                if(blocks[i][j].falling<0)
                                    {
                                        blocks[i][j].falling=0;
                                    }
                            }
                        blocks[i][j].show();                        
                    }
                }
                console.log(wincheckenable);
                for(let j = 0; j<COL;j++)
                {
                    if(wincheckenable && ch!=0)
                    {
                        if(blocks[i][j])
                            {
                                if(blocks[i][j].check(i,j)==true)
                                    {
                                        if(wincountred>=4)
                                        {
                                            game=false;
                                            break;
                                        }
                                        if(wincountyellow>=4)
                                        {
                                            game=false;
                                            break;
                                        }
                                    }
                            }
                    }
                }
                if(wincountred>=4)
                {
                    break;
                }
                if(wincountyellow>=4)
                {
                    break;
                }
            }
            if(ch==42)
            {
                game=false;
            }else{
                ch=0;
            }
            fill(0,0,255);
            textSize(12*scaler);
            if (pfusch%2==0){
                text("Rot ist am Zug",10*scaler,20*scaler);
            }else{
                text("Gelb ist am Zug",10*scaler,20*scaler);
            }
            text("Gelb hat ",10*scaler,35*scaler);
            text(yellowwins,60*scaler,35*scaler);
            text(" Spiele gewonnen.",75*scaler,35*scaler);
            text("Rot hat ",10*scaler,50*scaler);
            text(redwins,55*scaler,50*scaler);
            text(" Spiele gewonnen.",70*scaler,50*scaler);
            textSize(20*scaler);
            for(let i = 1;i<=7;i++)
            {
                fill(255);
                text(i,(i*100-55)*scaler,555*scaler);
            }
        }else if(wincountred>=4)
        {
            textSize(25*scaler);
            for(let i = 0; i<ROW ; i++ )
            {
                for(let j = 0; j<COL;j++)
                {
                    if(blocks[i][j])
                    {
                        blocks[i][j].show();
                    }
                }
            }
            fill(255);
            text("Rot hat gewonnen!",250*scaler,250*scaler);
            text("Druecke Enter.",250*scaler,300*scaler);
            if(keyIsDown(13))
            {
                winred();
            }
        }else if (wincountyellow>=4){
            textSize(25*scaler);
            for(let i = 0; i<ROW ; i++ )
            {
                for(let j = 0; j<COL;j++)
                {
                    if(blocks[i][j])
                    {
                        blocks[i][j].show();
                    }
                }
            }
            fill(255);
            text("Gelb hat gewonnen!",250*scaler,250*scaler);
            text("Druecke Enter.",250*scaler,300*scaler);
            if(keyIsDown(13))
            {
                winyellow();
            }
        }else if(ch==42){
            textSize(25*scaler);
            for(let i = 0; i<ROW ; i++ )
            {
                for(let j = 0; j<COL;j++)
                {
                    if(blocks[i][j])
                    {
                        blocks[i][j].show();
                    }
                }
            }
            fill(255);
            text("Keiner hat gewonnen!",250*scaler,250*scaler);
            text("Druecke Enter.",250*scaler,300*scaler);
            if(keyIsDown(13))
            {
                unentschieden();
            }
        }
}

let pfusch = 0;
let cohlor
    function keyPressed()
    {
        let fallingcheck=false;
        for(let i = 0; i<ROW ; i++ )
            {
                for(let j = 0; j<COL;j++)
                {
                    if(blocks[i][j])
                    {
                        if(blocks[i][j].falling>0)
                            {
                                fallingcheck=true
                            }
                    }
                }
            }
        if(!fallingcheck)
            {
                if (pfusch%2==0){
                    cohlor = "red";
                }else{
                    cohlor = "yellow";
                }
                if(game)
                {
                if(keyCode == 49)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][0])
                        {
                            blocks[i][0] = new Blockcons(cohlor,0,i);
                            pfusch++;
                            break;
                        }
                    }
                }
                if(keyCode == 50)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][1])
                        {
                            blocks[i][1] = new Blockcons(cohlor,1,i);
                            pfusch++;
                            break;
                        }
                    }
                }
                if(keyCode == 51)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][2])
                        {
                            blocks[i][2] = new Blockcons(cohlor,2,i);
                            pfusch++;
                            break;
                        }
                    }
                }
                if(keyCode == 52)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][3])
                        {
                            blocks[i][3] = new Blockcons(cohlor,3,i);
                            pfusch++;
                            break;
                        }
                    }
                }
                if(keyCode == 53)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][4])
                        {
                            blocks[i][4] = new Blockcons(cohlor,4,i);
                            pfusch++;
                            break;
                        }
                    }
                }
                if(keyCode == 54)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][5])
                        {
                            blocks[i][5] = new Blockcons(cohlor,5,i);
                            pfusch++;
                            break;
                        }
                    }
                }
                if(keyCode == 55)
                {
                    for(let i = ROW-1;i>=0;i--)
                    {
                        if(!blocks[i][6])
                        {
                            blocks[i][6] = new Blockcons(cohlor,6,i);
                            pfusch++;
                            break;
                        }
                    }
                }
            }
            }
    }

function Blockcons(color,x,y)
{
    this.x = ((x+1)*100-50)*scaler;
    this.y = ((y+1)*100-50)*scaler;
    this.color=color;
    this.win=false;
    this.falling = this.y-50*scaler;

    this.show = function()
    {
        if(!this.win)
        {
            fill(this.color);
        }else{
            fill("orange");
        }
            ellipse(this.x,this.y-this.falling,50*scaler,50*scaler);
    }
    this.check = function(i,j)
    {
        this.i = i;
        this.j = j;
        let status = true;
        for(;status;)
        {
            if(this.color=="red")
            {
                for(this.i--;this.i>=0;this.i--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.i=i;
                for(this.i++;this.i<6;this.i++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountred>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountred=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                this.i=i;
                this.j=j;
                for(this.j--;this.j>=0;this.j--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.j=j;
                for(this.j++;this.j<7;this.j++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountred>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountred=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j--,this.i--;this.j>=0&&this.i>=0;this.j--,this.i--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j++,this.i++;this.j<7&&this.i<6;this.j++,this.i++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountred>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountred=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j++,this.i--;this.j>=0&&this.i>=0;this.j++,this.i--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j--,this.i++;this.j<7&&this.i<6;this.j--,this.i++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountred++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountred>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountred=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                status = false;
            }else{
                for(this.i--;this.i>=0;this.i--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.i=i;
                for(this.i++;this.i<6;this.i++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountyellow>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountyellow=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                this.i=i;
                this.j=j;
                for(this.j--;this.j>=0;this.j--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.j=j;
                for(this.j++;this.j<7;this.j++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountyellow>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountyellow=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j--,this.i--;this.j>=0&&this.i>=0;this.j--,this.i--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j++,this.i++;this.j<7&&this.i<6;this.j++,this.i++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountyellow>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountyellow=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j++,this.i--;this.j>=0&&this.i>=0;this.j++,this.i--)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                this.j=j;
                this.i=i;
                for(this.j--,this.i++;this.j<7&&this.i<6;this.j--,this.i++)
                {
                    if(blocks[this.i][this.j])
                    {
                        if(this.color == blocks[this.i][this.j].color)
                        {
                            wincountyellow++;
                            blocks[this.i][this.j].win=true;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
                if(wincountyellow>=4)
                {
                    this.win=true;
                    return true;
                }else{
                    wincountyellow=1;
                    for(let i = 0; i<ROW ; i++ )
                    {
                        for(let j = 0; j<COL;j++)
                        {
                            if(blocks[i][j])
                            {
                                blocks[i][j].win=false;
                            }
                        }
                    }
                }
                status = false;
            }
        }
    }

}

function initblock()
{
    for(let i = 0;i<ROW;i++)
    {
        blocks[i] = [];
    }
}

function setbg()
{
    background(0,250,0);
    for(let i = 1;i<ROW;i++)
    {
        line(0,i*100*scaler,700*scaler,i*100*scaler);
    }
    for(let j = 1;j<COL;j++)
    {
        line(j*100*scaler,0,j*100*scaler,600*scaler);
    }
}
function winred()
{
    initblock();
    wincountred = 1;
    wincountyellow = 1;
    redwins++;
    game=true;
}
function unentschieden()
{
    initblock();
    wincountred = 1;
    wincountyellow = 1;
    game=true;
    ch=0;
}
function winyellow()
{
    initblock();
    wincountred = 1;
    wincountyellow = 1;
    yellowwins++;
    game=true;
}