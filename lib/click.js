// Click.js
// Maintaining UI clicking interactions.
// Note: For state initailization, please MANUALLY add your code to Init() function in the end.

import TIME from "../app/simulation/time";
import * as APP from "../app/app";


// Event listeners for perspectice swiching
topView_.addEventListener("click", (event) => {
  APP.topView();
});

sideView_.addEventListener("click", (event) => {
  APP.sideView();
});

resetView_.addEventListener("click", (event) => {
  APP.resetView();
});

sunIcon.addEventListener("click", (event) => {
  APP.setSun();
});

moonIcon.addEventListener("click", (event) => {
  APP.setMoon();
});

// Event listeners for clicking on the eye, sun, and moon icons to show the options
eyeIcon.addEventListener('click', (event) => {
  const eyeOptions = document.getElementById('eyeOptions');
  eyeOptions.classList.toggle('show');
  event.stopPropagation(); // prevent the event from bubbling up to the document
});

sunIcon.addEventListener('click', (event) => {
  const sunOptions = document.getElementById('sunOptions');
  sunOptions.classList.toggle('show');
  event.stopPropagation(); // prevent the event from bubbling up to the document
});

moonIcon.addEventListener('click', (event) => {
  const moonOptions = document.getElementById('moonOptions');
  moonOptions.classList.toggle('show');
  event.stopPropagation(); // prevent the event from bubbling up to the document
});

totalSunEclipse.addEventListener("click", (event) => {
  APP.setSun();
  TIME.current = new Date("2024-04-08T18:20:01Z"); // 日全食
  isPlaying = false;
  handlePlayStateSwitch();
});

annualSunEclipse.addEventListener("click", (event) => {
  APP.setSun();
  TIME.current = new Date("2023-10-14T23:54:59Z"); // 日环食
  isPlaying = false;
  handlePlayStateSwitch();
});

partialSunEclipse.addEventListener("click", (event) => {
  APP.setSun();
  TIME.current = new Date("2023-04-20T04:30:41Z"); // 日偏食
  isPlaying = false;
  handlePlayStateSwitch();
});

totalLunarEclipse.addEventListener("click", (event) => {
  APP.setMoon();
  TIME.current = new Date("2021-05-26T12:00:00Z"); // 月全食
  isPlaying = false;
  handlePlayStateSwitch();
});

partialLunarEclipse.addEventListener("click", (event) => {
  APP.setMoon();
  // 2021.11.19天狗食月：几乎全食的偏食
  TIME.current = new Date("2021-11-19T04:43:42Z"); // 月偏食
  isPlaying =false;
  handlePlayStateSwitch();
});

// Variables to keep track of the icon states
let userIconClicked = false;
let mapIconClicked = false;

// Function to handle user icon click event
function handleUserIconClick() {
  const userImg = userIcon.querySelector('img');
  userIconClicked = !userIconClicked; // Toggle the icon state

  if (userIconClicked) {
    userImg.src = './assets/logo/no_ui.png';
    controlPanel.style.display = "none";
    eyeIcon.style.display = "none";
    sunIcon.style.display = "none";
    moonIcon.style.display = "none";
    mapIcon.style.display = "none";
    pauseButton.style.display = "none";
  }
  else {
    userImg.src = './assets/logo/ui.png'; // Replace with the original image path
    controlPanel.style.display = "flex";
    eyeIcon.style.display = "flex";
    sunIcon.style.display = "flex";
    moonIcon.style.display = "flex";
    mapIcon.style.display = "flex";
    pauseButton.style.display = "flex";
  }
}

// Function to handle map icon click event
function handleMapIconClick() {
  const mapImg = mapIcon.querySelector('img');
  mapIconClicked = !mapIconClicked; // Toggle the icon state

  if (mapIconClicked) {
    mapImg.src = './assets/logo/satellite-solid.png';
    APP.mapSwitch();
  } else {
    mapImg.src = './assets/logo/map.png'; // Replace with the original image path
    APP.mapSwitch();
  }
}

// Event listeners for clicking on the user and map icons to change their images
userIcon.addEventListener('click', handleUserIconClick);
mapIcon.addEventListener('click', handleMapIconClick);

// Add click event listeners to the options for the eye, sun, and moon icons
['eyeOptions', 'sunOptions', 'moonOptions'].forEach(id => {
  const options = document.getElementById(id);
  const optionElements = options.querySelectorAll('.option');

  optionElements.forEach(option => {
    option.addEventListener('click', (event) => {
      // Reset all options' background color
      optionElements.forEach(opt => {
        if (opt !== event.target) {
          opt.style.backgroundColor = 'transparent';
        }
      });

      if (id === 'sunOptions' || id === 'moonOptions') {
        // Toggle clicked option's background color for sunOptions and moonOptions
        if (event.target.style.backgroundColor === 'rgb(99, 99, 102)') { // RGB value for #636366
          event.target.style.backgroundColor = 'transparent';
        } else {
          event.target.style.backgroundColor = '#636366';
        }
      } else {
        // Set clicked option's background color for eyeOptions
        event.target.style.backgroundColor = '#636366';
      }

      event.stopPropagation(); // Prevent the click event from bubbling up to the document
    });
  });

  options.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document
  });
});

// Event listener to close the options list when clicking outside the icons and options
document.addEventListener('click', () => {
  const eyeOptions = document.getElementById('eyeOptions');
  const sunOptions = document.getElementById('sunOptions');
  const moonOptions = document.getElementById('moonOptions');

  eyeOptions.classList.remove('show');
  sunOptions.classList.remove('show');
  moonOptions.classList.remove('show');
});

// Pause and Play
const pauseButton = document.getElementById("pauseButton");
const pauseIcon = "./assets/logo/pause.png";
const playIcon = "./assets/logo/play.png";
let isPlaying = true;

// Handle the UI response to isPlaying boolean.
function handlePlayStateSwitch() {
  const logoImg = pauseButton.querySelector("img");
  if (isPlaying) {
    logoImg.src = pauseIcon;
    timeSpeedInput.value = startValue;
    timeSpeedInput.disabled = false;
    speedValueElement.textContent = `${startValue} ${unit} / S`;
    TIME.timespeed = startValue * 1000 * getSeconds();
  } else {
    logoImg.src = playIcon;
    timeSpeedInput.value = middleValue;
    timeSpeedInput.disabled = true;
    speedValueElement.textContent = `${middleValue} ${unit} / S`;
    TIME.timespeed = middleValue * 1000 * getSeconds();
  }
}

pauseButton.addEventListener("click", function () {
  isPlaying = !isPlaying; // Toggle the play/pause state
  handlePlayStateSwitch();
});

// Change the opacity of the logo part when mouse enters
const logo = document.getElementById('logo');
const team = document.getElementById('team').querySelector('img');
const title = document.getElementById('title');
const credit = document.getElementById('credit');
const vecline = document.getElementById('vecline');

// Add event listeners for mouse enter and mouse leave
logo.addEventListener('mouseenter', () => {
  team.style.opacity = 1;
  title.style.opacity = 1;
  credit.style.opacity = 1;
  vecline.style.opacity = 1;
});

logo.addEventListener('mouseleave', () => {
  team.style.opacity = 0.4;
  title.style.opacity = 0.4;
  credit.style.opacity = 0.4;
  vecline.style.opacity = 0.4;
});


const speedValueElement = document.getElementById("speedValue");
const buttons = document.getElementById("buttons");
const timeSpeedInput = document.getElementById("timeSpeed");

const middleValue = 0;
const startValue = 1;
let unit = "DAY";

function getSeconds() {
  if (unit == "SEC") return 1;
  if (unit == "MIN") return 60;
  if (unit == "HOUR") return 60 * 60;
  if (unit == "DAY") return 24 * 60 * 60;
  if (unit == "MON") return 30 * 24 * 60 * 60;
  if (unit == "YEAR") return 365 * 24 * 60 * 60;
}

// Add click event listener to buttons
buttons.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    unit = target.textContent;

    // Set the slider value to the proper value
    if (isPlaying) {
      timeSpeedInput.value = startValue;
      speedValueElement.textContent = `${startValue} ${unit} / S`;
      TIME.timespeed = startValue * 1000 * getSeconds();
    } else {
      timeSpeedInput.value = middleValue;
      speedValueElement.textContent = `${middleValue} ${unit} / S`;
      TIME.timespeed = middleValue * 1000 * getSeconds();
    }
  }
});

// Add input event listener to timeSpeedInput
timeSpeedInput.addEventListener("input", (event) => {
  const value = event.target.value;
  speedValueElement.textContent = `${value} ${unit} / S`;
  TIME.timespeed = value * 1000 * getSeconds();
});

init();

// On page load, execute init() to set initial state.
function init() {
  isPlaying = true;
  handlePlayStateSwitch();
}