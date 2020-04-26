let world;

function setup() {
  createCanvas(1890, 1000);
  world = new World(56);
  smooth();
}

function draw() {
  background(204, 255, 204);
  world.run();
}


// We can add a creature manually if we so desire
function mousePressed() {
  world.born(mouseX,mouseY); 
}

function mouseDragged() {
  world.born(mouseX,mouseY); 
}