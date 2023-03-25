const EXTENSION_ID = "kfgpgeenhddcacbdgoofddolhkgfjiac";

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    chrome.runtime.sendMessage(EXTENSION_ID, {
      action: "new_url",
      payload: {
        url: tab.url,
      },
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    chrome.runtime.sendMessage(EXTENSION_ID, {
      action: "new_url",
      payload: {
        url: tab.url,
      },
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fill_form") {
    const { url } = message.payload;
    chrome.tabs.query({ active: true }, (tabs) => {
      const tab = tabs.find((e) => e.url.includes(url));
      chrome.tabs.sendMessage(tab.id, message);
    });
  }
  return true;
});
