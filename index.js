#!/usr/bin/env node
import midi from 'midi';
const listenToMidi = (ExecutorClass) => {
    const numPorts = new midi.input().getPortCount();
    console.log(`Found ${numPorts} MIDI input ports`);
    for (let i = 0; i < numPorts; i++) {
        const executor = new ExecutorClass();

        const input = new midi.input();
        input.openPort(i);

        const output = new midi.output();
        output.openPort(i);


        input.on('message', (deltaTime, message) => {
            const res = executor.executeCommand({button: message[1], event: message[0], pressure: message[2], raw: message});
            if (res) {
                console.log('Sending message', res);
                output.sendMessage(res);
            }
        });

    }
};

// Main function
const main = async (executorName) => {
    console.log('Starting...');
    const executorPath = `./command-executors/${executorName ?? 'example'}.js`;
    console.log(`Using executor at ${executorPath}`);
    const executorModule = await import(executorPath);
    const ExecutorClass = executorModule.default;
    listenToMidi(ExecutorClass);
    // Add more logic here if needed
};

// Run main function
main(...process.argv.slice(2));
