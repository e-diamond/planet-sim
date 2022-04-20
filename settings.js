
class AddBodyMenu {
  constructor() {
    this.menu = QuickSettings.create(20, 20, "Add a new body");

    this.fields = {
      position: "Position",
      velocity: "Velocity",
      mass: "Mass",
      radius: "Radius",
      color: "Colour",
      buttons: "Add new object"
    };

    this.inputs = {
      position: [],
      velocity: [],
      buttons: []
    };

    this.init();
  }

  init() {

    let container_ids = {
      position: "position",
      velocity: "velocity",
      buttons: "add_body"
    };

    // initial position input
    this.menu.addHTML(this.fields.position, this.divString(container_ids.position));
    this.inputs.position = this.xyzInput(container_ids.position);

    // initial velocity input
    this.menu.addHTML(this.fields.velocity, this.divString(container_ids.velocity));
    this.inputs.velocity = this.xyzInput(container_ids.velocity);

    // mass input
    this.menu.addNumber(this.fields.mass, 1, 1000, 5);

    // radius input
    this.menu.addNumber(this.fields.radius, 1, 100, 20);

    // color input
    this.menu.addColor(this.fields.color, '#ff0000');

    // buttons to add new object
    this.menu.addHTML(this.fields.buttons, this.divString(container_ids.buttons));
    this.inputs.buttons.push(createButton("Add Body"));
    this.inputs.buttons.push(createButton("Add Star"));
    const boundAddBody = this.addBody.bind(this);
    for (var btn of this.inputs.buttons) {
      btn.parent(container_ids.buttons);
      btn.mouseClicked(boundAddBody);
    }
  }

  divString(id) {
    // <div id=""></div>
    let div = ["<div id=\"", "\"></div>"];
    return div[0] + id + div[1];
  }

  xyzInput(parent) {
    let arr = [];
    for (var i = 0; i < 3; i++) {
      arr[i] = createInput(0, 'number');
      arr[i].parent(parent);
      arr[i].addClass('qs_text_input');
      arr[i].addClass('qs_number');
    }
    return arr;
  }

  addBody() {
    // fetch position xyz
    let pos = [];
    for (var p of this.inputs.position) {
      pos.push(Number(p.value()));
    }
    console.log(pos);

    // fetch velocity xyz
    let vel = [];
    for (var v of this.inputs.velocity) {
      vel.push(Number(v.value()));
    }

    // fetch mass
    let mass = this.menu.getValue(this.fields.mass);

    // fetch radius
    let radius = this.menu.getValue(this.fields.radius);

    // fetch color
    let color = this.menu.getValue(this.fields.color);

    // create new body
    Body.add(pos, vel, mass, radius, color);

  }
}
