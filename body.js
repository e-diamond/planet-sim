vector = p5.Vector;

class Body {

  static bodies = [];

  constructor(position, velocity, mass, radius, color) {
    this.r = position;
    this.v = velocity;
    this.m = mass;
    this.rad = radius;
    this.color = color;
  }

  // draw object
  draw() {
    push();
    translate(this.r);
    noStroke();
    ambientMaterial(this.color);
    sphere(this.rad);
    pop();
  }

  update(solver) {
    // get total acceleration
    let a = this.calcAcceleration(Body.bodies);

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

  static add(r, v, m, rad, c) {

    let position = createVector(r[0], r[1], r[2]);
    let velocity = createVector(v[0], v[1], v[2]);

    Body.bodies.push(new Body(position, velocity, m, rad, color(c)));
  }
}


class Star extends Body {
  constructor(position, velocity, mass, radius, color) {
    super(position, velocity, mass, radius, color);
  }

  draw() {
    // draw star
    push();
    translate(this.r);
    noStroke();
    emissiveMaterial(this.color);
    sphere(this.rad);
    pop();
    // add light source
    pointLight(255, 255, 255, this.r);
  }
}
