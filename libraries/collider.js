function physics()
{
    let temp = gameobjects[1].length;
    for(let i = 0;i<temp;i++)
        {
            gameobjects[1][i].pos.y++;
        }
}