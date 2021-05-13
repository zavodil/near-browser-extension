var isTop = true;

chrome.runtime.onMessage.addListener(function(nearAccountsFound) {
    console.log('Near Accounts found: ' + nearAccountsFound);
});