var fire = function(PIXI,stage)
{
    var fireImages = [
        "./Fire/img/fire.png",
        "./Fire/img/fire2.png",
        "./Fire/img/fire3.png"
    ];
    var fireLoaded = false ;

    var fireList = [] ;

    PIXI.loader
    .add(fireImages)
    .load(()=>{
        fireLoaded = true ;
    })
    this.fire = function(x,y,vx,vy)
    {
        if(fireLoaded==false)
            return ;

        for(var i = 0 ; i< 1 ; i++)
        {
            var newFire = new fireElement(PIXI,x,y,PIXI.loader.resources[fireImages[Math.floor(fireImages.length*Math.random())]].texture,deleteMe,vx,vy);
            fireList.push(newFire)
            stage.addChild(newFire.me)
        }
        
    }

    this.enterFrame = function()
    {
        for(var i = 0 ; i<fireList.length ; i++)
        {
            fireList[i].enterFrame();
        }
    }

    function deleteMe(item)
    {
        var I = fireList.indexOf(item);
        stage.removeChild(item.me);
        fireList.splice(I,1);
    }
    return this ;
}


var fireElement = function(PIXI,x,y,fireTexture,onNeedToRemove=(target)=>{},vx0=0,vy0=0)
{
    var maxSpeed = 2 ;
    var alphaSpeed = 0.06;
    var Fric = 0.99 ;
    var widthIncreaseFactor = 0.1 ;
    var w = 30 ;
    var g = -0.5 ;

    var me = this.me = new PIXI.Sprite(fireTexture);
    me.x = x ;
    me.y = y ;
    me.width = w ;
    me.height = w ;
    
    var vx = vx0/5+Math.random()*maxSpeed-maxSpeed/2;
    var vy = vy0/5+Math.random()*maxSpeed-maxSpeed/2;

    this.enterFrame = function()
    {
        me.x+=vx;
        me.y+=vy;
        vy+=g;
        me.width -= widthIncreaseFactor ;
        me.height -= widthIncreaseFactor ;
        me.alpha-=alphaSpeed ;
        vx*=Fric;
        vy*=Fric;
        if(me.alpha<=0)
        {
            onNeedToRemove(this)
        }
    }


    return this ;
}