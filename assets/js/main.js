function setSuccess(test) {
	test.html("check");
	test.removeClass("failed");
	test.addClass("passed");
}

function setFailed(test) {
	test.html("close");
	test.removeClass("passed");
	test.addClass("failed");
}

function metaTitleTest(d) {
	if (d) {
		setSuccess($("#meta-title-test .label .material-icons"));
		$("#meta-title-test .notes").html("Congratulations! Your page is using a title tag.");
		$("#meta-title-test .value").html(d);
	} else {
		setFailed($("#meta-title-test .label .material-icons"));
		$("#meta-title-test .notes").html("Your page does not currently have a title tag.");
	}
}

function metaDescriptionTest(d) {
	if (d) {
		setSuccess($("#meta-description-test .label .material-icons"));
		$("#meta-description-test .notes").html("Congratulations! Your page is using a title tag.");
		$("#meta-description-test .value").html(d);
	} else {
		setFailed($("#meta-description-test .label .material-icons"));
		$("#meta-description-test .notes").html("Your page does not currently have a title tag.");
	}
}

function headingTagsTest(d) {
	if (d.status) {
		setSuccess($("#heading-tags-test .label .material-icons"));
		$("#heading-tags-test .notes").html("Congratulations! Your page contains heading tags.");
	} else {
		setFailed($("#heading-tags-test .label .material-icons"));
		$("#heading-tags-test .notes").html("Your page does not currently have any heading tags.");
	}

	const h1	= d.h1;
	const h2	= d.h2;

	if (h1.length > 0) {
		for (let i = 0; i < h1.length; i++) {
			$("#heading-tags-test #h1-tags").append("<div class='item'>" + h1[i] + "</div>");
		}
	}

	if (h2.length > 0) {
		for (let i = 0; i < h2.length; i++) {
			$("#heading-tags-test #h2-tags").append("<div class='item'>" + h2[i] + "</div>");
		}
	}
}

$("#analyze").click(function() {
	$(".data").removeClass("show");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		// Get active tab
		var activeTab = tabs[0];

		chrome.tabs.get(activeTab.id, current_tab_info => {
			// Check protocol
			const protocol = current_tab_info.url.split(":")[0];
			if (protocol == "http" || protocol == "https") {

				// Get data
				chrome.tabs.executeScript(null, {file: "assets/js/analyze.js"}, (res) => {
					let data	= res[0];

					// Meta Title Test
					metaTitleTest(data.metaTitle);

					// Meta Description Test
					metaDescriptionTest(data.metaDescription);

					// Heading Tags Test
					headingTagsTest(data.headingTags);
					
					// Display data
					$(".data").addClass("show");
				});
			}
		});
	});
});