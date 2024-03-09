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
    console.log('Setting all colors');
    for(let i = 0; i < 64; i++) {
      this.output.send([144, 92+i, 92+i]);
    }
  }
}

export default CommandExecutor;
