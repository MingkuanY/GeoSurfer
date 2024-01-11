let startTime;
let isTracking = false;

// Listen for tab activation
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab.url) {
      // Start tracking
      if (tab.url.includes("google.com/maps") && !isTracking) {
        startTime = new Date().getTime();
        isTracking = true;
        // console.log("Starts tracking");
      }
      // Stops tracking
      else if (!tab.url.includes("google.com/maps") && isTracking) {
        const endTime = new Date().getTime();
        const durationInSeconds = Math.round((endTime - startTime) / 1000);

        // Calculate new total duration
        chrome.storage.local.get(["googleMapsTime"]).then((result) => {
          const totalTime = result.googleMapsTime ? result.googleMapsTime : 0;
          chrome.storage.local.set({ googleMapsTime: totalTime + durationInSeconds }).then(() => {
            // console.log(`Surfed for ${durationInSeconds} seconds for a new total of ${totalTime + durationInSeconds} seconds.`);
          });
        });

        isTracking = false;
      }
    }
  });
});

// Listen for tab creation
chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.url && tab.url.includes("google.com/maps") && !isTracking) {
    startTime = new Date().getTime();
    isTracking = true;
    // console.log("Start tracking (new tab)");
  }
});

// Listen for tab update
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
  if (changeInfo.url && changeInfo.url.includes("google.com/maps") && !isTracking) {
    startTime = new Date().getTime();
    isTracking = true;
    // console.log("Start tracking (new tab update)");
  }
});

// Listen for window focus changes
chrome.windows.onFocusChanged.addListener(async function (windowId) {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    return;
  }

  const [activeTab] = await chrome.tabs.query({ active: true, windowId: windowId });

  if (activeTab && activeTab.url) {
    // Start tracking
    if (activeTab.url.includes("google.com/maps") && !isTracking) {
      startTime = new Date().getTime();
      isTracking = true;
      // console.log("Starts tracking (window focus changed)");
    }
    // Stops tracking
    else if (!activeTab.url.includes("google.com/maps") && isTracking) {
      const endTime = new Date().getTime();
      const durationInSeconds = Math.round((endTime - startTime) / 1000);

      // Calculate new total duration
      chrome.storage.local.get(["googleMapsTime"]).then((result) => {
        const totalTime = result.googleMapsTime ? result.googleMapsTime : 0;
        chrome.storage.local.set({ googleMapsTime: totalTime + durationInSeconds }).then(() => {
          // console.log(`Surfed for ${durationInSeconds} seconds for a new total of ${totalTime + durationInSeconds} seconds. Switched to different window.`);
        });
      });

      isTracking = false;
    }
  }
});