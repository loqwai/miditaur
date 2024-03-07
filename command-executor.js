export class CommandExecutor {
  constructor() {
    this.commands = {};
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
