const { execSync } = require('child_process');

// Function to list USB devices
function listUSBDevices() {
    console.log('Listing USB devices...');
    console.log('Parsing USB device data...');
    const stdout = execSync('system_profiler SPUSBDataType').toString();
    const usbDevices = stdout.match(/USB(?:.|\n)+?(?=USB|$)/gs);
    if (!usbDevices) {
        console.log('No USB devices found.');
        return [];
    }
    console.log('Found USB devices:', usbDevices);
    const devicesInfo = usbDevices.map(deviceInfo => {
        console.log('Parsing device information...');
        console.log('Device information:', deviceInfo);
        const isAbletonPush = deviceInfo.includes('Ableton Push');
        console.log('Is Ableton Push:', isAbletonPush);
        if (isAbletonPush) {
            const productId = deviceInfo.match(/Product ID:\s+(\S+)/m);
            const vendorId = deviceInfo.match(/Vendor ID:\s+(\S+)/m);
            const manufacturer = deviceInfo.match(/Manufacturer:\s+(.+)/m);
            const locationId = deviceInfo.match(/Location ID:\s+(\S+)/m);
            console.log('Product ID:', productId ? productId[1] : 'Not found');
            console.log('Vendor ID:', vendorId ? vendorId[1] : 'Not found');
            console.log('Manufacturer:', manufacturer ? manufacturer[1] : 'Not found');
            console.log('Location ID:', locationId ? locationId[1] : 'Not found');
            return {
                productId: productId ? productId[1] : null,
                vendorId: vendorId ? vendorId[1] : null,
                manufacturer: manufacturer ? manufacturer[1] : null,
                locationId: locationId ? locationId[1] : null
            };
        }
        return null; // Not an Ableton Push device
    }).filter(device => device !== null); // Remove null entries (non-Ableton Push devices)
    console.log('Device information parsed successfully:', devicesInfo);
    return devicesInfo;
}

// Get list of USB devices and filter for the Ableton Push device
const devices = listUSBDevices();
if (devices.length > 0) {
    console.log('Ableton Push USB Devices Found:');
    devices.forEach(device => {
        console.log(`Manufacturer: ${device.manufacturer}, Product ID: ${device.productId}, Location ID: ${device.locationId}`);
        // Implement logic to interact with the Ableton Push device here
    });
} else {
    console.log('No Ableton Push USB devices found. Make sure your device is connected.');
}
