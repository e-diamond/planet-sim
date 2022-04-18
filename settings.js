
function initSettings() {
  let width = 200;

  // <div id=""></div>
  let cls = "settings";
  let div = ["<div class="+cls+" id=\"", "\"></div>"];
  let position = "position";
  let velocity = "velocity";
  let add_body = "add_body";

  // create settings panel
  settings = QuickSettings.create(20, 20, "Settings");
  settings.setWidth(width);

  // initial position input
  settings.addHTML("Position", div[0]+position+div[1]);
  let pos_params = [];
  for (var i = 0; i < 3; i++) {
    pos_params[i] = createInput(0, "number");
    pos_params[i].parent(position);
    pos_params[i].class("qs_text_input");
  }

  // initial velocity input
  settings.addHTML("Velocity", div[0]+velocity+div[1]);
  let vel_params = [];
  for (var i = 0; i < 3; i++) {
    vel_params[i] = createInput(0, "number");
    vel_params[i].parent(velocity);
    vel_params[i].class("qs_text_input");
  }

  // initial mass input
  settings.addNumber("Mass", 1, 1000, 5);

  // initial radius input
  settings.addNumber("Radius", 1, 100, 20);

  // buttons to add new object
  settings.addHTML("Add new object", div[0]+add_body+div[1]);
  let buttons = [createButton("Add Body"), createButton("Add Star")];
  for (var button of buttons) {
    button.parent(add_body);
  }

}
