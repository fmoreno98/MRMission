import { useEffect, useState } from 'react';
import { createWorld } from './components/helpers';
import MapViewer from './components/MapViewer';

const SIDE = 100;
const OBSTACLES = 1000;
const initialRoverPosition = [Math.floor(SIDE / 2), Math.floor(SIDE / 2)]
const emptyWorld = createWorld(SIDE, OBSTACLES, initialRoverPosition);

function App() {
  const [windowPos, setWindowPos] = useState([20, 20]);
  const [rover, setRover] = useState(initialRoverPosition); // Initial rover position
  const [map, setMap] = useState(emptyWorld);
  const [commands, setCommands] = useState('');
  const [paras, setStop] = useState(false);
  const windowSize = 25;

  // Compute the top-left and bottom-right coordinates of the visible window
  const topLeft = windowPos;
  const bottomRight = [
    Math.min(SIDE - 1, windowPos[0] + windowSize - 1),
    Math.min(SIDE - 1, windowPos[1] + windowSize - 1)
  ];

  // Ensure that the windowPos stays within the bounds of the map
  const moveWindow = (dx, dy) => {
    setWindowPos(prevPos => {
      const newX = Math.max(0, Math.min(SIDE - windowSize, prevPos[0] + dx));
      const newY = Math.max(0, Math.min(SIDE - windowSize, prevPos[1] + dy));
      return [newX, newY];
    });
  };

  // Check if the cell contains an obstacle
  const isObstacle = (x, y) => {
    console.log(`Checking obstacle at ${x}, ${y}`);
    return map[y * SIDE + x] === 1;
  };

  // Stop rover movement if the new position is out of bounds or an obstacle
  const stopRover = () => {
    setRover(prevPos => {
      const newX = prevPos[0];
      const newY = prevPos[1];
      console.log(`Stopping rover at ${newX}, ${newY}`);
      setStop(true);
      return [newX, newY];
    })
  }


  // Ensure that the rover position stays within the bounds of the map and not move into obstacles
  const moveRover = (dx, dy) => {
    let stop = false;
    const prevPos = rover;
    const newX = prevPos[0] + dx;
    const newY = prevPos[1] + dy;

    if (newX < 0 || newX >= SIDE || newY < 0 || newY >= SIDE || isObstacle(newX, newY)) {
      // Prevent movement if the new position is out of bounds or an obstacle
      stop = true;
    }

    if (stop) {
      console.log(`Stopping rover at ${newX}, ${newY}`);
      //setStop(true);
    } else {
      setRover([newX, newY]);
    }
    return stop;
  };

  // Center the rover in the window
  const centerRover = () => {
    setWindowPos(prevPos => {
      const roverX = rover[0];
      const roverY = rover[1];

      // Calculate the new window position to center the rover
      const newX = Math.max(0, Math.min(SIDE - windowSize, roverX - Math.floor(windowSize / 2)));
      const newY = Math.max(0, Math.min(SIDE - windowSize, roverY - Math.floor(windowSize / 2)));

      return [newX, newY];
    });
  };

  // Move the rover based on the given commands
  const start = () => {
    const commandsArray = commands.split("")
    console.log(commandsArray)

    let stop = false;
    for (const command of commandsArray) {
      console.log("command: ", command)
      if (stop) {
        console.log("stop: ", stop)
        //break;
      } else {
        if (command === 'F') {
          console.log("move forward")
          stop = moveRover(0, -1);
        } else if (command === 'B') {
          console.log("move backward")
          stop = moveRover(0, 1);
        } else if (command === 'L') {
          console.log("move left")
          moveRover(-1, 0);
          stop = moveRover(-1, 0);

        } else if (command === 'R') {
          console.log("move right")
          stop = moveRover(1, 0);
        }
      }
    }
    centerRover()
  };

  useEffect(() => {
    // Center the rover in the window when the map changes
    centerRover();
  }, [map]);

  return (
    <>
      <MapViewer map={map} mapside={SIDE} pos={windowPos} side={windowSize} rover={rover} />

      <div>
        <input type="text" value={commands} onChange={(e) => setCommands(e.target.value)} />
      </div>
      <div>
        <button onClick={start}>{'Start'}</button>
      </div>
      <div>
        <p>Top-Left: ({topLeft[0]}, {topLeft[1]})</p>
        <p>Bottom-Right: ({bottomRight[0]}, {bottomRight[1]})</p>
      </div>
    </>
  );
}

export default App;