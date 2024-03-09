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
  outputs = []
  constructor() {
    this.keydown = debounce(this.keydown, 100);
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
  }

  executeCommand({ button, event, pressure }) {
    if(event === KEY_PRESSED) return this.keydown(button);
  }
  addOutput(output) {
    this.outputs.push(output);
  }
}

export default CommandExecutor;
