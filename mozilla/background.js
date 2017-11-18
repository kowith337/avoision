var filter_list_state = 0;

function toggleFilterlist() {
    if (filter_list_state === 0) {
        filter_list_state = 1;
        chrome.browserAction.setBadgeText( {text: "\nOFF"});
        return
    }
    if (filter_list_state === 1) {
        filter_list_state = 0;
        return
    }
}
chrome.browserAction.onClicked.addListener(toggleFilterlist);