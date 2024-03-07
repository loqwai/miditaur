const KEY_DOWN = 160
const KEY_UP = 128

export class CommandExecutor {
  constructor() {
    this.commands = {
      [KEY_DOWN]: (args) => {
        console.log(`key down, button_id: ${args[0]} pressure: ${args[1]}`);
      },
      [KEY_UP]: (args) => {
        console.log('Key up', args);
      }
    };
  }

  registerCommand(command, executor) {
    this.commands[command] = executor;
  }

  executeCommand(command, args) {
    console.log('executeCommand', command, args);
    if (this.commands[command]) {
      this.commands[command](args);
    } else {
      console.log('Command not found');
    }
  }
}
export default CommandExecutor;
