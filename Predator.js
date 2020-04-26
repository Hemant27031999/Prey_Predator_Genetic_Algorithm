class Predator {

  constructor(l, dna){
    this.position = l.copy();             // current position of particle
    this.health = 200;
    this.dna = dna;
    this.netDir = createVector(0, 0);     // direction of nearest particle to eat
    this.acceleration = 0.1;
    this.xoff = random(1000);             // perlin noise handler
    this.gestationPeriod = 0;             // particle duplicate itself when gestationPeriod
                                          // become 7. It increment by 1 when the predator
                                          // eats a prey.
    this.theta = 0;                       // direction of walking for a random walk
    this.rWalk = true;                    // decides wether particle walks randomly or
                                          // chase a prey
    this.r = map(this.dna.genes[0], 0, 1, 15, 50);  // size of particle
    this.maxspeed = map(this.dna.genes[0], 0, 1, 12, 5);  // maximum speed of particles
    this.normalspeed = this.maxspeed/4;   // speed when particle is not chasing prey
    this.speed = this.normalspeed;        // spped at which particle runs
  }

  // check and eat the prey if possible
  eat(preys) {
    this.netDir.x = 0;
    this.netDir.y = 0;
    let walk = true;    // decides whether to randomly walk or chase a prey
    for (let i = preys.length-1; i >= 0; i--) {
      let prey = preys[i];

      // do a action corresponding to that prey only for the following condition
      if(prey.r < 3*this.r && prey.r > this.r/3 && this.health < 150){
        let d = this.position.dist(prey.position);

        // eat the prey
        if (d < this.r/2+prey.r/2 && this.health < 170) {
          this.gestationPeriod++;
          this.health += 50;
          preys.splice(i, 1);
        }
        else if(d < 3*this.r && this.health < 170){ // chase the prey but don't eat
          this.setPrey(prey);
          walk = false;
        }
        else if(d < 3*this.r){ // inform the prey about the chase
          prey.setPredator(this);
        }
      }
    }
    if(walk) this.randomWalk();
    else this.chase();
  }

  // call the necessary functions
  run() {
    this.health -= 0.2;
    this.borders();
    this.display();
  }

  // asexual reproduction
  reproduce() {
    if(this.gestationPeriod > 7){
      //Child is exact copy of single parent
      this.gestationPeriod = 0;
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.1);
      return new Predator(this.position, childDNA);
    }
    else{
      return null;
    }
  }

  // check the border condition
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

  // display the particles
  display() {
    stroke(0,this.health);
    fill(255, 0, 100, this.health);
    smooth();
    ellipseMode(CENTER);
    push();
    translate(this.position.x,this.position.y);
    rotate(this.theta);
    ellipse(0, 0, this.r/2, this.r/2);
    ellipse(-2*this.r/3, 0, this.r, this.r/1.5);
    ellipse(this.r/2, 0, this.r/1.5, this.r/1.5);
    fill(255, this.health);
    noStroke();
    ellipse(4*this.r/6, this.r/12, this.r/5, this.r/5);
    ellipse(4*this.r/6, -this.r/12, this.r/5, this.r/5);
    fill(0, this.health);
    ellipse(4*this.r/6, this.r/12, this.r/10, this.r/10);
    ellipse(4*this.r/6, -this.r/12, this.r/10, this.r/10);
    rotate(PI/40);
    ellipse(9*this.r/10, this.r/30, this.r/5, this.r/20);
    rotate(-PI/20);
    ellipse(9*this.r/10, -this.r/30, this.r/5, this.r/20);
    pop();
  }

  // walk randomly when no prey to chase
  randomWalk(){
    this.speed = this.normalspeed;
    this.theta = map(noise(this.xoff),0,1,-2*PI,2*PI);
    this.position.add(this.speed*cos(this.theta), this.speed*sin(this.theta));
    this.xoff += 0.01;
  }

  // chase the particle
  chase(){
    this.theta = atan2(this.netDir.y, this.netDir.x);
    this.speed += this.acceleration;
    if(this.speed>this.maxspeed) this.speed = this.maxspeed;
    this.position.add(this.speed*cos(this.theta), this.speed*sin(this.theta));
  }

  // inform the prey and calculate the force of chasing that prey
  setPrey(prey){
    prey.setPredator(this);
    let dir = p5.Vector.sub(prey.position, this.position);
    let strength = dir.mag();
    strength = (3*this.r - strength)*(3*this.r - strength)*(3*this.r - strength);
    dir.normalize();
    dir.mult(strength);
    this.netDir.add(dir);
  }
}
