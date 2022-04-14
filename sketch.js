var method;
var bodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // debugMode();
  method = Integrate.euler;
  // set up bodies
  bodies.push(new Star(createVector(0, 0, 0), createVector(0, 0, 0), 1000, 50, color(255, 255, 0)));
  bodies.push(new Body(createVector(200, 0, 0), createVector(0, 0, 2), 2, 20, color(255, 0, 0)));
  bodies.push(new Body(createVector(-300, 0, 0), createVector(0, 0, -2), 5, 30, color(0, 0, 255)));
}

function draw() {
  background(50);
  orbitControl();

  // draw bodies
  for (var body of bodies) {
    body.draw();
  }

  // update body position
  // i times per draw loop
  for (var i = 0; i < 50; i++) {
    for (var body of bodies) {
      body.update(bodies, method);
    }
  }

}
