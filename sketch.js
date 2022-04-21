var method;
var add_menu;
var control_menu;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  method = Integrate.euler;
  // // set up bodies
  // Body.bodies.push(new Star(createVector(0, 0, 0), createVector(0, 0, 0), 1000, 50, color(255, 255, 0)));
  // Body.bodies.push(new Body(createVector(200, 0, 0), createVector(0, 0, 2), 2, 20, color('#ff0000')));
  // Body.bodies.push(new Body(createVector(-300, 0, 0), createVector(0, 0, -2), 5, 30, color(0, 0, 255)));

  // initialise GUI
  add_menu = new AddBodyMenu();
  control_menu = new ControlMenu();

}

function draw() {
  background(50);
  orbitControl();

  // draw bodies
  for (var body of Body.bodies) {
    body.draw();
  }

  if (control_menu.isPlaying) {
    // update body position
    // i times per draw loop
    for (var i = 0; i < control_menu.speed; i++) {
      for (var body of Body.bodies) {
        body.update(method);
      }
    }
  }

}

// DEBUG PLAY/PAUSE
function keyPressed() {
  if (key == 'p') {
    noLoop();
  } else if (key == 'l') {
    loop();
  }
}
