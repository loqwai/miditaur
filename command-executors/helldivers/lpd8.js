import { exec } from "child_process";
import robot from "robotjs";
const macros = {
  40: {
    name: "helldivers1",
    keys: "down left down up right",
  },
};

const KEY_PRESSED = 153;

export class CommandExecutor {
  executeCommand({ button, event, pressure }) {
    const macro = macros[button];
    if (!macro) return;
    if(event !== KEY_PRESSED) return;

    const keys = macro.keys.split(" ");
    keys.forEach((key) => {
      robot.keyTap(key);
    });
  }
  setOutput(output) {
   this.midiOutput = output;
  }
}

export default CommandExecutor;
