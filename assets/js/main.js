$("#analyze").click(function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// Get active tab
		var activeTab = tabs[0];

		chrome.tabs.get(activeTab.id, current_tab_info => {
			// Check protocol
			const protocol = current_tab_info.url.split(":")[0];
			if (protocol == "http" || protocol == "https") {

				// Get data
				chrome.tabs.executeScript(null, {file: "assets/js/analyze.js"}, () => {
					window.close();
				});
			}
		});
	});
});