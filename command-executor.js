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
        if(event === KEY_DOWN){
          console.log('Button 1 pressed');
        }
        if(event === KEY_UP){
          console.log('Button 1 released');
        }
        return;
      }
      default: {
        return
      }
    }
  }
}
export default CommandExecutor;
