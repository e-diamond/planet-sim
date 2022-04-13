vector = p5.Vector;

class Body {
  constructor(position, velocity, mass, radius) {
    this.r = position;
    this.v = velocity;
    this.m = mass;
    this.rad = radius;
  }

  // draw object
  draw() {
    push();
    translate(this.r);
    sphere(this.rad);
    pop();
  }

  update(bodies, solver) {
    // get total acceleration
    let a = this.calcAcceleration(bodies);

    // perform integration
    // timestep
    let dt = 0.01;
    // update position vector
    this.r = solver(this.r, this.v, dt);
    // update velocity vector
    this.v = solver(this.v, a, dt);
  }

  calcAcceleration(bodies) {
    var acc = createVector(0, 0, 0);
    // compare this to all other bodies
    for (var body of bodies) {
      let diff = vector.sub(body.r, this.r);
      let magsq = diff.magSq();
      // ignore if bodies are at same position (are same body)
      if (magsq != 0) {
        // increase acc
        acc.add(vector.mult(diff, body.m/(Math.pow(magsq, 1.5))));
      }
    }
    return acc;
  }
}
