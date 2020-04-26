class World{

  constructor(num){
    this.food = new Food(num);
    
    this.predators = [];
    for (var i = 0; i < num/8; i++) {
      let dna = new DNA();
      this.predators.push(new Predator(createVector(random(width),random(height)),dna));
    }
    
    this.preys = [];
    for (i = 0; i < num; i++) {
      let dna = new DNA();
      this.preys.push(new Prey(createVector(random(width),random(height)),dna));
    }
  }
  
  born(x, y) {
    l = new PVector(x,y);
    dna = new DNA();
    this.preys.push(new Prey(l,dna));
  }
  
    // Run the world
  run() {
    // Deal with food
    this.food.run();
    
    for (var i = this.predators.length-1; i >= 0; i--) {
      let p = this.predators[i];
      p.eat(this.preys);
      p.run();
      if (p.dead()) {
        this.predators.splice(i, 1);
      }
      let child = p.reproduce();
      if (child != null) this.predators.push(child);
    }
    
    // Cycle through the ArrayList backwards b/c we are deleting
    for (let i = this.preys.length-1; i >= 0; i--) {
      // All bloops run and eat
      let p = this.preys[i];
      p.run();
      //b.run(predators);
      p.eat(this.food);
      // If it's dead, kill it and make food
      if (p.dead()) {
        this.preys.splice(i, 1);
        this.food.add(p.position);
      }
      // Perhaps this bloop would like to make a baby?
      let child = p.reproduce();
      if (child != null) this.preys.push(child);
    }
   
  }
  
}