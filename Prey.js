class Prey {

  constructor(l, dna){
    this.position = l.copy();
    this.health = 200;
    this.dna = dna;
    this.netDir = createVector(0, 0);
    this.acceleration = 0.1;
    this.xoff = random(1000);
    this.yoff = random(1000);
    this.gestationPeriod = 0;
    this.theta = 0;
    this.rWalk = true;
    this.r = map(this.dna.genes[0], 0, 1, 15, 50);
    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 8);
    this.normalspeed = this.maxspeed/4;
    this.speed = this.normalspeed;
  }

  // A bloop can find food and eat it
  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length-1; i >= 0; i--) {
      let foodposition = food[i];
      let d = this.position.dist(foodposition);
      // If we are, juice up our strength!
      if (d < this.r/2) {
        this.gestationPeriod++;
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }

  run() {
    this.health -= 0.2;
    this.update();
    this.borders();
    this.display();
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  reproduce() {
    // asexual reproduction
    if (this.gestationPeriod > 5) {
      // Child is exact copy of single parent
      this.gestationPeriod = 0;
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.1);
      return new Prey(this.position, childDNA);
    }
    else {
      return null;
    }
  }

  update(){
    if(this.rWalk) this.randomWalk();
    else this.runAway();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width+this.r+this.position.x;
    if (this.position.y < -this.r) this.position.y = height+this.r+this.position.y;
    if (this.position.x > width+this.r) this.position.x = -this.r+this.position.x-width;
    if (this.position.y > height+this.r) this.position.y = -this.r+this.position.y-height;
  }

  // Death
  dead() {
    if (this.health < 0.0) {
      return true;
    }
    else {
      return false;
    }
  }

  display() {
    ellipseMode(CENTER);
    stroke(0,this.health);
    fill(0, this.health);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.theta);
    ellipse(0, 0, this.r, this.r);
    fill(255, this.health);
    noStroke();
    ellipse(this.r/2, this.r/12, this.r/3, this.r/3);
    ellipse(this.r/2, -this.r/12, this.r/3, this.r/3);
    fill(0, this.health);
    ellipse(this.r/2, this.r/12, this.r/7, this.r/7);
    ellipse(this.r/2, -this.r/12, this.r/7, this.r/7);
    fill(255, this.health);
    ellipse(this.r/7, this.r/8, this.r/7, this.r/7);
    ellipse(this.r/7, -this.r/8, this.r/7, this.r/7);
    ellipse(this.r/4, this.r/3, this.r/7, this.r/7);
    ellipse(this.r/4, -this.r/3, this.r/7, this.r/7);
    ellipse(0, this.r/2.5, this.r/7, this.r/7);
    ellipse(0, -this.r/2.5, this.r/7, this.r/7);
    ellipse(-this.r/2.5, this.r/8, this.r/7, this.r/7);
    ellipse(-this.r/2.5, -this.r/8, this.r/7, this.r/7);
    ellipse(-this.r/8, this.r/7, this.r/7, this.r/7);
    ellipse(-this.r/8, -this.r/7, this.r/7, this.r/7);
    ellipse(-this.r/4, this.r/3, this.r/7, this.r/7);
    ellipse(-this.r/4, -this.r/3, this.r/7, this.r/7);
    pop();
  }

  runAway(){
    this.theta = atan2(this.netDir.y,this.netDir.x);
    this.theta += map(noise(this.xoff),0,1,-PI/2,PI/2);
    this.speed += this.acceleration;
    if(this.speed>this.maxspeed) this.speed = this.maxspeed;
    this.position.add(this.speed*cos(this.theta), this.speed*sin(this.theta));
    this.xoff += 0.01;
    this.rWalk = true;
  }

  setPredator(pred){
    this.rWalk = false;
    if(random(0, 1) < this.dna.genes[1]){
      let dir = p5.Vector.sub(this.position, pred.position);
      let strength = dir.mag();
      strength = (3*this.r - strength)*(3*this.r - strength)*(3*this.r - strength)*(3*this.r - strength);
      dir.normalize();
      dir.mult(strength);
      this.netDir.add(dir);
    }
  }

  randomWalk(){
    this.netDir.x = 0;
    this.netDir.y = 0;
    this.speed = this.normalspeed;
    this.theta = map(noise(this.xoff),0,1,-2*PI,2*PI);
    this.position.add(this.speed*cos(this.theta), this.speed*sin(this.theta));
    this.xoff += 0.01;
  }

}
