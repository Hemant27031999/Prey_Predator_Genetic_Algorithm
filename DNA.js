class DNA {

  // Constructor (makes a random DNA)
  constructor() {
    if(arguments.length == 0){
      // DNA is random floating point values between 0 and 1 (!!)
      this.genes = [];
      this.genes.push(random(0,1));
      this.genes.push(random(0.5, 1));
    }
    else{
      this.genes = arguments[0];
    }
  }

  copy() {
    let newgenes = [];
    //arraycopy(genes,newgenes);
    // JS mode not supporting arraycopy
    for (let i = 0; i < this.genes.length; i++) {
      newgenes.push(this.genes[i]);
    }

    return new DNA(newgenes);
  }

  // Based on a mutation probability, picks a new random character in array spots
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
         this.genes[i] = random(0,1);
      }
    }
  }
}
