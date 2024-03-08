import robot from 'robotjs';
function pressAKey() {
  // Simulate pressing the 'a' key
  setTimeout(() => {
    robot.keyTap('a', ['right_control']);
    console.log(`Pressed 'a' key successfully.`);
  }, 2000);
}

pressAKey();
