# GeoSurfer

## Tracking how much time you spend surfing Google Maps

This chrome extension uses HTML, CSS, and vanilla JavaScript to calculate the cumulative amount of time the user spends on google.com/maps. It uses chrome.storage.local to store the time and uses the tabs permission to know when a user opens and closes a Google Maps page.

## How to install and use GeoSurfer

1. Go to <a href="https://chromewebstore.google.com/detail/geosurfer/aailafmipmplhppdenmcomphmcnncfoi">the Chrome Web Store</a>.
2. Add the GeoSurfer extension to your Google account.
3. Click on the Extensions button (a puzzle piece icon) on the top right of the Chrome interface. Optional: Pin the GeoSurfer extension for ease of access.
4. Click on GeoSurfer and log your previous surfing hours through the popup.
5. Click "Go Surfing" and start logging more Google Maps hours!

## How to tweak this project for your own uses

Feel free to clone and rename this project to add to your project. The logic for the browser tracking and time calculations are in background.js while the display functionality is in popup.js.

## Find a bug?

If you found an issue with the extension or the code, please email me at mingkuan.yan@gatech.edu
