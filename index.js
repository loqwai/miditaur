#!/usr/bin/env node
import midi from 'midi';
import CommandExecutor from './command-executor.js';
const executor = new CommandExecutor();
// Open and listen to all MIDI input ports

const openAndListenToAllPorts = () => {
    const numPorts = new midi.input().getPortCount();
    for (let i = 0; i < numPorts; i++) {
        const input = new midi.input();
        input.openPort(i);
        input.on('message', (deltaTime, message) => {
            executor.executeCommand({button: message[1], event: message[0], pressure: message[2], raw: message});
        });
    }
};

// Main function
const main = () => {
    console.log('Starting...');
    openAndListenToAllPorts();
    // Add more logic here if needed
};

// Run main function
main();
