function renderer()
{
    physics();
    let templength1=gameobjects[0].length;
    let templength2=gameobjects[1].length;
    for(let i = 0;i < templength1 || i < templength2;i++)
        {
            if(i<templength1){
                gameobjects[0][i].show();
            }
            if(i<templength2){
                gameobjects[1][i].show();
            }
        }
}