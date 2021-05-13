chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    chrome.tabs.sendRequest(sender.tab.id, request);
    sendResponse({});
});