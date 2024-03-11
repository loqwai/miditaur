import debounce from "debounce";
import {colors} from '../colors.js';

const KEY_PRESSED = 160;

const throttle = (fn, delay) => {
  const buttons = {};

  const throttled = ({button, event, pressure}) => {
    if(pressure === 0) return;
    console.log('throttled', {button, event, pressure});
    let timeToWait = delay;
    console.log({button, event, pressure});
    const now = performance.now();
    const last = buttons[button] ?? 0;
    const pressurePercent = pressure /= 127;
     // if pressurepercen is 1, then timeToWait is 0
    timeToWait = delay * (1 - pressurePercent);
    console.log({timeToWait});
    if(pressure ===1) throttled({button, event, pressure});

    if (now - last < timeToWait) return
    buttons[button] = now;
    fn({button, event, pressure});
  }
  return throttled;
}
export class CommandExecutor {
  keysAndColors = {}

  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.keydown = throttle(this.keydown.bind(this), 800);
  }

  async keydown({button, event, pressure}) {

     // find the next color in the color loop
      // find the current color
      const currentColor = this.keysAndColors[button];
      const currentIndex = colors.indexOf(currentColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      const nextColor = colors[nextIndex];

      this.keysAndColors[button] = nextColor;
      this.output.sendMessage([144, button, nextColor.value]);
    console.log({ button, event, pressure });
  }

  async executeCommand({ button, event, pressure }) {
  if(!this.keysAndColors[button]) this.keysAndColors[button] = colors[0];
  this.keydown({button, event, pressure});
  }
}

export default CommandExecutor;
