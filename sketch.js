const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,bolt,ground;
var bolt_con;
var bolt_con_2;
var bolt_con_3;
var rope3;

var bg_img;
var food;
var droid;

var button,button2,button3;
var R4;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

var star_img;

var blower;

var empty_star;

var one_star;

var two_star;

var star_display;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('bolt.png');
  droid = loadImage('R4-01.png');
  star_img = loadImage('star.png')
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  empty_star = loadAnimation('empty.png');
  one_star = loadAnimation('one_star.png');
  two_star = loadAnimation('stars.png');

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(600,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  star_display = createSprite(50,20,30,30);
  star_display.scale = 0.2;
  star_display.addAnimation("empty",empty_star);
  star_display.addAnimation("one",one_star);
  star_display.addAnimation("two",two_star);
  star_display.changeAnimation("empty");


  //btn 1
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(450,90);
   button2.size(50,50);
   button2.mouseClicked(drop2);

   blower = createImg('baloon2.png')
   blower.position(260,370);
   blower.size(100,100);
   blower.mouseClicked(airblow);
 
   rope = new Rope(7,{x:120,y:90});
   rope2 = new Rope(7,{x:490,y:90});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(300,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  R4 = createSprite(200,height - 80, 100 ,100);
  R4.scale = 0.4;

  R4.addAnimation('blinking',blink);
  R4.addAnimation('eating',eat);
  R4.addAnimation('crying',sad);
  R4.changeAnimation('blinking');

  star1 = createSprite(320,30,20,20);
  star1.addImage(star_img);
  star1.scale = 0.2

  star2 = createSprite(50,350,20,20);
  star2.addImage(star_img);
  star2.scale = 0.2

  bolt = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,bolt);

  bolt_con = new Link(rope,bolt);
  bolt_con_2 = new Link(rope2,bolt);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(bolt!=null){
    image(food,bolt.position.x,bolt.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(bolt,R4,80)==true)
  {
    World.remove(engine.world,bolt);
    bolt = null;
    R4.changeAnimation('eating');
    eating_sound.play();
  }

  if(bolt!=null && bolt.position.y>=650)
  {
    R4.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    bolt=null;
   }
  
  if(collide(bolt,star1,20)===true) {
    star1.visible = false;
    star_display.changeAnimation("one");
  }
  if(collide(bolt,star2,20)===true) {
    star2.visible = false;
    star_display.changeAnimation("two");
  }
}



function drop()
{
  cut_sound.play();
  rope.break();
  bolt_con.dettach();
  bolt_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  bolt_con_2.dettach();
  bolt_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function collide(body,sprite,x) {
  if(body!=null)
        {
          var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
          {
            return true;
          }
          else{
            return false;
          }
        }
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airblow() {
  Matter.Body.applyForce(bolt,{x:0,y:0},{x:0,y:-0.03})
  air.play();
}

