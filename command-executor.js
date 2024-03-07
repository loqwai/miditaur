const KEY_DOWN = 160
const KEY_UP = 128

const FIRST_BIG_BUTTON = 92
export class CommandExecutor {
  constructor() {
    this.commands = {
      [KEY_DOWN]: (args) => {
        console.log(`key down, button_id: ${args[0]} pressure: ${args[1]}`);
        if (args[0] === FIRST_BIG_BUTTON) {
          console.log('big button pressed');
        }
      },
      [KEY_UP]: (args) => {
        console.log('Key up', args);
        if (args[0] === FIRST_BIG_BUTTON) {
          console.log('big button released');
        }
      }
    };
  }

  registerCommand(command, executor) {
    this.commands[command] = executor;
  }

  executeCommand({controlId, event, pressure}) {
    console.log({controlId, event, pressure});
  }
}
export default CommandExecutor;
