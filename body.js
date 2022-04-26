vector = p5.Vector;

class Body {

  static bodies = [];
  static planets = [];

  constructor(position, velocity, mass, radius, color) {
    this.init_r = position;
    this.init_v = velocity;

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

  // calculate next position
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

  // calculate acceleration at current moment
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

  // return body to its initial position and velocity
  reset() {
    this.r = this.init_r;
    this.v = this.init_v;
  }

  // add a new body to the system
  static add(r, v, m, rad, c) {

    let position = createVector(r[0], r[1], r[2]);
    let velocity = createVector(v[0], v[1], v[2]);

    const body = new Body(position, velocity, m, rad, color(c));

    Body.bodies.push(body);
    Body.planets.push(body);
  }

  // draw every body in the system
  static drawAll() {
    // stars must be drawn before other bodies
    // for lights to work correctly
    for (var star of Star.stars) {
      star.draw();
    }
    for (var planet of Body.planets) {
      planet.draw();
    }
  }

  // update every body in the system
  static updateAll(method) {
    for (var body of Body.bodies) {
      body.update(method);
    }
  }

  // reset every body in the system
  static resetAll() {
    for (var body of Body.bodies) {
      body.reset();
    }
  }

  // remove the most recently added body in the system
  static removePrev() {
    if (Body.bodies.length > 0) {
      var removed = Body.bodies.pop();
    }
    if (removed instanceof Star) {
      Star.removePrev();
    } else {
      Body.planets.pop();
    }
  }

  // remove all bodies from the system
  static removeAll() {
    Body.bodies = [];
    Body.planets = [];
    Star.stars = [];
  }
}


class Star extends Body {

  // track number of stars
  // only 5 point lights can be active at once
  static stars = [];

  constructor(position, velocity, mass, radius, color) {
    super(position, velocity, mass, radius, color);
  }

  // draw a star
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

  // add a star to the system
  static add(r, v, m, rad, c) {

    let position = createVector(r[0], r[1], r[2]);
    let velocity = createVector(v[0], v[1], v[2]);

    const star = new Star(position, velocity, m, rad, color(c));

    Body.bodies.push(star);
    Star.stars.push(star);
  }

  // remove most recently added star
  static removePrev() {
    Star.stars.pop();
  }

  // check if more stars can be added (max. 5)
  static isFull() {
    return Star.stars.length >= 5;
  }
}
