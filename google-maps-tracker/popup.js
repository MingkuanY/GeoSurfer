document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['isFirstInteraction'], function (result) {
    const isFirstInteraction = result.isFirstInteraction === undefined || result.isFirstInteraction; // stores whether this is the first time the user clicks on the extension
    if (isFirstInteraction) {
      // Show setup popup
      document.body.innerHTML =
        `<div class="welcomeContainer">
          <div class="stronger welcome">GeoSurfer</div>
          <img src="/icons/icon128.png" alt="GeoSurfer Logo" class="logo">
        </div>
        <label for="previousHours" class="youHaveSurfed logAnyHours">Log any hours you've already surfed:</label>
        <div class="inputContainer">
          <input type="number" id="previousHours" class="log" name="previousHours" min="0">
          <button id="logButton" class="log">Go Surfing</button>
        </div>
        <script src="./popup.js"></script>`
    
      document.getElementById('previousHours').focus();
      
      // User logs previous hours
      document.getElementById('logButton').addEventListener('click', () => {
        const hours = document.getElementById('previousHours').value;
        const previousHours = (isNaN(parseFloat(hours)) || parseFloat(hours) < 0) ? 0 : parseFloat(hours);
        chrome.storage.local.set({ previousHours: previousHours });
        
        // Show regular popup
        document.body.innerHTML =
          `<div class="youHaveSurfed">You've surfed <span class="stronger">Google Maps</span> for</div>
          <div class="timeContainer">
            <div id="hours"></div>
            <div class="unit">h</div>
            <div id="minutes"></div>
            <div class="unit">m</div>
            <div id="seconds"></div>
            <div class="unit">s</div>
          </div>
          <img src="/icons/earthPin.png" alt="Earth" class="earth">
          <script src="./popup.js"></script>`
        // Display logic
        chrome.storage.local.get(["googleMapsTime"]).then((result) => {
          chrome.storage.local.get(["previousHours"]).then((result1) => {
            const totalTime = (result1.previousHours * 60 * 60) + (result.googleMapsTime ? result.googleMapsTime : 0); // in seconds
            document.getElementById("hours").innerText = `${Math.floor(totalTime / 60 / 60)}`;
            document.getElementById("minutes").innerText = `${Math.floor(totalTime / 60) % 60}`;
            document.getElementById("seconds").innerText =`${totalTime % 60}`;
          });
        });
        chrome.storage.local.set({ isFirstInteraction: false });
      });
    } else {
      // Display logic
      chrome.storage.local.get(["googleMapsTime"]).then((result) => {
        chrome.storage.local.get(["previousHours"]).then((result1) => {
          const totalTime = (result1.previousHours * 60 * 60) + (result.googleMapsTime ? result.googleMapsTime : 0); // in seconds
          document.getElementById("hours").innerText = `${Math.floor(totalTime / 60 / 60)}`;
          document.getElementById("minutes").innerText = `${Math.floor(totalTime / 60) % 60}`;
          document.getElementById("seconds").innerText =`${totalTime % 60}`;
        });
      });
    }
  });
});