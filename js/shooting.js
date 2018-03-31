enchant();
var game = null;
var nico = null;
var yt = null;
var here = {x:600,y:700};
var ran1 = 0;
var scoreLabel = new Label();
scoreLabel.font = "italic 50px 'ＭＳ 明朝'";
var nx,ny = 0;
var ran2 =0;

window.onload = function() {
    game = new Game(800,800);
    previewCenter(game);
    game.score = 0;
	game.preload("niconico.png","yt.png");
	game.fps = 20;
	game.onload = function() {

   
	   map = new Map(100,100);
	   game.rootScene.backgroundColor = "#CCFFFF";
       createHero();
       createEnemy1();
       createEnemy2();
	   game.rootScene.addChild(scoreLabel);
	};
	game.start();
};

function createHero(){
    nico = new Sprite(85,85);
    nico.image = game.assets["niconico.png"];
    nico.x = 725;
    nico.y = 700;
    nico.addEventListener(enchant.Event.ENTER_FRAME,operate);
    game.rootScene.addChild(nico);
}

function operate(){
        nx = here.x;
        ny = here.y;
       if(game.input.up) ny -= 15;
       if(game.input.down) ny += 15;
       if(game.input.right) nx += 15;
       if(game.input.left) nx -= 15;
      if(!map.hitTest(nx,ny) && nx > -20 && nx < 730 && ny > 20 && ny < 730){ //画面端の衝突テスト
         here.x = nx;
         here.y = ny;
         nico.moveTo(here.x,here.y);
      }
     if(this.intersect(yt) || this.intersect(yt1)){
         nico.opacity = 0;
         document.getElementById('button').innerHTML = "<input type = 'button' value = 'リトライ' onClick='location.reload()'>";
         document.getElementById('game_over').innerHTML = "<h1>GAME OVER<h1>";
     }
}


function enemy1() { 
     yt.moveBy(25,25);
     if(yt.x > game.width || yt.y > game.height) {
        ran1 = Math.floor(Math.random()*800);
         yt.x = 15;
         yt.y = ran1;
        if(nico.opacity > 0) game.score += 10;
     }
     scoreLabel.text = "スコア:"+ game.score;
}

function createEnemy1(){
    yt = new Sprite(77,54);
    yt.image = game.assets["yt.png"];
    yt.x = 0;
    yt.y = 0;
    yt.addEventListener(enchant.Event.ENTER_FRAME,enemy1);
    game.rootScene.addChild(yt);}

function enemy2() { 
     ran2 = Math.floor(Math.random()*800);
     yt1.moveBy(-5,40);
    if(yt1.x > game.width || yt1.y > game.height) {
     yt1.x = ran2;
     yt1.y = 15;
    if(nico.opacity > 0) game.score += 10;
    }
}

function createEnemy2(){
    yt1 = new Sprite(77,54);
    yt1.image = game.assets["yt.png"];
    yt1.x = 0;
    yt1.y = 0;
    yt1.addEventListener(enchant.Event.ENTER_FRAME,enemy2);
     game.rootScene.addChild(yt1);
 }


function previewCenter ( game ){
    var left = ( window.innerWidth - ( game.width * game.scale )) /2;
    var top=( window.innerHeight - ( game.height * game.scale )) /2;
    $('#enchant-stage').css({
      "position":"absolute",
      "left":left+"px",
      "top":top+"px",
    });
    game._pageX = left;
    game._pageY = top;
}


// call when you need restarting
function restart(core) {
 
core.onload = function() {
    restart(this);
}
}
