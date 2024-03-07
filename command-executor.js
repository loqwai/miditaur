import {execSync} from 'child_process';
const KEY_DOWN = 160
const KEY_UP = 128

const FIRST_BIG_BUTTON = 92
export class CommandExecutor {

  registerCommand(command, executor) {
    this.commands[command] = executor;
  }

  executeCommand({button, event, pressure, raw}) {
    switch(button){
      case FIRST_BIG_BUTTON: {
        switch (event) {
          case KEY_DOWN: {
            console.log('Button 1 pressed');
            if(pressure >= 127) {
              console.log('Button 1 pressed hard');
              execSync('open -n /Applications/Google\\ Chrome.app');
            }
            return;
          }
          case KEY_UP: {
            console.log('Button 1 released');
            return;
          }
          default: {
            return;
          }
        }
      }
      default: {
        return
      }
    }
  }
}
export default CommandExecutor;
