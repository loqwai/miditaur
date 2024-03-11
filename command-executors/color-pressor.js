import debounce from "debounce";
import {colors} from '../colors.js';

const pressureToColor = pressure => Math.floor(pressure / 127 * (colors.length-1));

export class CommandExecutor {

  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  async keydown({button, event, pressure}) {
    if(pressure ===0) return
     // find the next color in the color loop
      // find the current color
      const colorIndex = pressureToColor(pressure);
      console.log({ colorIndex });
      const color = colors[colorIndex];

      this.output.sendMessage([144, button, color.value]);
    console.log({ button, event, pressure });
  }

  async executeCommand({ button, event, pressure }) {
  this.keydown({button, event, pressure});
  }
}

export default CommandExecutor;
