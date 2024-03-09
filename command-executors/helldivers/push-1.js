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
    console.log({button});
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
    // Simplifying the color scheme to solid, bright colors for each quadrant
    const colors = [
      5,  // Bright Red
      21, // Bright Green
      41, // Bright Ocean
      57  // Bright Pink
    ];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const button = 92 + x - (y * 8);
        // Determine the quadrant to assign the color
        const quadrant = Math.floor(x / 4) + Math.floor(y / 4) * 2;
        const color = colors[quadrant];
        console.log({button, color});
        this.output.sendMessage([144, button, color]);
      }
    }
  }

}

export default CommandExecutor;
