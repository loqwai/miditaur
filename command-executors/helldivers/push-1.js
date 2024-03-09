import debounce from "debounce";
import robot from "robotjs";
const macros = {
  92: {
    name: "Helldivers: Machine Gun",
    keys: "down left down up right",
  },
  93: {
    name: "test",
    keys: '',
  }
};

const KEY_PRESSED = 160;

export class CommandExecutor {
  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.keydown = debounce(this.keydown, 100);
    this.setAllColors();
  }

  keydown(button) {
    const macro = macros[button];
    if (!macro) return;
    console.log(`Executing: ${macro.name}`);
    const keys = macro.keys.split(" ");
    keys.forEach((key) => {
      if(!key) return;
      robot.keyTap(key);
    });
    this.output.sendMessage([144, button, 127]);
  }

  executeCommand({ button, event, pressure }) {
    if(event === KEY_PRESSED) return this.keydown(button);
  }

  setAllColors() {
    // there are 64 buttons, with keycodes starting at 92.
    // for each 4x4 grid, set a unique color: red, green, blue, and yellow.
    const colors: [
      5
      21,
      41,
      13
    ]
    for (let i = 0; i < 64; i++) {
      const color = i % 4;
      const button = 92 + i;
      this.output.sendMessage([144, button, colors[color] ]);
    }
  }
}

export default CommandExecutor;
