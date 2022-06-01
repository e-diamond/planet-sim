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
    // verify parameters are valid
    try {
      Body.verify(r, v, m, rad, c);
    } catch (e) {
      throw e;
    }

    let position = createVector(r[0], r[1], r[2]);
    let velocity = createVector(v[0], v[1], v[2]);

    const body = new Body(position, velocity, m, rad, color(c));

    Body.bodies.push(body);
    Body.planets.push(body);
  }

  static verify(r, v, m, rad, c) {
    // VERIFY r VARIABLE
    // check r is an array of length 3
    if (r.length != 3) {
      throw "Position must be 3-dimensional";
    }
    // check individual r coordinates
    for (var coord of r) {
      let maxpos = 1000;
      // check r coords are numbers
      if (typeof coord != "number" || isNaN(coord)) {
        throw "Position coordinates must be numbers";
      // check r coords aren't out of bounds
    } else if (coord > maxpos || coord < -maxpos) {
        throw "Position coordinates must be a value between " + -maxpos + " and " + maxpos;
      }
    }

    // VERIFY v VARIABLE
    // check v is an array of length 3
    if (v.length != 3) {
      throw "Velocity must be 3-dimensional";
    }
    // check individual v coordinates
    for (var coord of v) {
      let maxv = 100;
      // check r coords are numbers
      if (typeof coord != "number" || isNaN(coord)) {
        throw "Velocity coordinates must be numbers";
      // check r coords aren't out of bounds
    } else if (coord > maxv || coord < -maxv) {
        throw "Velocity coordinates must be a value between " + -maxv + " and " + maxv;
      }
    }

    // VERIFY m VARIABLE
    // check m is a number
    if (typeof m != "number" || isNaN(m)) {
      throw "Mass must be a number";
    } else if (m <= 0) {
      throw "Mass must be greater than 0";
    }

    // VERIFY rad VARIABLE
    // check m is a number
    if (typeof rad != "number" || isNaN(rad)) {
      throw "Radius must be a number";
    } else if (rad <= 0) {
      throw "Radius must be greater than 0";
    }

    return true;
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
    // check if stars is full
    if (!Star.isFull()) {
      // verify parameters are valid
      try {
        Body.verify(r, v, m, rad, c);
      } catch (e) {
        throw e;
      }

      let position = createVector(r[0], r[1], r[2]);
      let velocity = createVector(v[0], v[1], v[2]);

      const star = new Star(position, velocity, m, rad, color(c));

      Body.bodies.push(star);
      Star.stars.push(star);

    } else {
      throw "Sorry! You can't have more than 5 stars in a system :(";
    }
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
