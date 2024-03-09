#!/usr/bin/env node
import midi from 'midi';
const listenToMidi = (executor) => {
    const numPorts = new midi.input().getPortCount();
    console.log(`Found ${numPorts} MIDI input ports`);
    for (let i = 0; i < numPorts; i++) {
        const input = new midi.input();
        input.openPort(i);
        const output = new midi.output();
        output.openPort(i);
        executor.setOutput(output);
        input.on('message', (deltaTime, message) => {
            console.log(`MIDI message received: ${message}`);
            executor.executeCommand({button: message[1], event: message[0], pressure: message[2], raw: message});
        });
    }
};

// Main function
const main = async (executorName) => {
    console.log('Starting...');
    const executorPath = `./command-executors/${executorName ?? 'example'}.js`;
    console.log(`Using executor at ${executorPath}`);
    const executorModule = await import(executorPath);
    const executor = new executorModule.default();
    listenToMidi(executor);
    // Add more logic here if needed
};

// Run main function
main(...process.argv.slice(2));
