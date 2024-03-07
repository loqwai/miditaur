#!/usr/bin/env node
import midi from 'midi';
import CommandExecutor from './command-executor.js';
const executor = new CommandExecutor();
// Open and listen to all MIDI input ports

const openAndListenToAllPorts = () => {
    const numPorts = new midi.input().getPortCount();
    for (let i = 0; i < numPorts; i++) {
        const input = new midi.input();
        const portName = input.getPortName(i);
        input.openPort(i);
        console.log(`Opened MIDI input port ${i}: ${portName}`);
        input.on('message', (deltaTime, message) => {
            console.log(`Received MIDI message from port ${i} (${portName}):`, message);
            executor.executeCommand(message[0], message.slice(1));
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
