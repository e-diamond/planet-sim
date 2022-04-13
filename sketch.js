var method;
var bodies = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // debugMode();
  method = Integrate.euler;
  // set up bodies
  bodies.push(new Body(createVector(0, 0, 0), createVector(0, 0, 0), 1000, 50));
  bodies.push(new Body(createVector(200, 0, 0), createVector(0, 0, 2), 2, 20));
  bodies.push(new Body(createVector(-300, 0, 0), createVector(0, 0, -2), 5, 30));
}

function draw() {
  background(200);
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
