vector = p5.Vector;

class Body {
  constructor(position, velocity, mass, radius) {
    this.r = position;
    this.v = velocity;
    this.m = mass;
    this.rad = radius;
    this.points = [];
  }

  // draw object
  draw() {
    push();
    translate(this.r);
    sphere(this.rad);
    pop();
  }

  update(bodies) {
    // get total acceleration
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

    // implement Euler
    // TODO: move to separate numerical methods class

    // timestep
    let dt = 0.01;
    // update position vector
    let dr = vector.mult(this.v, dt);
    this.r.add(dr);
    // update velocity vector
    let dv = vector.mult(acc, dt);
    this.v.add(dv);
  }
}
