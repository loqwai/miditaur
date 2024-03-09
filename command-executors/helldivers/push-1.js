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
    // Adjusting the color assignments to ensure the pinks are truly represented
    const quadrantColors = [
      [5, 6, 7, 8],     // Reds
      [21, 22, 23, 24], // Greens
      [41, 42, 43, 44], // Oceans
      [57, 58, 59, 56]  // Pinks, correcting the last to a bright orange for distinctiveness
    ];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        // Correctly map x, y to button IDs, again
        const button = 92 + x - (y * 8);
        // Selecting colors from the recalibrated quadrant palette
        const quadrant = Math.floor(x / 4) + Math.floor(y / 4) * 2;
        const color = quadrantColors[quadrant][(x % 4) + (y % 4) * 4 % 4]; // Ensure we cycle through colors correctly
        console.log({button, color});
        this.output.sendMessage([144, button, color]);
      }
    }
  }
}

export default CommandExecutor;
