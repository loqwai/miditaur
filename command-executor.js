import { exec } from 'child_process';

const KEY_DOWN = 160;
const FIRST_BIG_BUTTON = 92;
const SECOND_BIG_BUTTON = 93;
const THIRD_BIG_BUTTON = 94;

export class CommandExecutor {
  executeCommand({ button, event, pressure }) {
    if (event !== KEY_DOWN || pressure < 127) return;

    if (button === FIRST_BIG_BUTTON) {
      exec('open -n /Applications/Google\\ Chrome.app');
      return;
    }

    if (button === SECOND_BIG_BUTTON) {
      exec('open /Applications/Alacritty.app -n;');
      return;
    }

    if (button === THIRD_BIG_BUTTON) {
      exec('code');
      return;
    }
  }
}

export default CommandExecutor;
