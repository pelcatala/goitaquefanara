chrome.action.onClicked.addListener(function (activeTab) {
    var newURL = "https://goitaquefanara.cat/";
    chrome.tabs.create({ url: newURL });
});