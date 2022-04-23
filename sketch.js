var method;
var add_menu;
var control_menu;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  method = Integrate.euler;
  // set up bodies
  Star.add([0, 0, 0], [0, 0, 0], 1000, 50, '#fcf82d');
  Body.add([200, 0, 0], [0, 0, 2], 2, 20, '#ff0000');
  Body.add([-300, 0, 0], [0, 0, -2], 5, 30, '#326ddb');

  // initialise GUI
  add_menu = new AddBodyMenu();
  control_menu = new ControlMenu();

}

function draw() {
  background(50);
  orbitControl();

  // draw bodies
  Body.drawAll();

  if (control_menu.isPlaying) {
    // update body position
    // i times per draw loop
    for (var i = 0; i < control_menu.speed; i++) {
      Body.updateAll();
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
