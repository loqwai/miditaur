import {exec} from 'child_process';
const KEY_DOWN = 160
const KEY_UP = 128

const FIRST_BIG_BUTTON = 92
const SECOND_BIG_BUTTON = 93
const THIRD_BIG_BUTTON = 94
export class CommandExecutor {

  registerCommand(command, executor) {
    this.commands[command] = executor;
  }

  executeCommand({button, event, pressure, raw}) {
    console.log(button)
    switch(button){
      case FIRST_BIG_BUTTON: {
        switch (event) {
          case KEY_DOWN: {
            console.log('Button 1 pressed');
            if(pressure >= 127) {
              console.log('Button 1 pressed hard');
              exec('open -n /Applications/Google\\ Chrome.app');
            }
            return;
          }
          default: {
            return;
          }
        }
      }
      case SECOND_BIG_BUTTON: {
        switch (event) {
          case KEY_DOWN: {
            console.log('Button 2 pressed');
            if(pressure >= 127) {
              console.log('Button 2 pressed hard');
              exec('open /Applications/Alacritty.app -n;');
            }
            return;
          }
          default: {
            return;
          }
        }
      }
      case THIRD_BIG_BUTTON: {
        switch (event) {
          case KEY_DOWN: {
            console.log('Button 3 pressed');
            if(pressure >= 127) {
              console.log('Button 3 pressed hard');
              exec('code');
            }
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
