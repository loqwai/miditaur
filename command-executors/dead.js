import { exec } from "child_process";
import robot from "robotjs";
const macros = {
  40: {
    name: "helldivers1",
    keys: "a a r o n space w w w",
  },
};

export class CommandExecutor {
  executeCommand({ button, event, pressure }) {
    const macro = macros[button];
    if (!macro) return;
    if(pressure === 0) return;

    const keys = macro.keys.split(" ");
    keys.forEach((key) => {
      robot.keyTap(key);
    });
  }
}

export default CommandExecutor;
