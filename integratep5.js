class Integrate {

  static euler(y, dydt, dt) {
    // y + dydt*dt;
    let dy = p5.Vector.mult(dydt, dt);
    return p5.Vector.add(y, dy);
  }

}
