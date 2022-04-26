
class Menu {
  constructor() {
    this.margin = 20;
  }

  divString(id) {
    // <div id=""></div>
    let div = ["<div id=\"", "\"></div>"];
    return div[0] + id + div[1];
  }

  numberStyle(inp) {
    inp.addClass('qs_text_input');
    inp.addClass('qs_number');
  }

  buttonStyle(btn) {
    btn.addClass('qs_button');
    btn.style('margin-top', '2px');
    btn.style('margin-bottom', '2px');
  }
}


class AddBodyMenu extends Menu {
  constructor() {
    super();

    this.menu = QuickSettings.create(this.margin, this.margin, "Add a new body");

    this.fields = {
      position: "Position",
      velocity: "Velocity",
      mass: "Mass",
      radius: "Radius",
      color: "Colour",
      buttons: "Add new object"
    };

    this.inputs = {
      position: null,
      velocity: null,
    };

    this.init();
  }

  init() {
    // initial position input
    this.menu.addHTML(this.fields.position, this.divString(this.fields.position));
    this.inputs.position = this.xyzInput(this.fields.position);

    // initial velocity input
    this.menu.addHTML(this.fields.velocity, this.divString(this.fields.velocity));
    this.inputs.velocity = this.xyzInput(this.fields.velocity);

    // mass input
    this.menu.addNumber(this.fields.mass, 1, 1000, 5);

    // radius input
    this.menu.addNumber(this.fields.radius, 1, 100, 20);

    // color input
    this.menu.addColor(this.fields.color, '#ff0000');

    // buttons to add new object
    this.menu.addHTML(this.fields.buttons, this.divString(this.fields.buttons));
    // 'Add Body' button
    let btn_addBody = createButton("Add Body");
    const boundAddBody = this.addBody.bind(this);
    btn_addBody.parent(this.fields.buttons);
    btn_addBody.mouseClicked(boundAddBody);
    // 'Add Star' button
    let btn_addStar = createButton("Add Star");
    const boundAddStar = this.addStar.bind(this);
    btn_addStar.parent(this.fields.buttons);
    btn_addStar.mouseClicked(boundAddStar);
  }

  xyzInput(parent) {
    let arr = [];
    for (var i = 0; i < 3; i++) {
      arr[i] = createInput(0, 'number');
      arr[i].parent(parent);
      this.numberStyle(arr[i]);
    }
    return arr;
  }

  getValues() {
    // object to return
    let values = {
      position: [],
      velocity: [],
      mass: null,
      radius: null,
      color: null
    };

    // fetch position xyz
    // let pos = [];
    for (var p of this.inputs.position) {
      values.position.push(Number(p.value()));
    }

    // fetch velocity xyz
    // let vel = [];
    for (var v of this.inputs.velocity) {
      values.velocity.push(Number(v.value()));
    }

    // fetch mass
    values.mass = this.menu.getValue(this.fields.mass);

    // fetch radius
    values.radius = this.menu.getValue(this.fields.radius);

    // fetch color
    values.color = this.menu.getValue(this.fields.color);

    // return object
    return values;
  }

  addBody(type) {
    var v = this.getValues();
    // create new body
    Body.add(v.position, v.velocity, v.mass, v.radius, v.color);
  }

  addStar() {
    // check if new star can be added
    if (!Star.isFull()) {
      var v = this.getValues();
      // create new star
      Star.add(v.position, v.velocity, v.mass, v.radius, v.color);
    } else {
      // TODO: cannot add more stars 
    }
  }
}

class ControlMenu extends Menu {

  constructor() {
    super();
    this.isPlaying = false;
    this.speed = 50;

    this.width = 200;
    this.menu = QuickSettings.create(windowWidth-this.width-this.margin, this.margin, "Control");

    this.fields = {
      play: "Play/Pause",
      speed: "Speed",
      reset: "Reset",
      remove: "Remove Bodies"
    };

    this.init();
  }

  init() {
    // add play/pause button
    const boundPlayPause = this.playPause.bind(this);
    this.menu.addButton(this.fields.play, boundPlayPause);

    // add speed slider
    const boundSetSpeed = this.setSpeed.bind(this);
    this.menu.addRange(this.fields.speed, 1, 100, this.speed, 1, boundSetSpeed);

    // add reset button
    this.menu.addButton(this.fields.reset, Body.resetAll);

    // add removal buttons
    // this.menu.addHTML("Remove Bodies", "<div id=\"remove\"></div>");
    this.menu.addHTML(this.fields.remove, this.divString(this.fields.remove));
    // remove previous
    let btn_removePrev = createButton("Remove previous");
    this.buttonStyle(btn_removePrev);
    btn_removePrev.parent(this.fields.remove);
    btn_removePrev.mouseClicked(Body.removePrev);
    // remove all
    let btn_removeAll = createButton("Remove all");
    this.buttonStyle(btn_removeAll);
    btn_removeAll.parent(this.fields.remove);
    btn_removeAll.mouseClicked(Body.removeAll);
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
  }

  setSpeed(value) {
    this.speed = value;
  }
}
