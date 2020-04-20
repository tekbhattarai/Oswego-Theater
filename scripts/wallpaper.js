var lights = [];
var lightCount = 50;
var cwidth = window.innerWidth;
var cheight = window.innerHeight;


var cycleIndex = 0;
var cycles = 4;
var cycleComplete = false;

var lightRed = [0, 200, 255, 230];
var lightGreen = [0, 128, 245, 230];
var lightBlue = [0, 66, 102, 30];

var backgroundRed = 0;
var backgroundGreen = 0;
var backgroundBlue = 0;

var desired = lightCount;
var trailScale = 1;
isParallax = false;

function preload() {
}

function setup() {
  var canvas = createCanvas(cwidth, cheight);
  background(backgroundRed,backgroundBlue,backgroundGreen);


  for (var i = 0; i < lightCount; i++) {
    lights.push(new light(random(-40, cwidth + 40), random(0, cheight), random(2, 3), random(35, 110),int(random(0,3))));
  }
}

function deviceTurned(){
  windowResized();
}

function windowResized() {
  cwidth = window.innerWidth;
  cheight = window.innerHeight;
  resizeCanvas(cwidth, cheight, true);
  background(backgroundRed,backgroundBlue,backgroundGreen);
  lights = [];
  for (var i = 0; i < lightCount; i++) {
    lights.push(new light(random(-40, cwidth + 40), random(0, cheight), random(2, 3), random(5, 50),int(random(0,3))));
  }
}

function draw() {
  //start as complete
  cycleComplete = true;
  for (var i = 0; i < lightCount; i++) {
    if (lights[i].update() == true) {
      cycleComplete = false; //if any aren't complete then set to incomplete
    }
  }

  if (cycleComplete) {
    cycleIndex++;
    for (var i = 0; i < lightCount; i++) {
      lights[i].shouldMove = true;
    }
  }
  
  	if(desired !== lights.length){
		if(desired > lights.length){			
			lights.push(new light(random(-40, cwidth + 40), random(0, cheight), random(2, 3), random(35, 110),int(random(0,3))));
			lightCount++;
		}else if(desired < lights.length){			
			lights.pop();
			lightCount--;
		}
	}
}


function light(x, y, speed, scale,cycleIndex) {
  this.x = x;
  this.startX = x;
  this.y = y;
  this.h = y;
  this.scale = scale;
  this.opacity = 255; //map(this.scale, 5, 150, 50, 75, true);
  this.speed = speed * map(this.scale, 5, 150, 0.25, 1);
  this.shouldMove = true;
  this.cycleIndex = cycleIndex;
  
  this.update = function () {

    if (this.shouldMove) {
      this.x -= this.speed/3// = this.startX + sin(this.h / 100) * (100 / speed);
      this.h -= this.speed;
      this.y -= this.speed;
    } else {
      return false;
    }

    if (this.y < 0 - this.scale - 100) {
      this.y = cheight + this.scale + 100;
      this.x = this.startX;
      this.cycleIndex++;
      return false;
    }
    if(this.x < 0 - this.scale - 100){
      this.x = this.starX;
      this.cycleIndex++;
      return false;
    }

    noStroke();
    fill(lightRed[this.cycleIndex % cycles], lightGreen[this.cycleIndex % cycles], lightBlue[this.cycleIndex % cycles], this.opacity);



      rect(
        this.x,
        this.y,
        this.scale * trailScale,
        this.scale * trailScale);
    
    return true;
  };
}